const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 5000;

//middlewares

app.use(cors());
app.use(express.json());

// connect database


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ltn8juo.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {

        const taskCollection = client.db('taskManager').collection('taskCollection');

    }
    finally {

    }
}


app.get('/', ( req, res) => {
    res.send('Task Manger Server is running')
})

app.listen(port,()=>{
    console.log(`Task Manger Server is running on ${port}`)
})