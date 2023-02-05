const express = require("express");
const app = express();
const bodyparser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/internkul";

app.use(bodyparser.json());


app.use(function (req, res, next) {
    if (req.headers.origin) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, accept, x-access-token,User-Agent');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
      //res.header('Access-Control-Allow-Credentials', true);
      if (req.method === 'OPTIONS')
        return res.status(status).end(http.STATUS_CODES[status])
    }
    next()
});

let mongoClient;
async function connectToCluster () {
  try {
    mongoClient = new MongoClient(url);
    console.log('Connecting to MongoDB Atlas cluster...');
    await mongoClient.connect();
    console.log('Successfully connected to MongoDB Atlas!');
    console.log(mongoClient)
    return mongoClient;
} catch (error) {
    console.error('Connection to MongoDB Atlas failed!', error);
    process.exit();
}
}

async function createStudentcred(data) {

    let mongoClient;
    try {
      mongoClient = await connectToCluster(url);
      const db = mongoClient.db('internkul');
      const collection = db.collection('log_stud');
        return await collection.insertOne(data);
        //
    }finally {
      await mongoClient.close();
  }
}
async function findStudentsByName(email) {
  let mongoClient;
    try {
      mongoClient = await connectToCluster(url);
      const db = mongoClient.db('internkul');
      const collection = db.collection('log_stud');
        return await collection.findOne({ email });
    }finally {
      await mongoClient.close();
      
    }
}

app.post('/dashboard', async(req,res)=>{

    var email_id = req.req.body.email;

    found = await findStudentsByName(email_id);




// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("internkul");

//     app.post('/dashboard', function(res,req){
//         var email_id = req.body.email;

//         dbo.collection("log_stud").findOne({email_id: email_id}, function(err, old_result) {
        
            if (found){
                res.send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Dashboard</title>
                
                    <!-- Custom Css -->
                    <link rel="stylesheet" href="dashboard.css">
                
                    <!-- FontAwesome 5 -->
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css">
                </head>
                <body>
                    <!-- Navbar top -->
                    <div class="navbar-top">
                        <div class="title">
                            <h1>Dashboard</h1>
                        </div>
                
                        <!-- Navbar -->
                        <ul>
                            <li>
                                <a href="#sign-out">
                                    <i class="fa fa-sign-out-alt fa-2x"></i>
                                </a>
                            </li>
                        </ul>
                        <!-- End -->
                    </div>
                    <!-- End -->
                
                    <!-- Sidenav -->
                    <div class="sidenav">
                        <div class="profile">
                            <input type="image" src="" alt="" width="100" height="100">
                
                            <div class="name">
                                ${found.name}
                            </div>
                            <div class="job">
                                ${found.speciality}
                            </div>
                        </div>
                
                        <div class="sidenav-url">
                        
                            <div class="url">
                                <a href="http://localhost:3001/profile" class="active" name="profile">Profile</a>
                                <hr align="center">
                            </div>
                        
                        
                            <div class="url">
                                <a href="http://localhost:3001/internship" name="apply">Apply For Internship</a>
                                <hr align="center">
                            </div>
                            
                        
                            <div class="url">
                                <a href="http://localhost:3001/application" name="applications">My applications</a>
                                <hr align="center">
                            </div>
                           
                        #<form action="/home_emp" method="post">
                            <div class="url">
                                <a href="http://localhost:3001/courses" name="courses">Courses</a>
                                <hr align="center">
                            </div>
                            #</form>
                        #<form action="/home_emp" method="post">
                            <div class="url">
                                <a href="http://localhost:3001/documents" name="documents">My Documents</a>
                                <hr align="center">
                            </div>
                        #</form>
                        </div>
                    </div>
                    <!-- End -->
                
                    <!-- Main -->
                    <div class="main">
                        <h2>IDENTITY</h2>
                        <div class="card">
                            <div class="card-body">
                                <i class="fa fa-pen fa-xs edit"></i>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>:</td>
                                            <td>${found.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>:</td>
                                            <td>${found.email}</td>
                                        </tr>
                                        <tr>
                                            <td>Address</td>
                                            <td>:</td>
                                            <td>${found.address}</td>
                                        </tr>
                                        <tr>
                                            <td>Hobbies</td>
                                            <td>:</td>
                                            <td>${found.hobbies}</td>
                                        </tr>
                                        <tr>
                                            <td>Job</td>
                                            <td>:</td>
                                            <td>${found.speciality}</td>
                                        </tr>
                                        <tr>
                                            <td>Skill</td>
                                            <td>:</td>
                                            <td>${found.skills}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                
                        <h2>SOCIAL MEDIA</h2>
                        <div class="card">
                            <div class="card-body">
                                <i class="fa fa-pen fa-xs edit"></i>
                                <div class="social-media">
                                    <span class="fa-stack fa-sm">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-facebook fa-stack-1x fa-inverse"></i>
                                    </span>
                                    <span class="fa-stack fa-sm">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
                                    </span>
                                    <span class="fa-stack fa-sm">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-instagram fa-stack-1x fa-inverse"></i>
                                    </span>
                                    <span class="fa-stack fa-sm">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-invision fa-stack-1x fa-inverse"></i>
                                    </span>
                                    <span class="fa-stack fa-sm">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-github fa-stack-1x fa-inverse"></i>
                                    </span>
                                    <span class="fa-stack fa-sm">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-whatsapp fa-stack-1x fa-inverse"></i>
                                    </span>
                                    <span class="fa-stack fa-sm">
                                        <i class="fas fa-circle fa-stack-2x"></i>
                                        <i class="fab fa-snapchat fa-stack-1x fa-inverse"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End -->
                </body>
                </html>`);
              
            };

        });
    app.post('/profile', async(res,req)=>{
        var email_id = req.req.body.email;

    found = await findStudentsByName(email_id);

        
            if (old_result){
            res.send(``);
            }
    });


    app.post('/view_int', async(res,req)=>{

        var email_id = req.req.body.email;

    found = await findStudentsByName(email_id);

        
            if (old_result.skills == skills){
                res.send(``);
            }
    });

    app.post('/applied', async(res,req)=>{
        var email_id = req.req.body.email;

    found = await findStudentsByName(email_id);

        
                res.send(``);
            
    })

    app.post('/courses', async(res,req)=>{
        var email_id = req.req.body.email;

    found = await findStudentsByName(email_id);

        
            if (old_result.skills == skills){
                res.send(``);
            }
    })
    


app.listen(3001,function(req,res){
    console.log("Server Started at Port 3001");
});