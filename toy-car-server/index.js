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


const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: "Unauthorize access 1" });
    }
    const token = authorization.split(" ")[1];
    console.log("token", token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({ error: true, message: "Unauthorize access 2" });
        }
        req.decoded = decoded;
        next();
    })
}


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
                    bcrypt.hash(user.password, salt, async (err, hash) => {
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
                            console.log(result);
                            // jwt token generate
                            const token = jwt.sign({ name: user.name, email: user.email, photo: user.photo }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3h' });
                            // console.log(token);
                            res.send({ token });
                        }
                    });
                }

            });
        })

        app.get('/user', verifyJWT, async (req, res) => {
            const decoded = req.decoded;
            if (decoded.email !== req.query.email) {
                return res.status(403).send({ error: true, message: "Unauthorize access" });
            }
            let query = {};
            if (req.query.email) {
                const result = await userCollection.findOne({ email: decoded.email }, { projection: { password: 0 } })
                if (result) {
                    console.log("Result", result);
                    res.send({ name: decoded.name, email: decoded.email, photo: decoded.photo });
                } else {
                    return res.status(403).send({ error: true, message: "Unauthorize access" });
                }
            }
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