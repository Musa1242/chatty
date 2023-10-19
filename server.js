const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();


connecting().catch(err => console.log(err));

async function connecting(){
    await mongoose.connect('mongodb://127.0.0.1:27017/TestDB', {useNewUrlParser:true})
    mongoose.connection.on('error', () => {
        console.log('error');
      })

    console.log('connected???')

    var Schema = mongoose.Schema;
    var ChatMessageSchema = new Schema({createdAt: Date,
    alias: String,
    message: String
    });
    var ChatMessage = mongoose.model('ChatMessages', ChatMessageSchema );
    await ChatMessage.createCollection();

    app.use(bodyParser.urlencoded({extended: true}))
    app.listen(5000, () => {
        console.log('Server running');
    });
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());
    app.use(express.static('public_html'));

   

    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/public_html/index.html')
    })

    app.post('http://167.172.98.58/chats', async (req, res) => {
        const message = new ChatMessage({createdAt: new Date(), alias:req.body.alias ,message: req.body.message})
        message.save()
        try {
        const lastInput = await ChatMessage.findOne().sort({ createdAt: -1 }).exec();
        res.send(lastInput);
        } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
        }
    });
}


