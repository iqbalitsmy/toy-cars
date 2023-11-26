const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();

// middleware 
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Toy Cars sever is running.")
});

// MongoDB

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.wtvr16j.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const userCollection = client.db('toyCarsDB').collection('User');

        app.post('/login', async (req, res) => {
            const user = req.body;

            // Hashing password using bcrypt
            bcrypt.genSalt(parseInt(process.env.SALTROUNDS), (err, salt) => {
                if (err) {
                    console.error('Error generating salt:', err);
                    res.status(401).json({
                        error: {
                            status: 401,
                            message: err.message || 'Internal Server Error'
                        }
                    });
                } else {
                    bcrypt.hash(user.password, salt,  async (err, hash) => {
                        // Store hash in your password DB.
                        if (err) {
                            console.error('Error hashing password:', err);
                            res.status(401).json({
                                error: {
                                    status: 401,
                                    message: err.message || 'Internal Server Error'
                                }
                            });
                        } else {
                            console.log('Hashed password:', hash);
                            // Save the hashed password to your database
                            user.password = hash;
                            const result = await userCollection.insertOne(user);
                            res.send(result);
                        }
                    });
                }

            });
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log(`Server is running at port : ${port}`)
});