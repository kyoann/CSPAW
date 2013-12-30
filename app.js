var express = require('express'),
    http = require('http'),
    app = express();

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(app.router);
    app.use(function(req, res, next) {
        throw new Error(req.url + ' not found');
    });
    app.use(function(err, req, res, next) {
        console.log(err);
        res.send(err.message);
    });

    app.configure('development', function() {
        app.use(express.errorHandler());
    });

    var indexController = require('./controllers/index');
    app.get('/', indexController.index);

    var storiesController = require('./controllers/stories');
    app.get('/stories/new', storiesController.new);
    app.post('/stories/create', storiesController.create);
    app.put('/stories/addComment', storiesController.addComment);
    app.get('/stories/moderate', storiesController.getStoriesToModerate);
    app.put('/stories/validate', storiesController.validateStory);
    app.get('/stories/consult', storiesController.consult);

    var usersController = require('./controllers/users');
    app.get('/users/new', usersController.new);
    app.post('/users/create', usersController.create);
    app.put('/users/update', usersController.update);

});

http.createServer(app).listen(3000);
