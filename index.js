const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
// Importing the PrismaClient
const { PrismaClient } = require("@prisma/client");

// Instantiate(create an instance of) the client
// This is the prisma object that i will use in my route handlers to make queries to my database
const prisma = new PrismaClient();

// Create Express app
const app = express();

app.use(cors());

// Use body-parser middleware to parse incoming JSON
app.use(bodyParser.json());

// Set the port that the server will listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// This is the handler that listens for POST requests on the /todos path
app.post("/todos", async (req, res) => {
  try {
    // It takes the title from the request body
    // It's using javascripts destructuring assignment syntax to extract the title property from the req.body(which is an object)
    // Which should be a JSON object that contains the title property
    const { title } = req.body;

    // Then creates a new todo item using the prisma client
    // Im using the command prisma(instance of the PrismaCLient)
    // .todo(property of the prisma object and is the Todo model I created in the prisma schema)
    // .create()(A method that creates a new record in the database which takes an object as an argument which determines the data for the new todo)
    const result = await prisma.todo.create({
      // This is the argument to the create() method
      // The data property is an object that should match the structure of the Todo model i created
      // and each property of the data object corresponds to a field in the todo model
      data: {
        // Setting the title to the title that was extracted from the request
        title: title,
        // Setting the completed field to false by default
        completed: false,
      },
    });
    // Then sends the created todo item as the response
    res.json(result);

    // If an error is thrown
  } catch (error) {
    // calls status() function with status code set to 500
    /* HTTP status codes are grouped into five classes:
        1xx (Informational): The request was received, continuing process
        2xx (Successful): The request was successfully received, understood, and accepted
        3xx (Redirection): Further action needs to be taken in order to complete the request
        4xx (Client Error): The request contains bad syntax or cannot be fulfilled
        5xx (Server Error): The server failed to fulfill an apparently valid request
    */
    res.status(500).json({
      // Set the error message
      error: `An error occurred while creating a todo: ${error.message}`,
    });
  }
});

// This handler is listening for GET requests on the /todos path
// It then fetches all todo items using the Prisma CLient and sends them as a response
app.get("/todos", async (req, res) => {
  try {
    // The findMany() function returns a promise that resolves to an array of all the records in the table
    // If there aren't any records it resolves to an empty string
    const todos = await prisma.todo.findMany();
    res.json(todos);

    // If an error is thrown
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while retrieving todos: ${error.message}`,
    });
  }
});

/* After I created my POST and GET endpoints I tested them using this method

These commands are sending HTTP requests to the server to see the responses

Remember to start the server first by running the npm start or node index.js

    Testing the POST /todos endpoint i type this command in the terminal:

        Invoke-RestMethod -Method Post -Uri "http://localhost:3000/todos" -ContentType "application/json" -Body '{"title":"Buy milk"}'

    Testing the GET /todos endpoint i type this command in the terminal:

        Invoke-RestMethod -Method Get -Uri "http://localhost:3000/todos"



*/

// Handler that listens for PUT requests on the /todos/:id path.
// PUT requests are the update part in CRUD (Create, Read, Update, Delete)
// :id is a placeholder for the id of the todo item that is being updated
app.put("/todos/:id", async (req, res) => {
  try {
    // extracting the id from the :id parameter, title, and completed from the body of the request
    // .params come from the URL itself (/todos/:id)
    // while .body comes from data sent in the body of an HTTP request
    const { id } = req.params;
    const { title, completed } = req.body;

    // using update() function to update the todo item in the database
    const result = await prisma.todo.update({
      // where specifies which item to update
      where: {
        id: Number(id),
      },
      data: {
        title: title,
        completed: completed,
      },
    });
    // Sending the updated todo item back as a json response
    res.json(result);

    // If an error is thrown
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while updating a todo: ${error.message}`,
    });
  }
});

// Handles DELETE requests on the /todos/:id path
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // This function works like this DELETE FROM todos WHERE id = :id
    const result = await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });
    // Returns the deleted item as a response
    res.json(result);

    // If an error is thrown
  } catch (error) {
    res.status(500).json({
      error: `An error occurred while deleting a todo: ${error.message}`,
    });
  }
});

/* Now that I have created my PUT and DELETE endpoints I'll test them in a similar was as before


    Testing the PUT /todos/:id enpoint with this line in the terminal:
        Invoke-RestMethod -Method Put -Uri "http://localhost:3000/todos/1" -ContentType "application/json" -Body '{"title":"Buy eggs","completed":true}'

    Testing the DELETE /todos/:id with this line in the terminal:
        Invoke-RestMethod -Method Delete -Uri "http://localhost:3000/todos/1"


*/
