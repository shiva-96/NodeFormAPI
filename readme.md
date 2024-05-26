# Dynamic Form API

This project allows users to dynamically set the structure of a form and submit data to it. The form structure can be defined through an endpoint, specifying the fields and their data types. Another endpoint allows submitting data to the form based on the current structure. Users can also retrieve all submitted data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Set Form Structure](#set-form-structure)
  - [Submit Form Data](#submit-form-data)
  - [Retrieve All Form Data](#retrieve-all-form-data)
- [Endpoints](#endpoints)
  - [POST /form](#post-form)
  - [POST /fill_data](#post-fill_data)
  - [GET /fill_data](#get-fill_data)

## Installation

1. Clone the repository:

git clone https://github.com/shiva-96/NodeFormAPI.git


2. Install the dependencies:
npm install

3. Set up the .env file with your database configuration:
DB_NAME=your_database_name
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_DIALECT=mysql
PORT=3000

4. Start the server:
node index.js



# Usage
1. Set Form Structure
Define the structure of the form dynamically. The structure specifies the fields and their data types.

Endpoint: /form

Method: POST

Request Headers:

Content-Type: application/json
Request Body:

structure (object): An object where keys are field names and values are data types (as strings).
Example Request:

POST http://localhost:3000/form 

Example Request Body:
{
  "structure": {
    "title": "STRING",
    "name": "STRING",
    "email": "STRING (email format)",
    "phoneNumber": "BIGINT",
    "isGraduate": "BOOLEAN"
  }
}

2. Submit Form Data
Submit data to the form based on the current structure. The data will be validated against the defined structure.

Endpoint: /fill_data

Method: POST

Request Headers:

Content-Type: application/json
Request Body: A JSON object where keys are field names as defined in the current structure, and values are the corresponding data.

Example Request:
POST http://localhost:3000/fill_data

Example Request Body:
{
  "title": "Software Engineer",
  "name": "Shyam",
  "email": "shyam@example.com",
  "phoneNumber": 1234567890,
  "isGraduate": true
}


3. Retrieve All Form Data
Retrieve all submitted form data.

Endpoint: /fill_data

Method: GET

Request Headers:

None
Request Body:

None

Example Request:
GET http://localhost:3000/fill_data

Response:

Success:
Status Code: 200 OK

Body:

[
  {
    uuid : "1c3378c3-9fbb-4236-b512-44dfc413cb91", 
    "title": "Software Engineer",
    "name": "Shyam",
    "email": "shyam@example.com",
    "phoneNumber": 1234567890,
    "isGraduate": true,
    "createdAt": "2024-05-25T16:20:00.000Z
 }
]
