const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000



const app = express();

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wd5n7ku.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const postCollection = client.db('TinTin').collection('Posts')
        app.get('/posts', async (req, res) => {
            const query = {}
            const posts = await postCollection.find(query).toArray()
            res.send(posts)
        })
        app.post('/newposts', async (req, res) => {
            const newposts = req.body;
            const result = await postCollection.insertOne(newposts);
            res.send(result)
        })
    }

    finally {

    }
}
run().catch(console.log)


app.get('/', async (req, res) => {
    res.send('TinTin server is running')
})

app.listen(port, () => console.log(`TinTin server is running on port ${port}`))