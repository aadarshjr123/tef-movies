const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");

const schema = require("./schema");

// Constants
// "mongodb+srv://aadarshjr1234:***REMOVED***@tef.ygagb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// "mongodb+srv://aadarshjr1234:***REMOVED***@moviedb.5opev.mongodb.net/MovieDB?retryWrites=true&w=majority"
const URL = "mongodb+srv://aadarshjr1234:***REMOVED***@tef.ygagb.mongodb.net/tefdatabase?retryWrites=true&w=majority";

// Connect to MongoDB.
const connect = mongoose.connect(URL, { useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false  });
connect.then(
  db => {
    console.log("Connected correctly to server!");
  },
  err => {
    console.log(err);
  }
);

// Creating apollo server.
const server = new ApolloServer({
  schema: schema
});

// Creating express app.
const app = express();

app.use(cors())
// Applying middelware to application.
app.use(bodyParser.json());
app.use("*", cors());
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});
// Connecting express app with apollo.
server.applyMiddleware({ app });

// Start Server.
// console.log(emojic.heartEyes).


app.listen(process.env.PORT || 4000 , () =>
  console.log(` Server ready at http://localhost:4000${server.graphqlPath}`)
);
