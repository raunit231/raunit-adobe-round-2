/* The code is importing various modules and libraries required for the application: */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PDFServicesSdk = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");

/* setting up environment variables using dotenv */
const dotenv = require("dotenv");
dotenv.config();

/* `app.use(bodyParser.json())` is middleware that parses incoming requests with JSON payloads.*/
app.use(bodyParser.json());

/* `app.use(cors())` is middleware that enables Cross-Origin Resource Sharing (CORS) for the
application.*/
app.use(cors());
/* `app.use(morgan("common"));` is middleware that logs HTTP requests to the console. */
app.use(morgan("common"));
/* this jsonFormatter function is used to format the recieved data into required json format */
const jsonFormatter = require("./utils/formatJson.js");
// this is a flag to check if the server is busy or not
let isProcessing = false;


/**
 * The function `createResume` is an asynchronous function that generates a PDF resume based on the
 * provided template and input data.
 * @param req - The `req` parameter is the request object that contains information about the HTTP
 * request made to the server. It includes details such as the request headers, request body, and other
 * metadata.
 * @param res - The `res` parameter is the response object that is used to send the response back to
 * the client. It is an instance of the Express `Response` object and has methods like `status`,
 * `json`, and `send` that are used to set the response status code, send JSON data,
 * @returns a response to the client. The response can be in the form of a success message, an error
 * message, or a PDF file.
 */
const createResume = async (req, res) => {

	/* The code block `if(isProcessing){...}` is checking if the server is currently processing a request.
	If `isProcessing` is `true`, it means that the server is busy processing another request. In this
	case, the server will respond with a status code of 429 (Too Many Requests) and `return` */
	if(isProcessing){
		res
			.status(429)
			.json({ message: "Server is busy. Please try again later." });
		return;
	}

	isProcessing= true;
	try {
		// requiring content and accept headers
		const contentHeader = req.header("Content-Type");
		const acceptHeader = req.header("Accept");

		// checking if content and accept headers are valid
		if(contentHeader !== "application/json" || acceptHeader !== "application/pdf"){
			// in case of invalid content and accept headers, the server will respond with a status code of 400
			res.status(400).json({
				message: "Content-Type and Accept headers must be application/json and application/pdf"
			});
			return;
		}
		// getting the body data from the request body which is parsed by body-parser
		const bodyData = req.body;


		const { template_id } = bodyData;
		// checking if the template id is valid
		if(template_id !== "1" && template_id!== "2" && template_id !== "3"){
			// in case of invalid template id, the server will respond with a status code of 404
			res.status(404).json({
				message: "Template id must be 1, 2 or 3"
			});
			return;
		}

		// formatting the data into required format
		const JSON_INPUT = jsonFormatter(bodyData);

		// setting the output file path
		const OUTPUT = "./generatedResume.pdf";

		// If our output already exists, remove it so we can run the application again.
		if (fs.existsSync(OUTPUT)) fs.unlinkSync(OUTPUT);

		// setting up path for the selected template
		const INPUT = `./assets/Template${template_id}.docx`;
		// Set up our credentials object using client ID and client secret which are stored in the environment variables.
		const credentials =
			PDFServicesSdk.Credentials.servicePrincipalCredentialsBuilder()
				.withClientId(process.env.PDF_SERVICES_CLIENT_ID)
				.withClientSecret(process.env.PDF_SERVICES_CLIENT_SECRET)
				.build();

		// Create an ExecutionContext using credentials
		const executionContext =
			PDFServicesSdk.ExecutionContext.create(credentials);

		// This creates an instance of the Export operation we're using, as well as specifying output type (DOCX)
		const documentMerge = PDFServicesSdk.DocumentMerge,
			documentMergeOptions = documentMerge.options,
			options = new documentMergeOptions.DocumentMergeOptions(
				JSON_INPUT,
				documentMergeOptions.OutputFormat.PDF
			);

		// Create a new operation instance using the options instance.
		const documentMergeOperation = documentMerge.Operation.createNew(options);

		// Set operation input document template from a source file.
		const input = PDFServicesSdk.FileRef.createFromLocalFile(INPUT);
		documentMergeOperation.setInput(input);

		// Execute the operation and Save the result to the specified location.
			const result = await documentMergeOperation.execute(executionContext);
			await result.saveAsFile(OUTPUT);
		// setting the content type for response
			res.setHeader("Content-Type", "application/pdf");

		// reading and sending the generated file to the client
			const file = fs.readFileSync(OUTPUT);
			res.status(200).send(file);
	} catch (error) {
		// in case of any error, the server will respond with appropriate status code
		if (error instanceof PDFServicesSdk.Error.ServiceApiError) {
			const {statusCode} = error;
				res.status(statusCode).json({ error: error });
		} else {
			res.status(500).json({ error: error });
		}
	} finally {
		isProcessing=false;
	}
};


// handling post request on path /resume
app.post("/resume", createResume);

/* starting the server on port 8080 */
app.listen(8080, () => {
	console.log("app listening on port 8080...");
});
