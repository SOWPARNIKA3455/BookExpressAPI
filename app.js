const express = require("express");
const app = express();
const bookRouter = require("./route/bookRoute");

app.use(express.json()); 
app.use("/books", bookRouter); 

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});
