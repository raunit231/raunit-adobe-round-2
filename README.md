
# Resume Builder API

This is a Node.js API that allows users to create a resume using Adobe Document Generation API. The API accepts a JSON payload containing the user's input data and the ID of the template to be used. The API then generates a PDF resume based on the provided template and input data using Adobe Document Generation API. The generated PDF is then sent back to the client as a response.
The API is built using Express.js, a popular Node.js web application framework. It uses various middleware such as body-parser, cors, and morgan to handle incoming requests, parse JSON payloads, enable Cross-Origin Resource Sharing (CORS), and log HTTP requests to the console.



## Demo

#### Web app built using the Resume Builder API
- https://raunit-adobe-round-2.vercel.app/

## Run Locally

Clone the project

```bash
  git clone https://github.com/raunit231/raunit-adobe-round-2.git
```

Go to the project directory

```bash
  cd project/server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```
*Server will start running on Port `8080`*


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

For these you'll need to sign up for an Adobe PDF Services account .

`PDF_SERVICES_CLIENT_ID`

`PDF_SERVICES_CLIENT_SECRET`


# API Reference


#### Build Resume

```http
  POST /resume
```

## Request Headers
| Header           | Description        |
|------------------|--------------------|
| Content-type     | application/json   |
| Accept           | application/pdf    |

## Request Object
**template_id**: `Required`
- Description: Id of the document template
- Type: `string`
- Possible Values: `{ "1", "2", "3"}`

**personal_information**: `Required`
- Description: user personal information
- Type: `object`
- Content:
  - name: `Required`
      - Type: `string`
  - last_name: `Required`
      - Type: `string`
  - email_address: `Required`
      - Type: `string`
  - phone_number: `Required`
      - Type: `string`
  - linkedin_url: `Required`
      - Type: `string`

**job_title**: `Required`
- Type: `string`

**career_objective**: `Required`
- Type: string

**skills**: `Required`
- Type: array of `string`

**education**: `Required`
- Type: `object`
- Content:
  - school_name: `Required`
    - Type: `string`
  - passing_year: `Required`
      - Type: `string`
  - description: `Required`
      - Type: `string`

**experience**: `Required`
- Type: `object`
- Content:
  - company_name: `Required`
      - Type: `string`
  - passing_year: `Required`
      - Type: `string`
  - responsibilities: `Required`
      - Type: `string`

**achievements**: `Required`
- Type: `object`
- Content:
  - field: `Required`
      - Type: `string`
  - awards:`Required`
      - Type: `string`

## Response Headers
| Header           | Description        |
|------------------|--------------------|
| Content-type     | application/pdf    |

## Response Object
#### API returns the output resume in PDF format.

## Error Codes
| Code           | Description        |
|------------------|--------------------|
| 400    | Bad Request   |
| 401           | Unauthorised   |
| 404           | Template not found   |
| 429           | Too Many Requests   |
| 500           | Internal Server Error   |

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

