const express = require('express');
const bodyParser = require('body-parser');
let request = require('request');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var redirect_uri = "https://StaleLegalCoderesource.cancaroman99.repl.co/callback";

app.get('/', (req, res) => {
  var scopes = 'user-read-private user-read-email user-follow-read user-follow-modify streaming user-read-birthdate';
  res.redirect('https://accounts.spotify.com/authorize' +
  '?response_type=code' +
  '&client_id=' + '92702501ba574a75a93e16dcbec499ef'  +
  (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

app.get('/callback', function(req, res) {
  let clientId = '92702501ba574a75a93e16dcbec499ef';
  let clientSecret = '3196c1a924bc47c984f76671c55fbe2d';
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code',
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        clientId + ':' + clientSecret
      ).toString('base64'))
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    res.redirect('https://ClientSpotify.cancaroman99.repl.co?access_token=' + body.access_token);
  })
});



app.listen(3000, () => console.log('server started'));
