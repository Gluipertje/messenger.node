const express = require('express'); // To import express into the script which is needed for like everything
const bodyParser= require('body-parser') // To import bodyparser into the script which is needed to read from HTML 'form' objects
const MongoClient = require('mongodb').MongoClient // To import Mongo into the script which is needed to interact with le database
const app = express();
app.set('view engine', 'ejs')
var db
var port
port = 8008

app.use(bodyParser.urlencoded({extended: true}))

//MongoClient.connect("mongodb://localhost:27017/MyDb", function (err, db)
MongoClient.connect('mongodb+srv://messenger-user_1:KhmRRZIE12SqMDto@node-messager-osyvz.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => { // Connect to your MongoDB
    if (err) return console.log(err)
        db = client.db('node-messenger') // Defines database name
        app.listen(port, () => { // Start server on port 3000
            console.log('Server listening on port %s', port)
    })
  })

  app.get('/', (req, res) => { //If a GET request is sent on adress '/'
    db.collection('messages').find().toArray(function(err, result) { //Makes an array from all the messages sent
        if (err) return console.log(err)
        // renders index.ejs
        res.render('index.ejs', {messages: result})
    })
  })

  app.post('/messages', (req, res) => { //If a POST request is sent on adress '/messages'
    db.collection('messages').insertOne(req.body, (err, result) => { // Save message to the MongoDB
        if (err) return console.log(err)
            console.log(req.body)
            console.log('String saved to database!')
            res.redirect('/')
  })
  })
