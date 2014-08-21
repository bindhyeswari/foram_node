// * Handle all candidate information

// Array to store all information about candidates - will be replaced a DB in a prod env

var express = require('express');
var router = express.Router();

/* Candidate schema -
 * name
 * email
 * city
  * */

var candidates = [{
    name: 'Foram',
    email: 'foram@mailinator.com',
    city: 'Sunnyvale'
}];

router.get('/', function (req, res) {

    // This will handle all get requests to get information on ALL candidates
    if('accept' in req.headers) {
        console.log(req.headers.accept);
        // check if the client requires json data
        if (req.headers.accept.indexOf('application/json') !== -1) {
            res.json(200, candidates);
        } else {
            res.render('candidates'); /* Provide the candidates.ejs as an input here ...  */
        }
    }
});

router.get('/search', function(req, res){

    if (req.query.name) {
        var search_term = req.query.name.toLowerCase();
        var returnval = [];
        for (var i = 0, len = candidates.length; i < len; i++) {
            if (candidates[i].name.toLowerCase().indexOf(search_term) !== -1) {
                returnval.push(candidates[i]);
            }
        }
        res.json(200, returnval);
    } else {
        res.json(400, {message: 'Did not find name parameter ... '});
    }



});

router.get('/:id', function (req, res) {
    // Handle get requests for a given candidate id
});

router.post('/', function(req, res){
    // Handle requests to create a candidate
    candidates.push({
        name: req.body.name,
        email: req.body.email,
        city: req.body.city
    });
    res.json(200, {message: 'Successfully created the candidate!', candidateid: candidates.length});
});

router.put('/:id', function (req, res) {
    // Hanlde requests to update a candidate
});

router.delete('/:id', function (req, res) {
    // Handle requests to delete a candidate

});




module.exports = router;