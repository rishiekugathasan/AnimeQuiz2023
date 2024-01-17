const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();

const mongoose = require('mongoose');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());


//Database
mongoose.connect("mongodb://127.0.0.1:27017/BestAnimeCollection");

const AnimeSchema = new mongoose.Schema( {
    title: String,
    creator: String,
    genres: Array,
    rating: Number,
    vote: Number
})

const AnimeModel = mongoose.model("anime", AnimeSchema);

//Routes
app.get('/',(req, res) => {
    res.sendFile(__dirname + '/survey.html');
});

app.get('/data', (req, res) => {
    AnimeModel.find({}).then(function(anime) {
        res.json(anime)
    }).catch (function(err) {
        console.log(err)
    });
});

app.post('/results',(req, res) => {
    console.log(req.body);
    user_choice = req.body.user_choice;
    res.send("Thank you for choosing " + user_choice + " as anime of the year!");
});

//Listening for server
app.listen(3000, ()=> {
    console.log("Server is running on port 3000 (http://localhost:3000/).")
});

/*Important links to consider
https://www.linkedin.com/advice/1/how-can-you-prevent-spam-submissions-html-forms-tfcaf#:~:text=You%20can%20use%20CSS%20or,the%20form%20submission%20as%20spam.
*/