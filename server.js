const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongo = require('mongodb');
const path = require('path');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');
const fetch = require('node-fetch');
const schedule = require('node-schedule');
require('dotenv').config();

const jwtKey = process.env.JWT_KEY;
const sendgridKey = process.env.SENDGRID_API_KEY;
const mongoURL = process.env.MONGODB_URI;

sgMail.setApiKey(sendgridKey);

const MongoClient = mongo.MongoClient;

const client = new MongoClient(mongoURL);
client.connect();

const PORT = process.env.PORT || 5000;
const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// token expires after 1 hour
const sessionLength = 3600000;

//expiration time of 0 makes token last for duration of browser session
//const sessionLength = 0;

//automatically refresh movies every thursday at midnight
var refreshMovies = schedule.scheduleJob('0 0 * * 4', async function(){
  console.log('Movies refreshed');
  var error = await UpdateMovies();
  console.log(error);
});
app.use((req, res, next) =>
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});
//////////////////////////////////////////////////
// For Heroku deployment

// Server static assets if in production
if (process.env.NODE_ENV === 'production')
{
  // Set static folder
  app.use(express.static('frontend/build'));


  app.get('*', (req, res) =>
 {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

app.post('/API/AddUser', async (req, res, next) =>
{

  var err = '';

  const { email, login, password, firstName, lastName } = req.body;
  const db = client.db();
  var results = await db.collection('users').find({email:email}).toArray();
  if(results.length > 0){
    err = 'Email already used';
  }
  else {
    var results = await db.collection('users').find({login: login}).toArray();
    if(results.length > 0){
      err = 'Login already used';
    }
    else{
      db.collection('users').insertOne({email:email,login:login,password:password,firstName:firstName,
        lastName:lastName,isVerified:false,vToken:null,pToken:null, friends: []}, async (error, result) => {
          if(error){
            err = error;
          }
          else{
            const vToken = jwt.sign(result.ops[0], jwtKey);
            db.collection('users').update({_id : new mongo.ObjectID(result.ops[0]._id)}, {$set: {vToken: vToken}});
           err = await SendEmailVerification(email, vToken);
          }
        });
    }
  }

  var ret = { error: err };
  res.status(200).json(ret);
});

app.post('/API/EditUser', async (req, res, next) =>
{

  var error = '';
  const { token, userID, email, login, password, firstName, lastName } = req.body;
  if(! token){
    error = "No token provided";
  }
  else{
    jwt.verify(token, jwtKey, (err,decoded)=>
      {
        if(err){
          error = err;
        }
        else{
          if(decoded._id != userID){
            error = "Token does not match userID";
          }
          else{
            const db = client.db();
            if(password){
              db.collection('users').update({_id: new mongo.ObjectID(userID)},{$set:{email:email,login:login,password:password,
                firstName:firstName,lastName:lastName}})
            }
            else{
              db.collection('users').update({_id: new mongo.ObjectID(userID)},{$set: {email:email,login:login,
                firstName:firstName,lastName:lastName}})
            }
          }
        }
      });
  }
 var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/DeleteUser', async (req, res, next) =>
{

  var error = '';

  const { token, userID } = req.body;
  if(! token){
    error = "No token provided";
  }
  else{
    jwt.verify(token, jwtKey, (err,decoded)=>
      {
        if(err){
          error = err;
        }
        else{
          if(decoded._id != userID){
            error = "Token does not match userID";
          }
          else{
            const db = client.db();
            db.collection('users').deleteOne({_id: new mongo.ObjectID(userID)});
          }
        }
      });
    }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/UserLogin', async (req, res, next) =>
{

 var error = '';

  const { login, password } = req.body;

  const db = client.db();
  const results = await db.collection('users').find({login:login,password:password}).toArray();

  var fn = '';
  var ln = '';
  var lg = '';
  var isver = '';
  var email = '';
  var id = '';
  var token;

  if( results.length > 0 )
  {
    id = results[0]._id;
    lg = results[0].login;
    fn = results[0].firstName;
    ln = results[0].lastName;
    isver = results[0].isVerified;
    email = results[0].email;
    token = jwt.sign(results[0], jwtKey, {
      expiresIn: sessionLength
    });
    console.log(token);
  }
  else{
    error = "Username or password incorrect";
  }
  var ret = { token: token, id: id, login:lg, firstName:fn, lastName:ln, email: email, isVerified: isver, error:error};
    res.status(200).json(ret);
});

app.post('/API/GetUserByID', async (req, res, next) =>
{
 var error = '';

  const { userID } = req.body;

  const db = client.db();
  const results = await db.collection('users').find({_id : new mongo.ObjectID(userID)}).toArray();

  var login = '';
  var fn = '';
  var ln = '';
  var isver = '';
  var email = '';

  if( results.length > 0 )
  {
    login = results[0].login;
    fn = results[0].firstName;
    ln = results[0].lastName;
    isver = results[0].isVerified;
    email = results[0].email;
  }

  var ret = { login:login, firstName:fn, lastName:ln, email: email, isVerified:isver,error:error};
  res.status(200).json(ret);
});

app.post('/API/GetUserByLogin', async (req, res, next) =>
{
 var error = '';

  const { login } = req.body;

  const db = client.db();
  const results = await db.collection('users').find({login : login}).toArray();

  var id = '';
  var fn = '';
  var ln = '';
  var isver = '';
  var email = '';

  if( results.length > 0 )
  {
    id = results[0]._id;
    fn = results[0].firstName;
    ln = results[0].lastName;
    isver = results[0].isVerified;
    email = results[0].email;
  }

  var ret = { id:id, firstName:fn, lastName:ln, email: email, isVerified:isver, error:error};
  res.status(200).json(ret);
});

app.post('/API/AddGroup', async (req, res, next) =>
{

  var error = '';

  const { token, name, description, members, messages } = req.body;
  if(! token){
    error = "No token provided";
  }
  else{
    jwt.verify(token, jwtKey, (err,decoded)=>
      {
        if(err){
          error = err;
        }
        else{
        const db = client.db();
        db.collection('groups').insert({name:name,description:description,members:members, messages: messages})
      }
    });
  }
  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/EditGroup', async (req, res, next) =>
{

  var error = '';

  const { token, groupID, name, description } = req.body;
  if(! token){
    error = "No token provided";
  }
  else{
    jwt.verify(token, jwtKey, (err,decoded)=>
      {
        if(err){
          error = err;
        }
        else{
        const db = client.db();
        db.collection('groups').update({_id: new mongo.ObjectID(groupID)},{$set: {name:name,description:description}})
      }
    });
  }
  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/DeleteGroup', async (req, res, next) =>
{

  var error = '';

  const { token, groupID } = req.body;
  if(! token){
    error = "No token provided";
  }
  else{
    jwt.verify(token, jwtKey, (err,decoded)=>
      {
        if(err){
          error = err;
        }
        else{
          const db = client.db();
          db.collection('groups').deleteOne({_id: new mongo.ObjectID(groupID)})
        }
      });
    }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/AddUserToGroup', async (req, res, next) =>
{

  var error = '';

  const { token, groupID, userID } = req.body;

  if(! token){
    error = "No token provided";
  }
  else{
    jwt.verify(token, jwtKey, (err,decoded)=>
      {
        if(err){
          error = err;
        }
        else{
            const db = client.db();
            db.collection('groups').update({_id: new mongo.ObjectID(groupID)},{ $addToSet: {members: {userID : userID, yesList : [], noList : []}}});
        }
      });
    }
  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/DeleteUserFromGroup', async (req, res, next) =>
{
  var error = '';

  const { token, groupID, userID } = req.body;
  if(! token){
    error = "No token provided";
  }
  else{
    jwt.verify(token, jwtKey, (err,decoded)=>
      {
        if(err){
          error = err;
        }
        else{
          if(decoded._id != userID){
            error = "Token does not match userID";
          }
          else{
          const db = client.db();
          db.collection('groups').update({_id: new mongo.ObjectID(groupID)},{ $pull: {members: {"userID" : userID}}});
          }
        }
      });
    }
  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/ListGroups', async (req, res, next) =>
{
  var error = '';
  var groups = [];
  const { token, userID } = req.body;
  if(! token){
    error = "No token provided";
    var ret = {groups : groups, error: error};
    res.status(200).json(ret);
  }
  else{
    jwt.verify(token, jwtKey, async (err,decoded) =>
    {
        if(err){
          error = err;
        }
        else{
          if(decoded._id != userID){
            error = "Token does not match userID";
          }
          else{
            error = '';
            const db = client.db();
            groups = await db.collection('groups').find({"members.userID" : userID}).toArray();
          }
        }
        var ret = {groups : groups, error: error};
        res.status(200).json(ret);
      });
    }
});

app.post('/API/AddMovieToList', async (req, res, next) =>
{
  var error = '';

  const { token, groupID, userID, movieID, liked } = req.body;
  if(! token){
    error = "No token provided";
    var ret = { error: error };
    res.status(200).json(ret);
  }
  else{
    jwt.verify(token, jwtKey, async (err,decoded)=>
      {
        if(err){
          error = err;
        }
        else{
          if(decoded._id != userID){
            error = "Token does not match userID";
          }
          else{
            const db = client.db();
            if(liked){
              db.collection('groups').update({_id: new mongo.ObjectID(groupID) , "members.userID" : userID},
                { $addToSet: {"members.$.yesList" : {movieID : movieID}}});
              }
              else{
                db.collection('groups').update({_id: new mongo.ObjectID(groupID) , "members.userID" : userID},
                  { $addToSet: {"members.$.noList" : {movieID : movieID}}});
              }
            }
          }
          var ret = { error: error };
          res.status(200).json(ret);
        });
      }
});

app.post('/API/AddMovieToAllLists', async (req, res, next) =>
{
  var error = '';

  const { token, userID, movieID, liked } = req.body;
  if(! token){
    error = "No token provided";
    var ret = { error: error };
    res.status(200).json(ret);
  }
  else{
    jwt.verify(token, jwtKey, async (err,decoded)=>
      {
        if(err){
          error = err;
        }
        else{
          if(decoded._id != userID){
            error = "Token does not match userID";
          }
          else{
            const db = client.db();
            if(liked){
              db.collection('groups').updateMany({"members.userID" : userID},
                { $addToSet: {"members.$.yesList" : {movieID : movieID}}});
              }
              else{
                db.collection('groups').updateMany({"members.userID" : userID},
                  { $addToSet: {"members.$.noList" : {movieID : movieID}}});
              }
            }
          }
          var ret = { error: error };
          res.status(200).json(ret);
        });
      }
});

app.post('/API/GetMovieApprovals', async (req, res, next) =>
{
  var error = '';
  var movieVotes = [];
  const { groupID } = req.body;

  const db = client.db();
  const results = await db.collection('groups').find({_id: new mongo.ObjectID(groupID)}).toArray();

  if(results.length == 0){
    error = "Group not found";
  }
  else{
        membersList = results[0].members;
        var yesVotes = new Map();
        var noVotes = new Map();

        membersList.forEach(function(memberInfo){
          memberInfo.yesList.forEach(function(movieInfo){
            if(yesVotes.has(movieInfo.movieID)){
              yesVotes.set(movieInfo.movieID, yesVotes.get(movieInfo.movieID) + 1);
            }
            else{
              yesVotes.set(movieInfo.movieID, 1);
            }
          });
          memberInfo.noList.forEach(function(movieInfo){
            if(noVotes.has(movieInfo.movieID)){
              noVotes.set(movieInfo.movieID, noVotes.get(movieInfo.movieID) + 1);
            }
            else{
              noVotes.set(movieInfo.movieID, 1);
            }
          });
        });

        var moviesList = Array.from(yesVotes.keys()).concat(Array.from(noVotes.keys()).filter((item) => !yesVotes.has(item)));
        movieVotes = moviesList.map(function(m){
          var yesCount = 0;
          var noCount = 0;
          if(yesVotes.has(m)){
            yesCount = yesVotes.get(m);
          }
          if(noVotes.has(m)){
            noCount = noVotes.get(m);
          }
          return {movie: m, yesVotes: yesCount, noVotes: noCount }
        });
    }

  var ret = { movies: movieVotes, error: error };
  res.status(200).json(ret);
});

app.post('/API/GetSortedMovies', async (req, res, next) =>
{
  var error = '';
  var moviesList = [];
  const { groupID } = req.body;

  const db = client.db();
  const results = await db.collection('groups').find({_id: new mongo.ObjectID(groupID)}).toArray();

  if(results.length == 0){
    error = "Group not found";
  }
  else{
        membersList = results[0].members;
        var yesVotes = new Map();
        var noVotes = new Map();

        membersList.forEach(function(memberInfo){
          memberInfo.yesList.forEach(function(movieInfo){
            if(! movieInArray(movieInfo.movieID ,moviesList)){
              console.log(movieInfo.movieID.id);
              moviesList.push(movieInfo.movieID);
            }
            if(yesVotes.has(movieInfo.movieID._id)){
              yesVotes.set(movieInfo.movieID._id, yesVotes.get(movieInfo.movieID._id) + 1);
            }
            else{
              yesVotes.set(movieInfo.movieID._id, 1);
            }
          });
          memberInfo.noList.forEach(function(movieInfo){
            if(! movieInArray(movieInfo.movieID,moviesList)){
              console.log(movieInfo.movieID.id);
              moviesList.push(movieInfo.movieID);
            }
            if(noVotes.has(movieInfo.movieID._id)){
              noVotes.set(movieInfo.movieID._id, noVotes.get(movieInfo.movieID._id) + 1);
            }
            else{
              noVotes.set(movieInfo.movieID._id, 1);
            }
          });
        });

        moviesList.sort(function(a,b){
          if (!yesVotes.has(a._id) || !noVotes.has(b._id)){
            return 1;
          }
          if(!yesVotes.has(b._id) || !noVotes.has(a._id)){
            return -1;
          }
          return ( (yesVotes.get(a._id) / noVotes.get(a._id)) < (yesVotes.get(b._id) / noVotes.get(b._id)) );
        });
      }

  var ret = { movies:moviesList, error: error };
  res.status(200).json(ret);
});

function movieInArray(movieInfo, movieArray){
  var res = false;
  movieArray.forEach(function (m){
    if(m.id == movieInfo.id){
      res = true;
    }
  });
  return res;
}

app.post('/API/AddFriend', async (req, res, next) =>
{

  var error = '';

  const { token, user1, user2 } = req.body;
  if(! token){
    error = "No token provided";
    var ret = { error: error };
    res.status(200).json(ret);
  }
  else{
    jwt.verify(token, jwtKey, async (err,decoded)=>
      {
        if(err){
          error = err;
        }
        else{
          const db = client.db();
          db.collection('users').update({_id: new mongo.ObjectID(user1)},{ $addToSet: {friends: {userID : user2}}});
          db.collection('users').update({_id: new mongo.ObjectID(user2)},{ $addToSet: {friends: {userID : user1}}});
        }
        var ret = { error: error };
        res.status(200).json(ret);
      });
    }
});

app.post('/API/DeleteFriend', async (req, res, next) =>
{

  var error = '';

  const { token, user1, user2 } = req.body;
  if(! token){
    error = "No token provided";
    var ret = { error: error };
    res.status(200).json(ret);
  }
  else{
    jwt.verify(token, jwtKey, async (err,decoded)=>
      {
        if(err){
          error = err;
        }
        else{
          const db = client.db();
          db.collection('users').update({_id: new mongo.ObjectID(user1)},{ $pull: {friends: {userID : user2}}});
          db.collection('users').update({_id: new mongo.ObjectID(user2)},{ $pull: {friends: {userID : user1}}});
        }
        var ret = { error: error };
        res.status(200).json(ret);
      });
    }
});

app.post('/API/ListFriends', async (req, res, next) =>
{
  var error = '';
  var friends = [];
  const { token, userID } = req.body;
  if(! token){
    error = "No token provided";
    var ret = { friends: friends, error: error};
    res.status(200).json(ret);
  }
  else{
    jwt.verify(token, jwtKey, async (err,decoded)=>
      {
        if(err){
          error = err;
        }
        else{
          if(decoded._id != userID){
            error = "Token does not match userID";
          }
          else{
            const db = client.db();
            const results = await db.collection('users').find({_id : new mongo.ObjectID(userID)}).toArray();

            if( results.length > 0 )
            {
              friends = results[0].friends;
            }
          }
        }
        var ret = { friends: friends, error: error};
        res.status(200).json(ret);
      });
    }
});

app.post('/API/UpdateMovies', async (req, res, next) =>
{
  var error = await UpdateMovies();
  var ret = { error: error };
  res.status(200).json(ret);
});

async function UpdateMovies(){
  var error = '';
  var results;
  var movies = [];
  try {
  var response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ce41792ee6b56545a5a67c7e6705976c&language=en-US&page=1&region=US', {
      method:'GET',body:null,headers: {
          'Content-Type': 'application/json',
      }
    });

   results = JSON.parse(await response.text());
 }
 catch(e){
   error = e;
 }

  if(! results){
    error = "Could not fetch updated movies";
  }
  else{
    for(var k = 1; k <= results.total_pages; k++){
      try {    
      response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=ce41792ee6b56545a5a67c7e6705976c&language=en-US&page='+k+'&region=US', {
          method:'GET',body:null,headers:{
              'Content-Type': 'application/json',
          }
      });

       results = JSON.parse(await response.text());
       movies = movies.concat(results.results);
      } catch(e) {
        error = e;
      }  
    }
  }

  const db = client.db();
  db.collection('movies').remove({});
  movies.forEach(function(movieInfo){
    db.collection('movies').insert(movieInfo)
  });

  return error;
}

app.post('/API/GetMovies', async (req,res,next) =>
{
  var error = '';

   //const { page } = req.body;

   const db = client.db();
   const results = await db.collection('movies').find().toArray();
   //var moviesList = results.slice((page-1)*10,page*10);

   var ret = { movies: results, error:error};

   res.status(200).json(ret);
}

);

app.post('/API/GetMoviesPage', async (req,res,next) =>
{
  var error = '';

   const { page } = req.body;

   const db = client.db();
   const results = await db.collection('movies').find().toArray();
   var moviesList = results.slice((page-1)*10,page*10);

   var ret = { movies: moviesList, error:error};

   res.status(200).json(ret);
}

);

app.post('/API/GetNumMoviePages', async (req,res,next) =>
{
  var error = '';

   //const { page } = req.body;

   const db = client.db();
   const results = await db.collection('movies').find().toArray();
   //var moviesList = results.slice((page-1)*10,page*10);

   var ret = { num: Math.floor(results.length / 10) + 1, error:error};

   res.status(200).json(ret);
}

);

app.post('/API/MessageGroup', async (req, res, next) =>
{
  var error = '';
  const { token, groupID, userID, message } = req.body;
  if(! token){
    error = "No token provided";
    var ret = {error : error};
    res.status(200).json(ret);
  }
  else{
    jwt.verify(token, jwtKey, async (err, decoded) =>
    {
      if(err){
        error = err;
      }
      else{
        if(decoded._id != userID){
          error = "Token  does not match userID";
        }
        else{
          const db = client.db();
          db.collection('groups').update({_id : new mongo.ObjectID(groupID)}, {$addToSet:
            {"messages" : {senderID: userID, message: message, timeSent: new Date()}}});
        }
      }
      var ret = {error : error};
      res.status(200).json(ret);
    });
  }
});

app.post('/API/ListGroupMessages', async (req, res, next) =>
{
  error = '';
  messages = [];
  const { token, groupID } = req.body;
  if( ! token ){
    error = "No token provided";
    var ret = {messages: messages, error: error};
    res.status(200).json(ret);
  }
  else{
    jwt.verify(token, jwtKey, async (err, decoded) =>
    {
      if(err){
        error = err;
      }
      else{
        const db = client.db();
        const results = await db.collection('groups').find({_id: new mongo.ObjectID(groupID)}).toArray();

        if(results.length > 0){
          messages = results[0].messages;
        }
        else{
          error = "Group not found";
        }
      }
      var ret = {messages: messages, error: error};
      res.status(200).json(ret);
    });
  }
});

async function SendEmailVerification(email, token){
  err = '';
  //link for testing local server
  //var linkURL = 'http://localhost:5000/Reset?token='+token;
  //link for production
  var linkURL = 'http://cine-mates.herokuapp.com/Verify?token=' + token;
  const msg = {
    to: email, // Change to your recipient
    from: 'cinematesconfirmation@gmail.com', // Change to your verified sender
    subject: 'Cinemates Email Confirmation',
    html: '<p style="color:black">Please click the following link to verify your email with Cinemates</strong></p><a href= "'+linkURL+'">'+linkURL+'</a><p style="color:black"><b>If you did not request this</b>, please change your Cinemates passsword and consider changing your email password as well to ensure your account security.</strong></p>',
  }
  sgMail
    .send(msg)
    .then(() => {
    console.log('Email sent')
  })
    .catch((error) => {
      err = error;
    console.error(error)
  })
  return err;
}

async function SendPasswordReset(email, token){
  err = '';
  //link for testing local server
  //var linkURL = 'http://localhost:5000/Reset?token='+token;
  //link for production
  var linkURL = 'http://cine-mates.herokuapp.com/Reset?token=' + token;
  const msg = {
    to: email, // Change to your recipient
    from: 'cinematesconfirmation@gmail.com', // Change to your verified sender
    subject: 'Cinemates Password Reset',
    html: '<p style="color:black">Please click the following link to reset your password</strong></p><a href= "'+linkURL+'">'+linkURL+'</a><p style="color:black"><b>If you did not request this</b>, no action is needed.</strong></p>',
  }
  sgMail
    .send(msg)
    .then(() => {
    console.log('Email sent')
  })
    .catch((error) => {
      err = error;
    console.error(error)
  })
  return err;
}

app.post('/API/EmailVerification', async (req, res, next) =>
{
  var err = '';
  const { email } = req.body;
  const db = client.db();
  const results = await db.collection('users').find({email: email, isVerified: false}).toArray();
  if(results.length == 0){
    err = "No unverified email found";
  }
  else {
    const vToken = jwt.sign(results[0], jwtKey);
    db.collection('users').update({_id: new mongo.ObjectID(results[0]._id)}, {$set: {vToken: vToken}});
    err = await SendEmailVerification(email, vToken);
  }
  var ret = { error: err  };
  res.status(200).json(ret);
});

app.post('/API/PasswordReset', async (req, res, next) =>
{
  var err = '';
  const {email} = req.body;
  const db = client.db();
  const results = await db.collection('users').find({email: email}).toArray();
  if(results.length == 0){
    err = "Email not found";
  }
  else{
    const pToken = jwt.sign(results[0],jwtKey);
    db.collection('users').update({_id: new mongo.ObjectID(results[0]._id)}, {$set: {pToken: pToken}});
    err = await SendPasswordReset(email, pToken);
  }
  var ret = { error: err  };
  res.status(200).json(ret);
});

app.post("/API/Verify", async (req, res, next) =>
{
  const {token} = req.body;
  const db = client.db();
  const results = await db.collection('users').find({vToken : token}).toArray();

  if(results.length == 0){
    res.status(200).json({success: false, message: "Token not matched"});
  }
  else{
    jwt.verify(token, jwtKey, (err, decoded) =>
    {
      if (err) {
        res.status(200).json({ success: false, message: "Failed to verify token" });
      }
      else {
        var found = false;
        results.forEach(function(userInfo){
          if(userInfo._id == decoded._id ){
            found = true;
            db.collection('users').update({_id: new mongo.ObjectID(userInfo._id)},{$set: {isVerified: true, vToken: null}});
            res.status(200).json({success: true, message: "User verified"});
          }
        });
        //this case really shouldn't be possible but ya never know
        if(! found){
          res.status(200).json({success: false, message: "User ID not matched"});
        }
      }
    });
  }
});

app.post("/API/Reset", async (req, res, next) =>
{
  const {token} = req.body;
  const db = client.db();
  const results = await db.collection('users').find({pToken : token}).toArray();

  if(results.length == 0){
    res.status(200).json({success: false, message: "Token not matched"});
  }
  else{
    jwt.verify(token, jwtKey, (err, decoded) =>
    {
      if (err) {
        res.status(200).json({ success: false, message: "Failed to verify token"});
      }
      else {
        var found = false;
        results.forEach(function(userInfo){
          if(userInfo._id == decoded._id ){
            found = true;
            db.collection('users').update({_id: new mongo.ObjectID(userInfo._id)},{$set: {isVerified: true, pToken: null}});
            res.status(200).json({success: true, message: "User verified", userInfo: decoded});
          }
        });
        //this case really shouldn't be possible but ya never know
        if(! found){
          res.status(200).json({success: false, message: "User ID not matched"});
        }
      }
    });
  }
});
