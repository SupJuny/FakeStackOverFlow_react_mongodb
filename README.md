# FakeStackOverFlow_react_mongodb

## Getting Started
I use MongoDB as the NoSQL database to store data related to this application. Follow
the instructions in the official MongoDB documentation to install the free community edition.
On Windows, you should unselect the option “MongoDB as a Service” to complete the
installation. After you install it, follow the instructions to start MongoDB as a background
service.

When you install MongoDB, the Mongo Shell (mongosh) should also have been installed.
The Mongo Shell provides a command line interface that is used to interact with the databases in MongoDB. 
If mongosh is successfully installed then the command mongosh should connect to the local instance MongoDB on your machine 
and open an interpreter where we can type commands to interact with MongoDB. Try the command
show dbs and you should see a list of existing databases in your local instance. Note that by
default, the MongoDB service will run on 127.0.0.1 (localhost), port 27017.

Install Node.js. I use this to manage React and the packages needed to run our server.
When you install Node.js, it will come with the npm package manager, which will also get
installed. We will use npm to install dependencies and also to start the react application.

## Download/clone your personal GitHub repository.
The repository has a server and client directory. 
Each directory has the package.json and package-lock.json files which list
the dependencies of the server and client applications respectively. 
In each of the directories run 'npm install' to install the necessary dependencies. 
The following paragraphs list the dependencies that will be used.

I use the express framework to write server-side code. Install express in the server
directory using the command 'npm install express', if not already installed. 

I use the mongoose data modeling library. Mongoose will help you connect with a
MongoDB instance and define operations to manage and manipulate the data according to the
needs of our application. Install it in the server directory using 'npm install mongoose', if
not already installed.

I use the nodemon process manager so you don’t have to restart the server every time we
save changes to our server during the development process. Install it in the server directory using
'npm install nodemon', if not already installed. Alternatively, if the local install does not
work, you can install nodemon globally using the command 'npm install -g nodemon'.
This is a good option for nodemon since it can be used across multiple node projects. To run the
server using nodemon use the command 'nodemon server/server.js' instead of
node 'server/server.js'.

I use the axios library to send HTTP requests to our server from our client application.
Install it in the client directory using 'npm install axios', if not already installed.

I use the cors middleware to enable CORS for seamless connection between the client
and the server during the development process.

## Run
To use the initial data base, get into the server directory in your terminal, and command 'node populate_db.js mongodb://localhost:27017/fake_so'.

After loading initial data, open two terminals and go to client directory and server direcory for each.

Type 'nodemon server/server.js' in the server side terminal and 'npm start' in the client side terminal.
