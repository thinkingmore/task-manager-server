const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        // task collection path
        app.get('/tasks/:email',async(req,res)=>{
            const email = req.params.email;
            const user = { user: email}
            const result = await taskCollection.find(user).toArray();
            res.send(result);

        })

        app.put('/tasks/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    status: "complete"
                }
            }
            const result = await taskCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        });

        app.post('/tasks', async(req,res)=>{
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.send(result);
        })

        // completed task collection path
        app.get('/complete/:email',async(req,res)=>{
            const email = req.params.email;
            const filter = { 
                user: email,
                status: "complete"
            }
            const result = await taskCollection.find(filter).toArray();
            res.send(result);

        })
        app.delete('/complete/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: (ObjectId(id)) }
            const result = await taskCollection.deleteOne(filter);
            res.send(result);
        })

    }
    finally {

    }
}

run().catch(error=> console.error(error));

app.get('/', ( req, res) => {
    res.send('Task Manger Server is running')
})

app.listen(port,()=>{
    console.log(`Task Manger Server is running on ${port}`)
})