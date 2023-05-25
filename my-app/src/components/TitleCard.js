import React from "react";
import "./styles/TitleCard.css";

function TitleCard() {
  return (
    <div className="title-card">
      <h1>Full Stack To Do List</h1>
      <p>
        This is a full stack web app that allows you to create, read, update,
        and delete (CRUD) tasks in a todo list. With the front-end being made
        with React!
      </p>

      <h2>Back-End:</h2>
      <p>
        On the back-end, I use Express.js to receive and respond to HTTP
        requests, routing, and performing server-side operations.
      </p>
      <h2>Managing Data:</h2>
      <p>
        To manage the data on this site, I use Prisma and SQLite. I use prisma
        to define the data model, handle creating, reading, updating, and
        deleting records in the SQLite database in response to HTTP requests
        that the Express.js app receives.
      </p>
      <hr></hr>
    </div>
  );
}

export default TitleCard;
