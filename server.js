const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const pug = require('pug');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { createNullProtoObjWherePossible } = require('ejs/lib/utils');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('views'));

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

//Important variables
let user_choice = "";

//Routes
app.get('/',(req, res) => {
    if (user_choice == "") {
        res.sendFile(__dirname + '/views/survey.html');
    }else {
        let choice = false;
        res.render(__dirname + "/views/response.pug", {choice});
    }
    /*res.sendFile(__dirname + '/views/survey.html');*/
});

app.get('/winner', (req, res) => {
    AnimeModel.find({}).then(anime => {

        let smallest = anime[0];

        for (let i = 0; i < anime.length; i++) {
            if (anime[i].vote > smallest.vote) {
                smallest = anime[i];
            }
        }

        //res.status(200).message("The Winner of this poll's Best Anime of 2024 is " + smallest.title + " with a total of " + smallest.vote + " votes!");
        res.status(200).send("The Winner of this poll's Best Anime of 2024 is " + smallest.title + " with a total of " + smallest.vote + " votes!");

    }).catch (function(err) {
        res.status(500).json({error: 'Could not fetch the document'});
    });
    //res.json("The Winner of this poll's Best Anime of 2024 is " + winnerObj.title + " with a total of " + winnerObj.vote + " votes!");
});

app.get('/data', (req, res) => {
    AnimeModel.find({}).then(anime => {
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
    user_choice = req.body.user_choice;
    let choice = true;

    AnimeModel.findOneAndUpdate({title: user_choice}, {$inc: {vote: 1}}).then(anime =>  {
        //res.status(200).send("Thank you for choosing " + user_choice + " as anime of the year!");
        res.status(200).render(__dirname + "/views/response.pug", {user_choice, choice})
    }).catch (function(err) {
        res.status(500).json({error: 'Could not fetch the document'});
    });
    
});

app.get('/reSubmission', (req, res) => {
    let choice = false;
    res.render(__dirname + "/views/response.pug", {choice});
});

//Listening for server
app.listen(3000, ()=> {
    console.log("Server is running on port 3000 (http://localhost:3000/).")
});

/*Important links to consider
https://www.linkedin.com/advice/1/how-can-you-prevent-spam-submissions-html-forms-tfcaf#:~:text=You%20can%20use%20CSS%20or,the%20form%20submission%20as%20spam.
*/
//https://stackoverflow.com/questions/18938405/how-to-prevent-spam-on-a-form