var express = require('express'),
http = require('http'),
app = express(),
passport = require('passport'),
passport_local = require('passport-local'),
LocalStrategy = passport_local.Strategy,
usersModel = require('./models/users'),
users = require('./controllers/users');


passport.serializeUser(function(user, done) {
	console.log("serialize:"+user);
	done(null, user.username);
});

passport.deserializeUser(function(username, done) {
	usersModel.findByUsername(username, function (err, user) {
		done(err, user);
	});
});

passport.use(new LocalStrategy(
	function(username, password, done) {

	console.log("find:"+username);
	usersModel.findByUsername(username, function(err, user) {
		if (err) { return done(err); }
		if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
		if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
		return done(null, user);
	});
}));

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({secret:"tout ce qui passe n'est que symboles"}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
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
	app.put('/stories/validateComments', storiesController.validateComments);
	app.get('/stories/moderate', storiesController.moderate);
	app.put('/stories/validate', storiesController.validateStory);
	app.get('/stories/consult/:storyId', storiesController.consult);
	app.put('/stories/newSpecialistOpinion', storiesController.newSpecialistOpinion);
	app.get('/stories/search', storiesController.searchPrepareForm);
	app.post('/stories/search', storiesController.search);

	var usersController = require('./controllers/users');
	app.get('/users/new', usersController.new);
	app.post('/users/create', usersController.create);
	app.put('/users/update', usersController.update);
	app.post('/logout',usersController.logout);
	app.post('/login', passport.authenticate('local'),usersController.login);
	app.get('/users/consult/:username', usersController.consult);

});
http.createServer(app).listen(3000);
