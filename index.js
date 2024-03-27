const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');


const userRoute = require('./routes/UserRoute');
const messageRoute = require('./routes/MessageRoute');

const cors = require('cors');
const { SendMessage } = require('./controllers/MesageController');

const app = express();

app.use(cors());

app.use(express.json());

//CONNECTION
DBURL = 'mongodb+srv://ghostbmer:Ghostbmer02@weatherdata.qu5865x.mongodb.net/?retryWrites=true&w=majority&appName=weatherdata'
PORT = 5000
//collect env files
require('dotenv').config();
if (process.env.NODE_ENV !== 'PRODUCTION') {
    require("dotenv").config({
        path: "./.env"
    })
}



const port = PORT;
const dbconnection = DBURL;


app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
})

//create a database connection
mongoose.connect(dbconnection, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database Connection Successful')
    })
    .catch((err) => {
        console.log(err)
        console.log('error connecting to the database')
    })


    app.get('/',(req,res)=>{
        res.send('Weather Reminder Server started')
    })

// Schedule the sendMessage function to run every 2 minutes
// const job = schedule.scheduleJob('*/2 * * * *', () => {
//     // SendMessage();
// });


// make routes
app.use('/api/v2/user',userRoute);

//msg routes

app.use('/api/v2/message',messageRoute)