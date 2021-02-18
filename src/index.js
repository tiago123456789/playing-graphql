const express = require("express");
require("./configs/LoaderEnvironmentVariable");
const graphqlServer = require("./graphql");
const app = express();

app.use(express.json());

app.get("/", (request, response) => response.json({ message: "Welcome applications!!!" }));

graphqlServer.applyMiddleware({ app });

app.listen(process.env.PORT, () => console.log("Server is running in http://localhost:3000"));