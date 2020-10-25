const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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

  const { userID, login, password, firstName, lastName } = req.body;

  const db = client.db();
  db.collection('users').insert({userID:userID,login:login,password:password,firstName:firstName,lastName:lastName})

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/EditUser', async (req, res, next) =>
{

  var error = '';

  const { userID, login, password, firstName, lastName } = req.body;

  const db = client.db();
  db.collection('users').update({userID:userID},{login:login,password:password,firstName:firstName,lastName:lastName})

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/API/DeleteUser', async (req, res, next) =>
{

  var error = '';

  const { userID } = req.body;

  const db = client.db();
  db.collection('users').deleteOne({userID:userID})

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
    id = results[0].userID;
    fn = results[0].firstName;
    ln = results[0].lastName;
  }

  var ret = { id:id, firstName:fn, lastName:ln, error:''};
  res.status(200).json(ret);
});


app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const { userId, search } = req.body;
  var _search = search.toLowerCase().trim();
  var _ret = [];

  for( var i=0; i<cardList.length; i++ )
  {
    var lowerFromList = cardList[i].toLocaleLowerCase();
    if( lowerFromList.indexOf( _search ) >= 0 )
    {
      _ret.push( cardList[i] );
    }
  }

  var ret = {results:_ret, error:''};
  res.status(200).json(ret);
});


const MongoClient = require('mongodb').MongoClient;
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
