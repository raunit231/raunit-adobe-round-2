const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PDFServicesSdk = require("@adobe/pdfservices-node-sdk");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("common"));
const jsonFormatter = require("./utils/formatJson.js");
let isProcessing = false;
const createResume = async (req, res) => {
	if(isProcessing){
		res
			.status(429)
			.json({ message: "Server is busy. Please try again later." });
		return;
	}
	isProcessing= true;
	try {
		const contentHeader = req.header("Content-Type");
		const acceptHeader = req.header("Accept");
		if(contentHeader !== "application/json" || acceptHeader !== "application/pdf"){
			res.status(400).json({
				message: "Content-Type and Accept headers must be application/json and application/pdf"
			});
			return;
		}

		const bodyData = req.body;
		const { template_id } = bodyData;

		if(template_id !== "1" && template_id!== "2" && template_id !== "3"){
			res.status(404).json({
				message: "Template id must be 1, 2 or 3"
			});
			return;
		}

		const JSON_INPUT = jsonFormatter(bodyData);
		// const JSON_INPUT = require("./assets/LinkTemplate.json");
		const OUTPUT = "./generatedResume.pdf";
		// If our output already exists, remove it so we can run the application again.
		if (fs.existsSync(OUTPUT)) fs.unlinkSync(OUTPUT);

		const INPUT = `./assets/Template${template_id}.docx`;
		// Set up our credentials object.
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
			res.setHeader("Content-Type", "application/pdf");
			const file = fs.readFileSync(OUTPUT);
			res.send(file);
	} catch (error) {
		res.status(500).json({ error: error });
	} finally {
		isProcessing=false;
	}
};

app.post("/resume", createResume);

app.listen(8080, () => {
	console.log("app listening on port 8080...");
});
