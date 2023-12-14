const express = require('express');
const app = express();

//Routes
app.get('/',(req, res)=> {
    res.send("Nigga");
});




app.listen(3000, ()=> {
    console.log("Server is running on port 3000 (http://localhost:3000/).")
});