var bodyParser = require('body-parser');

var data = [
    {item: 'get milk'},
    {item: 'walk dog'},
    {item: 'kick some coding ass'}
];

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){

app.get('/tweet', function(req, res){
    //Send it to the profile.ejs
    res.render('profile', {tweets: data});
});

app.post('/tweet', urlencodedParser, function(req, res){
    data.push(req.body);
    res.json(data);
});


};