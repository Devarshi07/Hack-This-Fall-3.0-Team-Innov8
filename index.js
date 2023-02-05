const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const axios = require("axios");
app.use(express.static('public'));
const dotenv = require('dotenv');
dotenv.config();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/internkul';
// process.env.JWT_SECRET_KEY;
// const jwt = require('jsonwebtoken');
app.use(bodyparser.urlencoded({extended: true}));
var cookieParser = require('cookie-parser')
app.use(cookieParser())
const path = require('path');

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

app.post('/signup', async(res,req,next)=>{
    // console.log(req.req.body.name);
    var name = req.req.body.name;
    var email = req.req.body.email;
    var pass =req.req.body.password;
    console.log(email);
    var obj = {name:name, email:email, pass:pass};
    console.log(obj);
    createStudentcred(obj);
    found = await findStudentsByName(email);
  
    if(found){
      console.log("email already exists!!");
      res.redirect('/login');
      next();
    }
    else{
        console.log("successfully signed up!!");
      res.redirect('/login');
      next();
    }
  });
  
  app.post('/login', async(res,req,next)=>{
    var email = req.req.body.email;
    var pass = req.req.body.password;
  
    found = await findStudentsByName(email);
  
    if(found){
      console.log("found");
      res.redirect('/dashboard');
      next();
    }
    else{
      res.redirect('/log_reg');
      next();
    }
  });



app.get('/', function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.get('/about', function(req,res){
    res.sendFile(__dirname + "/about.html");
});
app.get('/contact', function(req,res){
    res.sendFile(__dirname + "/contact.html");
});
app.get('/job-listings', function(req,res){
    res.sendFile(__dirname + "/job_listings.html");
});

app.get('/log_reg', function(req,res){
    res.sendFile(__dirname + "/login.html");
});
app.get('/signout', function(req,res){
    res.sendFile(__dirname + "/index.html");
});

// app.get('/signup', function(req,res){
//     res.sendFile(__dirname + "/sign_up.html");
// });

// app.get('/login', function(req,res){
//     res.sendFile(__dirname + "/login.html");
// });

// app.post('/signup', function(req,res){
//     console.log("Hello1");
//     var s_name = req.body.name;
//     var s_email_id = req.body.email;
//     var s_password = req.body.password;
   
//     //if(req.body.member == "student"){
//         axios.post("http://localhost:6000/add_student",{
//             headers:
//             { 
//                 'content-type': 'application/json' 
//             },
//             data: 
//             {
//                 name: s_name,
//                 email_id: s_email_id,
//                 password: s_password
//             }
//         })
            
//         .then((result) => {
//             // console.log(result.data);
//             res.redirect('/login');
//         })

//         .catch((err) => {
//             console.log(err);
//             res.send(err);
//         });
    //}

    // else if(req.body.member == "employee"){
    //     axios.post("http://localhost:3001/add_employee",{
    //         headers:
    //         { 
    //             'content-type': 'application/json' 
    //         },
    //         data: 
    //         {
    //             name: name,
    //             email_id: email_id,
    //             password: password
    //         }
    //     })
            
    //     .then((result) => {
    //         console.log(result.data);
    //         res.sendFile(__dirname + "/login.html");
    //     })

    //     .catch((err) => {
    //         console.log(err);
    //         res.send(err);
    //     });
    // }

//})

// app.post('/login', function(req,res){
// console.log("Hello");
//     var email_id = req.body.email;
//     var password = req.body.pswd;

//     //if(req.body.member == "student"){
//         axios.get("http://localhost:6000/search_student",{
//             headers:
//             { 
//                 'content-type': 'application/json' 
//             },
//             data: 
//             {
//                 email_id: email_id,
//                 password: password
//             }
//         })
            
//         .then((result) => {
//             console.log(result.data);
//             res.redirect('/home_emp');
//         })

//         .catch((err) => {
//             console.log(err);
//             res.send(err);
//         });
    // }
    
    // else if(req.body.member == "employee"){
    //     axios.post("http://localhost:3001/search_employee",{
    //         headers:
    //         { 
    //             'content-type': 'application/json' 
    //         },
    //         data: 
    //         {
    //             email_id: email_id,
    //             password: password
    //         }
    //     })
            
    //     .then((result) => {
    //         console.log(result.data);
    //         axios.post("http://localhost:3002/dash",{
    //             headers:
    //             { 
    //                 'content-type': 'application/json' 
    //             },
    //             data: 
    //             {
    //                 email_id: email_id,
    //                 password: password
    //             }
    //         })
                
    //         .then((result) => {
    //             console.log(result.data);
    //             res.redirect('/home_emp');
    //         })

    //         .catch((err) => {
    //             console.log(err);
    //             res.send(err);
    //         });
    //     })

    //     .catch((err) => {
    //         console.log(err);
    //         res.send(err);
    //     });
    // }

//});

// function verifyToken (req, res, next) {
//     console.log(req.headers);
//     //const h_token = req.header["x-access-token"];
//     //const token = h_token.split(" ")[1];
//     const token = req.cookies['x-access-token'];
//     //const token = localStorage.getItem('secretkey');
//     if (!token) {
//       return res.send("A token is required for authentication");
//     }
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//       req.user = decoded;
//       console.log("verified");
//     } catch (err) {
//       res.send("Invalid Token");
//     }
//     next();
// };

app.get('/home_stud', function(req,res){
    //res.sendFile(__dirname + "home_emp.js");
    var email_id = req.body.email;
    //var password = req.body.pswd;

    //if(req.body.member == "student"){
        axios.post("http://localhost:3000/dashboard",{
            headers:
            { 
                'content-type': 'application/json' 
            },
            data: 
            {
                email_id: email_id
            }
        })
            
        .then((result) => {
            console.log(result.data);
            res.send(result.data);
        })

        .catch((err) => {
            console.log(err);
            res.send(err);
        });
});

app.post('/dashboard', async(req,res)=>{

    var email_id = req.req.body.email;

    found = await findStudentsByName(email_id);

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

    
        if (found){
        res.send(`
        <!doctype html>
        <html lang="en">
          <head>
            <title>Innov8 </title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="description" content="" />
            <meta name="keywords" content="" />
            <meta name="author" content="Ryuk" />
            <link rel="shortcut icon" href="ftco-32x32.png">
            
            <link rel="stylesheet" href="css/custom-bs.css">
            <link rel="stylesheet" href="css/jquery.fancybox.min.css">
            <link rel="stylesheet" href="css/bootstrap-select.min.css">
            <link rel="stylesheet" href="fonts/icomoon/style.css">
            <link rel="stylesheet" href="fonts/line-icons/style.css">
            <link rel="stylesheet" href="css/owl.carousel.min.css">
            <link rel="stylesheet" href="css/animate.min.css">
            <link rel="stylesheet" href="dashboard.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css">
          </head>
          <body>
         <!-- Navbar top -->
         <div class="navbar-top">
            <div class="title">
                <h1 style="color: #ffff; font-size: 1.5rem; letter-spacing: .2rem; text-transform: uppercase;">Internkul</h1>
            </div>
        
            <!-- Navbar -->
            <ul>
                <li>
                    <a href="http://localhost:3000/dashboard">
                        <i class="fa fa-sign-out-alt fa-2x" style="color: aliceblue;"></i>
                    </a>
                </li>
            </ul>
            <!-- End -->
        </div>
        <!-- End -->
        
        <!-- Sidenav -->
        <div class="sidenav">
            <div class="profile">
                <input type="image" src="${found.image}" alt="" width="100" height="100">
        
                <div class="name">
                ${found.name}
                </div>
                <div class="job">
                ${found.stack}
                </div>
            </div>
        
            <div class="sidenav-url">
                <div class="url">
                    <a href="http://localhost:3000/dashboard">Dashboard</a>
                    <hr align="center">
                </div>
                <div class="url">
                    <a href="http://localhost:3000/profile" class= "active">Profile</a>
                    <hr align="center">
                </div>
                <div class="url">
                    <a href="http://localhost:3000/job_listings">Apply For Internship</a>
                    <hr align="center">
                </div>
                <div class="url">
                    <a href="http://localhost:3000/application">My applications</a>
                    <hr align="center">
                </div>
                <div class="url">
                    <a href="http://localhost:3000/courses">Courses</a>
                    <hr align="center">
                </div>
                <div class="url">
                    <a href="http://localhost:3000/documents">My Documents</a>
                    <hr align="center">
                </div>
            </div>
        </div>
        
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
                                <td>${found.stack}</td>
                            </tr>
                            <tr>
                                <td>Skill</td>
                                <td>:</td>
                                <td>${found.skill}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        
        
            <!-- Main -->
        
        
            <h2>SOCIAL MEDIA</h2>
            <div class="card">
                <div class="card-body">
                    <i class="fa fa-pen fa-xs edit"></i>
                    <div class="social-media">
                        <span class="fa-stack fa-sm">
                            <i class="fas fa-circle fa-stack-2x"></i>
                            <i class="fab fa-instagram fa-stack-1x fa-inverse"></i>
                        </span>
                        <span class="fa-stack fa-sm">
                            <i class="fas fa-circle fa-stack-2x"></i>
                            <i class="fab fa-facebook fa-stack-1x fa-inverse"></i>
                        </span>
                        <span class="fa-stack fa-sm">
                            <i class="fas fa-circle fa-stack-2x"></i>
                            <i class="fab fa-github fa-stack-1x fa-inverse"></i>
                        </span>
                    </div>
                </div>
            </div>
        </div>
            
        </body>`);
        }
});


app.post('/view_int', async(res,req)=>{

    var email_id = req.req.body.email;

found = await findStudentsByName(email_id);

    
        if (found.skills == skills){
            res.send(`
            <!doctype html>
            <html lang="en">
              <head>
                <title>Innov8</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                
                
                <link rel="stylesheet" href="css/custom-bs.css">
                <link rel="stylesheet" href="css/jquery.fancybox.min.css">
                <link rel="stylesheet" href="css/bootstrap-select.min.css">
                <link rel="stylesheet" href="fonts/icomoon/style.css">
                <link rel="stylesheet" href="fonts/line-icons/style.css">
                <link rel="stylesheet" href="css/owl.carousel.min.css">
                <link rel="stylesheet" href="css/animate.min.css">
                <link rel="stylesheet" href="css/quill.snow.css">
                
            
                <!-- MAIN CSS -->
                <link rel="stylesheet" href="css/style.css">    
              </head>
              <body id="top">
            
              <div id="overlayer"></div>
              <div class="loader">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
                
            
            <div class="site-wrap">
            
                <div class="site-mobile-menu site-navbar-target">
                  <div class="site-mobile-menu-header">
                    <div class="site-mobile-menu-close mt-3">
                      <span class="icon-close2 js-menu-toggle"></span>
                    </div>
                  </div>
                  <div class="site-mobile-menu-body"></div>
                </div> <!-- .site-mobile-menu -->
                
            
                <!-- NAVBAR -->
                <header class="site-navbar mt-3">
                  <div class="container-fluid">
                    <div class="row align-items-center">
                      <div class="site-logo col-6"><a href="http://localhost:3000/">Internkul</a></div>
            
                      <nav class="mx-auto site-navigation">
                        <ul class="site-menu js-clone-nav d-none d-xl-block ml-0 pl-0">
                          <li><a href="http://localhost:3000/" class="nav-link">Home</a></li>
                          <li><a href="http://localhost:3000/about">About</a></li>
                            <a href="http://localhost:3000/job_listings" class="active">Internships </a>
                          <li><a href="contact.html">Contact</a></li>
                          <li class="d-lg-none"><a href="http://localhost:3000/log_reg">Log In</a></li>
                        </ul>
                      </nav>
                      
                      <div class="right-cta-menu text-right d-flex aligin-items-center col-6">
                        <div class="ml-auto">
                          <a href="http://localhost:3000/log_reg_rec" class="btn btn-outline-white border-width-2 d-none d-lg-inline-block"><span class="mr-2 icon-add"></span>Post a Internship</a>
                          <a href="http://localhost:3000/log_reg" class="btn btn-primary border-width-2 d-none d-lg-inline-block"><span class="mr-2 icon-lock_outline"></span>Log In</a>
                        </div>
                        <a href="#" class="site-menu-toggle js-menu-toggle d-inline-block d-xl-none mt-lg-2 ml-3"><span class="icon-menu h3 m-0 p-0 mt-2"></span></a>
                      </div>
            
                    </div>
                  </div>
                </header>
            
                <!-- HOME -->
              <section class="section-hero home-section overlay inner-page bg-image" id="home-section">
            
                  <div class="container">
                    <div class="row align-items-center justify-content-center">
                      <div class="col-md-12">
                        <div class="mb-5 text-center">
                          <h1 class="text-white font-weight-bold">The Easiest Way To Get Your Internship</h1>
                        </div>
                        <form method="post" class="search-jobs-form">
                          <div class="row mb-5">
                            <div class="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                              <select class="selectpicker" data-style="btn-white btn-lg" data-width="100%" data-live-search="true" title="Select Internship Type">
                                <option>Part Time</option>
                                <option>Full Time</option>
                              </select>
                            </div>
                            <div class="col-12 col-sm-6 col-md-6 col-lg-3 mb-4 mb-lg-0">
                              <button type="submit" class="btn btn-primary btn-lg btn-block text-white btn-search"><span class="icon-search icon mr-2"></span>Search Job</button>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-md-12 popular-keywords">
                              <h3>Trending Keywords:</h3>
                              <ul class="keywords list-unstyled m-0 p-0">
                                <li><a href="#" class="">UI Designer</a></li>
                                <li><a href="#" class="">Python</a></li>
                                <li><a href="#" class="">Developer</a></li>
                              </ul>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
            
                  <a href="#next" class="scroll-button smoothscroll">
                    <span class=" icon-keyboard_arrow_down"></span>
                  </a>
                </section>
            
                
                <section class="site-section">
                  <div class="container">
            
                    <div class="row mb-5 justify-content-center">
                      <div class="col-md-7 text-center">
                        <h2 class="section-title mb-2">167 Internship Listed</h2>
                      </div>
                    </div>
                    
                    <ul class="job-listings mb-5">
                      <li class="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                        <a href="http://localhost:3000/job_listings"></a>
                        <div class="job-listing-logo">
                          <img src="https://newsonair.gov.in/writereaddata/News_Pictures/NAT/2021/Feb/NPIC-2021227135647.jpg" alt="Free Website Template by Free-Template.co" class="img-fluid">
                        </div>
            
                        <div class="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                          <div class="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                            <h2>Logo Designer</h2>
                            <strong>Ministry of Agriculture</strong>
                          </div>
                          <div class="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                            <span class="icon-room"></span> Pan India
                          </div>
                          <div class="job-listing-meta">
                            <span class="badge badge-danger">15 Days 2.5K Stipend</span>
                          </div>
                        </div>
                        
                      </li>
                      <li class="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                        <a href="job-single.html"></a>
                        <div class="job-listing-logo">
                          <img src="https://play-lh.googleusercontent.com/4jlq9fgOmpkCikwBzJYkbXlkruFo1ygmaLaaLcLph9ln8sQgQ78P0-6teFkczp1S0N-l" alt="Free Website Template by Free-Template.co" class="img-fluid">
                        </div>
            
                        <div class="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                          <div class="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                            <h2>Front End Developer</h2>
                            <strong>Digilocker</strong>
                          </div>
                          <div class="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                            <span class="icon-room"></span> Pune, India 
                          </div>
                          <div class="job-listing-meta">
                            <span class="badge badge-success">1 Month , 8k Stipend</span>
                          </div>
                        </div>
                      </li>
            
                      <li class="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                        <a href="job-single.html"></a>
                        <div class="job-listing-logo">
                          <img src="https://play-lh.googleusercontent.com/4jlq9fgOmpkCikwBzJYkbXlkruFo1ygmaLaaLcLph9ln8sQgQ78P0-6teFkczp1S0N-l" alt="Free Website Template by Free-Template.co" class="img-fluid">
                        </div>
            
                        <div class="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                          <div class="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                            <h2>Back-end Engineer</h2>
                            <strong>  Digi Locker</strong>
                          </div>
                          <div class="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                            <span class="icon-room"></span> Pune, India 
                          </div>
                          <div class="job-listing-meta">
                            <span class="badge badge-success">3 Months , 10k Stipend</span>
                          </div>
                        </div>
                      </li>
            
                      <li class="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                        <a href="job-single.html"></a>
                        <div class="job-listing-logo">
                          <img src="https://presentations.gov.in/wp-content/uploads/2020/06/Preview-8.png?x19336" alt="Free Website Template by Free-Template.co" class="img-fluid">
                        </div>
            
                        <div class="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                          <div class="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                            <h2> Art Director</h2>
                            <strong>Indian Flim Institute</strong>
                          </div>
                          <div class="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                            <span class="icon-room"></span> Pan, India
                          </div>
                          <div class="job-listing-meta">
                            <span class="badge badge-success">1 Month , 7k Stipend</span>
                          </div>
                        </div>
                      </li>
            
                      <li class="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                        <a href="job-single.html"></a>
                        <div class="job-listing-logo">
                          <img src="https://w7.pngwing.com/pngs/938/277/png-transparent-coal-india-coal-mining-business-india-white-text-logo.png" alt="Free Website Template by Free-Template.co" class="img-fluid">
                        </div>
            
                        <div class="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                          <div class="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                            <h2>Coal India</h2>
                            <strong>R&D </strong>
                          </div>
                          <div class="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                            <span class="icon-room"></span> JharKhand, India 
                          </div>
                          <div class="job-listing-meta">
                            <span class="badge badge-success">6 Months , 10k-12k Stipend</span>
                          </div>
                        </div>
                      </li>
                      <li class="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                        <a href="job-single.html"></a>
                        <div class="job-listing-logo">
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqXfh8u9OH0OSdxHFJkZ478d2-rVcxJ0r9Yw&usqp=CAU" alt="Free Website Template by Free-Template.co" class="img-fluid">
                        </div>
            
                        <div class="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                          <div class="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                            <h2>Interior Desginer</h2>
                            <strong>PMRDA</strong>
                          </div>
                          <div class="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                            <span class="icon-room"></span> Pune,India
                          </div>
                          <div class="job-listing-meta">
                            <span class="badge badge-danger">2 Months , 8k-12k Stipend</span>
                          </div>
                        </div>
                        
                      </li>
                      <li class="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                        <a href="job-single.html"></a>
                        <div class="job-listing-logo">
                          <img src="https://ongcindia.com/documents/77751/1767704/2203_logopng.png/9c8ae834-3067-b310-e32f-6dd0703b8720" alt="Free Website Template by Free-Template.co" class="img-fluid">
                        </div>
            
                        <div class="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                          <div class="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                            <h2>Jr.Chemical Engineer</h2>
                            <strong>ONGCL</strong>
                          </div>
                          <div class="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                            <span class="icon-room"></span> Mumbai, India 
                          </div>
                          <div class="job-listing-meta">
                            <span class="badge badge-success">3 Months , 10k-12k Stipend</span>
                          </div>
                        </div>
                      </li>
            
                      <li class="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center">
                        <a href="job-single.html"></a>
                        <div class="job-listing-logo">
                          <img src="https://smartcities.gov.in/sites/default/files/2021-02/TULIP.png" alt="Free Website Template by Free-Template.co" class="img-fluid">
                        </div>
            
                        <div class="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                          <div class="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                            <h2>Network Support Engineer</h2>
                            <strong>Tulip Group</strong>
                          </div>
                          <div class="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                            <span class="icon-room"></span> Vadodra, India 
                          </div>
                          <div class="job-listing-meta">
                            <span class="badge badge-success">2 Months , 10k Stipend</span>
                          </div>
                        </div>
                      </li>
            
                      
            
                      
                    </ul>
            
                    <div class="row pagination-wrap">
                      <div class="col-md-6 text-center text-md-left mb-4 mb-md-0">
                        <span>Showing 1-8 Of 167 Internships</span>
                      </div>
                      <div class="col-md-6 text-center text-md-right">
                        <div class="custom-pagination ml-auto">
                          <a href="#" class="prev">Prev</a>
                          <div class="d-inline-block">
                          <a href="#" class="active">1</a>
                          <a href="#">2</a>
                          <a href="#">3</a>
                          <a href="#">4</a>
                          </div>
                          <a href="#" class="next">Next</a>
                        </div>
                      </div>
                    </div>
            
                  </div>
                </section>
            
                <section class="py-5 bg-image overlay-primary fixed overlay">
                  <div class="container">
                    <div class="row align-items-center">
                      <div class="col-md-8">
                        <h2 class="text-white">Looking For A Job?</h2>
                        <p class="mb-0 text-white lead">Lorem ipsum dolor sit amet consectetur adipisicing elit tempora adipisci impedit.</p>
                      </div>
                      <div class="col-md-3 ml-auto">
                        <a href="#" class="btn btn-warning btn-block btn-lg">Sign Up</a>
                      </div>
                    </div>
                  </div>
                </section>
            
                
                
                <footer class="site-footer">
            
                  <a href="#top" class="smoothscroll scroll-top">
                    <span class="icon-keyboard_arrow_up"></span>
                  </a>
            
                  <div class="container">
                    <div class="row mb-5">
                      <div class="col-6 col-md-3 mb-4 mb-md-0">
                        <h3>Search Trending</h3>
                        <ul class="list-unstyled">
                          <li><a href="#">Web Design</a></li>
                          <li><a href="#">Graphic Design</a></li>
                          <li><a href="#">Web Developers</a></li>
                          <li><a href="#">Python</a></li>
                          <li><a href="#">HTML5</a></li>
                          <li><a href="#">CSS3</a></li>
                        </ul>
                      </div>
                      <div class="col-6 col-md-3 mb-4 mb-md-0">
                        <h3>Company</h3>
                        <ul class="list-unstyled">
                          <li><a href="#">About Us</a></li>
                        </ul>
                      </div>
                      <div class="col-6 col-md-3 mb-4 mb-md-0">
                        <h3>Support</h3>
                        <ul class="list-unstyled">
                          <li><a href="#">Support</a></li>
                          <li><a href="#">Privacy</a></li>
                          <li><a href="#">Terms of Service</a></li>
                        </ul>
                      </div>
                      <div class="col-6 col-md-3 mb-4 mb-md-0">
                        <h3>Contact Us</h3>
                        <div class="footer-social">
                          <a href="#"><span class="icon-facebook"></span></a>
                          <a href="#"><span class="icon-twitter"></span></a>
                          <a href="#"><span class="icon-instagram"></span></a>
                          <a href="#"><span class="icon-linkedin"></span></a>
                        </div>
                      </div>
                    </div>
            
                    <div class="row text-center">
                      <div class="col-12">
                        <p class="copyright"><small>
                        Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This is made by team Innov8 </small></p>
                      </div>
                    </div>
                  </div>
                </footer>
              
              </div>
            
                <!-- SCRIPTS -->
                <script src="js/jquery.min.js"></script>
                <script src="js/bootstrap.bundle.min.js"></script>
                <script src="js/isotope.pkgd.min.js"></script>
                <script src="js/stickyfill.min.js"></script>
                <script src="js/jquery.fancybox.min.js"></script>
                <script src="js/jquery.easing.1.3.js"></script>
                
                <script src="js/jquery.waypoints.min.js"></script>
                <script src="js/jquery.animateNumber.min.js"></script>
                <script src="js/owl.carousel.min.js"></script>
                <script src="js/quill.min.js"></script>
                
                
                <script src="js/bootstrap-select.min.js"></script>
                
                <script src="js/custom.js"></script>
               
               
                 
              </body>
            </html>`);
        }
});

app.post('/applied', async(res,req)=>{
    var email_id = req.req.body.email;

found = await findStudentsByName(email_id);

    
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
                        <h1 style="color: #ffff; font-size: 1.5rem; letter-spacing: .2rem; text-transform: uppercase;">Internkul</h1>
                    </div>
            
                    <!-- Navbar -->
                    <ul>
                        <li>
                            <a href="http://localhost:3000/signout">
                                <i class="fa fa-sign-out-alt fa-2x" style="color: aliceblue;"></i>
                            </a>
                        </li>
                    </ul>
                    <!-- End -->
                </div>
                <!-- End -->
            
                <!-- Sidenav -->
                <div class="sidenav">
                    <div class="profile">
                        <input type="image" src="Innov8\jobboard-master\images\person_5.jpg" alt="" width="100" height="100">
            
                        <div class="name">
                            ${found.name}
                        </div>
                        <div class="job">
                             ${found.stack}
                        </div>
                    </div>
            
                    <div class="sidenav-url">
                        <div class="url">
                            <a href="http://localhost:3000/dashboard" >Dashboard</a>
                            <hr align="center">
                        </div>
                        <div class="url">
                            <a href="http://localhost:3000/profile">Profile</a>
                            <hr align="center">
                        </div>
                        <div class="url">
                            <a href="http://localhost:3000/job_listings"  >Apply For Internship</a>
                            <hr align="center">
                        </div>
                        <div class="url">
                            <a href="http://localhost:3000/application" class="active" >My applications</a>
                            <hr align="center">
                        </div>
                        <div class="url">
                            <a href="http://localhost:3000/courses" >Courses</a>
                            <hr align="center">
                        </div>
                        <div class="url">
                            <a href="http://localhost:3000/documents"  >My Documents</a>
                            <hr align="center">
                        </div>
                    </div>
                </div>
            
                <!-- End -->
            </body>
            </html>`);
        
})

app.get('/courses', async(res,req)=>{
    var email_id = req.req.body.email;
    res.sendFile(__dirname + "/Courses.html");
})

app.listen(3000,function(req,res){
    console.log("Server Started at Port 3000");
});