// Setup empty JS object to act as endpoint for all routes
 let projectData = {};

// Require Express to run server and routes
const express = require ('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require ('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors= require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// const getAll =(req,res)=>{
//     res.status(200).send(projectData);
// };

app.get('/all',async(req,res)=>{
    res.send(projectData);
     console.log(projectData);
});



app.post('/add',async (req,res)=>{
    const body =  await req.body;
    projectData=body;
    res.status(200).send(projectData);

});


const port = 8000;
const hostName = '127.0.0.1';
//function to test the server 
const listening =()=>{
    console.log(`server is running at http://${hostName}:${port}/`);
};
// Setup Server`
app.listen(port,listening);