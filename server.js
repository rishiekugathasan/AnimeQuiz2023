const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();

const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { createNullProtoObjWherePossible } = require('ejs/lib/utils');

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

app.get('/data/:id', (req, res) => {

    if (!(ObjectId.isValid(req.params.id))) {
        res.status(500).json({error: "Not a valid document id."})
    }

    AnimeModel.findOne({_id: new ObjectId(req.params.id)}).then(anime =>  {
        res.status(200).json(anime)
    }).catch (function(err) {
        res.status(500).json({error: 'Could not fetch the document'});
    });
});

app.post('/results',(req, res) => {
    console.log(req.body);
    let user_choice = req.body.user_choice;

    AnimeModel.findOneAndUpdate({title: user_choice}, {$inc: {vote: 1}}).then(anime =>  {
        res.status(200).send("Thank you for choosing " + user_choice + " as anime of the year!");
    }).catch (function(err) {
        res.status(500).json({error: 'Could not fetch the document'});
    });
    
});

//Listening for server
app.listen(3000, ()=> {
    console.log("Server is running on port 3000 (http://localhost:3000/).")
});

/*Important links to consider
https://www.linkedin.com/advice/1/how-can-you-prevent-spam-submissions-html-forms-tfcaf#:~:text=You%20can%20use%20CSS%20or,the%20form%20submission%20as%20spam.
*/