const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');


const port = 5000
const app = express()

app.use(cors());
app.use(bodyParser.json());

const password ='KWGzDJ5Q1w7J18WA'


const uri = "mongodb+srv://creativeAgency:KWGzDJ5Q1w7J18WA@cluster0.csq51.mongodb.net/creativeAgency?retryWrites=true&w=majority";



// my service
const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
client.connect(err => {
  const service = client.db("creativeAgency").collection("serviceData");
  console.log("database connected");

  app.post('/addService', (req,res)=>{
      const newService=req.body;
      service.insertOne(newService)
      .then(result=>{
          res.send(result.insertedCount > 0 );
      })
      console.log(newService);
  })

  app.get('/myService', (req, res) =>{
      service.find({email: req.query.email})
      .toArray( (err, documents) =>{
          res.send(documents);
      })
  })

  app.get('/allList', (req, res)=>{
      service.find({})
      .toArray( (err, documents)=>{
          res.send(documents);
      })
  })


});


// user feedback
const userReview = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
userReview.connect(err => {
  const service = userReview.db("creativeAgency").collection("userFeedback");
  console.log("database connected");

app.post('/addReview', (req, res) =>{
    const newReview=req.body;
    service.insertOne(newReview)
    .then(result => {
        console.log(result);
        res.send(result.insertedCount > 0);
    })
    console.log(newReview);
})

app.get('/userReview', (req, res) =>{
    service.find({})
    .toArray( (err, documents) =>{
        res.send(documents);
    })
})

});


// makeAdmin


const admin = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
admin.connect(err => {
  const service = admin.db("creativeAgency").collection("admin");
  console.log("database connected");

  app.post('/addAdmin', (req,res)=>{
      const email=req.body;
      service.insertOne(email)
      .then(result=>{
          res.send(result.insertedCount > 0 );
      })
      console.log(email);
  })

  app.get('/admin', (req, res) =>{
      service.find({})
      .toArray( (err, documents) =>{
          res.send(documents);
      })
  })


});



app.get('/', (req, res) => {
  res.send('yaa its work!')
})

app.listen(port)