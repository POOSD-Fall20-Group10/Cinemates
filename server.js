const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongo = require('mongodb');

const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(bodyParser.json());

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

app.post('/API/AddUser', async (req, res, next) =>
{

  var error = '';

  const { email, login, password, firstName, lastName } = req.body;

  const db = client.db();
  db.collection('users').insert({email:email,login:login,password:password,firstName:firstName,lastName:lastName, friends: []})

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/EditUser', async (req, res, next) =>
{

  var error = '';

  const { userID, email, login, password, firstName, lastName } = req.body;

  const db = client.db();
  db.collection('users').update({_id: new mongo.ObjectID(userID)},{email:email,login:login,password:password,firstName:firstName,lastName:lastName})

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/DeleteUser', async (req, res, next) =>
{

  var error = '';

  const { userID } = req.body;

  const db = client.db();
  db.collection('users').deleteOne({_id: new mongo.ObjectID(userID)})

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/UserLogin', async (req, res, next) =>
{

 var error = '';

  const { login, password } = req.body;

  const db = client.db();
  const results = await db.collection('users').find({login:login,password:password}).toArray();

  var id = -1;
  var fn = '';
  var ln = '';

  if( results.length > 0 )
  {
    id = results[0]._id;
    fn = results[0].firstName;
    ln = results[0].lastName;
  }

  var ret = { id:id, firstName:fn, lastName:ln, error:''};
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

  if( results.length > 0 )
  {
    login = results[0].login;
    fn = results[0].firstName;
    ln = results[0].lastName;
  }

  var ret = { login:login, firstName:fn, lastName:ln, error:''};
  res.status(200).json(ret);
});

app.post('/API/AddGroup', async (req, res, next) =>
{

  var error = '';

  const { name, description, members } = req.body;

  const db = client.db();
  db.collection('groups').insert({name:name,description:description,members:members})

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/EditGroup', async (req, res, next) =>
{

  var error = '';

  const { groupID, name, description, members } = req.body;

  const db = client.db();
  db.collection('groups').update({_id: new mongo.ObjectID(groupID)},{name:name,description:description,members:members})

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/DeleteGroup', async (req, res, next) =>
{

  var error = '';

  const { groupID } = req.body;

  const db = client.db();
  db.collection('groups').deleteOne({_id: new mongo.ObjectID(groupID)})

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/AddUserToGroup', async (req, res, next) =>
{

  var error = '';

  const { groupID, userID } = req.body;

  const db = client.db();

  db.collection('groups').update({_id: new mongo.ObjectID(groupID)},{ $addToSet: {members: {userID : mongo.ObjectID(userID), yesList : [], noList : []}}});

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/DeleteUserFromGroup', async (req, res, next) =>
{

  var error = '';

  const { groupID, userID } = req.body;

  const db = client.db();

  db.collection('groups').update({_id: new mongo.ObjectID(groupID)},{ $pull: {members: {"userID" : new mongo.ObjectID(userID)}}});

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/AddMovieToList', async (req, res, next) =>
{

  var error = '';

  const { groupID, userID, movieID, liked } = req.body;

  const db = client.db();
  if(liked){
    db.collection('groups').update({_id: new mongo.ObjectID(groupID) , "members.userID" : new mongo.ObjectID(userID)},
      { $addToSet: {"members.$.yesList" : {movieID : new mongo.ObjectID(movieID)}}});
    }
    else{
      db.collection('groups').update({_id: new mongo.ObjectID(groupID) , "members.userID" : new mongo.ObjectID(userID)},
        { $addToSet: {"members.$.noList" : {movieID : new mongo.ObjectID(movieID)}}});
    }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/ListGroups', async (req, res, next) =>
{

 var error = '';

  const { userID } = req.body;

  const db = client.db();
  const results = await db.collection('groups').find({"members.userID" : new mongo.ObjectID(userID)}).toArray();

  var ret = { groups: results, error:''};

  res.status(200).json(ret);
});

app.post('/API/AddFriend', async (req, res, next) =>
{

  var error = '';

  const { user1, user2 } = req.body;

  const db = client.db();

  db.collection('users').update({_id: new mongo.ObjectID(user1)},{ $addToSet: {friends: {userID : mongo.ObjectID(user2)}}});
    db.collection('users').update({_id: new mongo.ObjectID(user2)},{ $addToSet: {friends: {userID : mongo.ObjectID(user1)}}});

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/DeleteFriend', async (req, res, next) =>
{

  var error = '';

  const { user1, user2 } = req.body;

  const db = client.db();

  db.collection('users').update({_id: new mongo.ObjectID(user1)},{ $pull: {friends: {userID : mongo.ObjectID(user2)}}});
    db.collection('users').update({_id: new mongo.ObjectID(user2)},{ $pull: {friends: {userID : mongo.ObjectID(user1)}}});

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/ListFriends', async (req, res, next) =>
{

 var error = '';

  const { userID } = req.body;

  const db = client.db();
  const results = await db.collection('users').find({_id : new mongo.ObjectID(userID)}).toArray();

  if( results.length > 0 )
  {
    friends = results[0].friends;
  }

  var ret = { friends: friends, error:''};

  res.status(200).json(ret);
});

const MongoClient = mongo.MongoClient;
require('dotenv').config();
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
client.connect();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
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
