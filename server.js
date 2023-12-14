const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get('/',(req, res) => {
    res.sendFile(__dirname + '/survey.html');
});

app.post('/results',(req, res) => {
    console.log(req.body);
    user_choice = req.body.user_choice;
    res.send("Thank you for choosing " + user_choice + " as anime of the year!");
});


app.listen(3000, ()=> {
    console.log("Server is running on port 3000 (http://localhost:3000/).")
});


/*Important links to consider
https://www.linkedin.com/advice/1/how-can-you-prevent-spam-submissions-html-forms-tfcaf#:~:text=You%20can%20use%20CSS%20or,the%20form%20submission%20as%20spam.
*/