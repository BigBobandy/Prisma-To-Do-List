const express = require("express");
const bodyParser = require("body-parser");
// Importing the PrismaClient
const { PrismaClient } = require("@prisma/client");

// Instantiate(create an instance of) the client
// This is the prisma object that i will use in my route handlers to make queries to my database
const prisma = new PrismaClient();

// Create Express app
const app = express();

// Use body-parser middleware to parse incoming JSON
app.use(bodyParser.json());

// Define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to your To-Do list app!" });
});

// Set the port that the server will listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// This is the handler that listens for POST requests on the /todos path
app.post("/todos", async (req, res) => {
  // It takes the title from the request body
  // It's using javascripts destructuring assignment syntax to extract the title property from the req.body
  // Which should be a JSON object that contains the title property
  const { title } = req.body;

  // Then creates a new todo item using the prisma client
  // Im using the prisma(instance of the PrismaCLient)
  // .todo(property of the prisma object)
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
});

// This handler is listening for GET requests on the /todos path
// It then fetches all todo items using the Prisma CLient and sends them as a response
app.get("/todos", async (req, res) => {
  const todos = await prisma.todo.findMany();
  res.json(todos);
});

/* After I created my POST and GET endpoints I tested them using this method

Testing the POST /todes endpoint i type this command in the terminal:

Invoke-RestMethod -Method Post -Uri "http://localhost:3000/todos" -ContentType "application/json" -Body '{"title":"Buy milk"}'

Testing the GET /todos endpoint i type this command in the terminal:

Invoke-RestMethod -Method Get -Uri "http://localhost:3000/todos"

Remember to start the server first by running the npm start command in the index.js directory

*/
