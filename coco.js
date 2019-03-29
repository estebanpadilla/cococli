/**
* @name coco.js
* @file Charge of creating and saving files.
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.1.9
* @todo Add fileManager. configutationManager y errorManager.
*/

var helpers = require('./lib/helpers');
var fs = require('fs');
var path = require('path');
var colors = require('colors');

var coco = {};
var version = 'v 1.4.0';

coco.saveEmail = function (email) {
	loadConfiguration().then(function (configuration) {
		configuration.email = email;
		saveConfiguration(configuration);
	}).catch(function (reject) {
		//Do nothing here for now.
	});
}

coco.saveAuthor = function (author) {
	loadConfiguration().then(function (configuration) {
		configuration.author = author;
		saveConfiguration(configuration)
	}).catch(function (reject) {
		//Do nothing here for now.
	});
}

function loadConfiguration() {
	return new Promise(function (resolve, reject) {
		var file = fs.readFile((__dirname + '/configuration.json'), function (err, data) {
			if (err) {
				var msj = '-> There is not configuration available.'.red.bold;
				console.log(msj);
				reject(null);
			} else {
				var configuration = JSON.parse(data);
				resolve(configuration)
			}
		});
	});
}

function saveConfiguration(configuration) {
	var buffer = new Buffer(JSON.stringify(configuration), 'utf8');
	fs.writeFileSync(path.resolve(__dirname, './configuration.json'), buffer);
	var msj = '-> Configuration saved, you can use the same command to change it anytime!'.blue.bold;
	console.log(msj);
}

coco.createHTML = function (name) {
	var text = '<!DOCTYPE html>\n'
	text += '<html lang="en">\n\n'
	text += '<head>\n'
	text += '	<meta charset="UTF-8">\n'
	text += '	<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
	text += '	<meta http-equiv="X-UA-Compatible" content="ie=edge">\n'
	text += '	<title>Document</title>\n'
	text += '</head>\n\n'
	text += '<body>\n'
	text += '</body>\n\n'
	text += '</html>\n'
	var buffer = new Buffer(text, 'utf8');
	fs.writeFileSync(path.resolve(process.cwd(), (name + '.html')), buffer);

	var msj = '-> html file created!'.blue.bold;
	console.log(msj);
}

coco.createCSS = function (name) {
	var buffer = new Buffer('/* Add your amazing style here! */', 'utf8');
	fs.writeFileSync(path.resolve(process.cwd(), (name + '.css')), buffer);
	var msj = '-> css file created!'.blue.bold;
	console.log(msj);
}

coco.createJS = function (name) {

	loadConfiguration().then(function (configuration) {

		var text = '/**\n';
		text += '* @name ' + name + '.js\n';
		text += '* @file Add a small description for this file.\n'
		text += '* @author ' + configuration.author + ' <' + configuration.email + '>\n'
		text += '* @version 1.0.0\n'
		text += '*/';
		var buffer = new Buffer(text, 'utf8');
		fs.writeFileSync(path.resolve(process.cwd(), (name + '.js')), buffer);

		var msj = '-> javascript file created!'.blue.bold;
		console.log(msj);

	}).catch(function (reject) {
		//Do nothing here for now.
		var msj = '-> Error loading configuration file.'.red.bold;
		console.log(msj);
	});
}


coco.createClass = function (name) {

	loadConfiguration().then(function (configuration) {

		var className = helpers.capitalizeFirstLetter(name);

		var data = '/**\n';
		data += '* @name ' + className + '\n';
		data += '* @extends\n';
		data += '* @file ' + name + '.js\n'
		data += '* @author ' + configuration.author + ' <' + configuration.email + '>\n'
		data += '* @version 1.0.0\n'
		data += '*/\n';
		data += 'class ' + className + ' {\n';
		data += '	/**\n';
		data += '	* @param {data type} name - description.\n';
		data += '	*/\n';
		data += '	constructor() {\n\n'
		data += '	}\n';
		data += '}';
		var buffer = new Buffer(data, 'utf8');
		fs.writeFileSync(path.resolve(process.cwd(), (name + '.js')), buffer);

		var msj = '-> es6 class created!'.blue.bold;
		console.log(msj);

	}).catch(function (reject) {
		//Do nothing here for now.
	});
}

coco.createProject = function (name) {
	loadConfiguration().then(function (configuration) {
		var dir = path.resolve(process.cwd(), name);
		fs.mkdir(dir, function (err) {
			if (err) {
				console.log('Error creating project, check if a project with the same name already exist.');
			} else {

				addExtraFiles(dir);

				var buffer = new Buffer(createJSForProject(configuration), 'utf8');
				fs.writeFileSync((dir + '/js/app.js'), buffer);

				buffer = new Buffer(createHTMLForProject(name), 'utf8');
				fs.writeFileSync((dir + '/index.html'), buffer);

				//buffer = new Buffer(createSimpleCSS(), 'utf8');
				//fs.writeFileSync((dir + '/style.css'), buffer);

				var msj = '-> project created!'.blue.bold;
				console.log(msj);
			}
		});
	}).catch(function () {

	});
}

coco.createGame = function (name) {
	loadConfiguration().then(function (configuration) {
		var dir = path.resolve(process.cwd(), name);
		fs.mkdir(dir, function (err) {
			if (err) {
				console.log('Error creating game, check if a game with the same name already exist.');
			} else {

				addExtraFiles(dir);

				var buffer = new Buffer(createJSForGame(configuration), 'utf8');
				fs.writeFileSync((dir + '/js/app.js'), buffer);

				buffer = new Buffer(createHTMLForGame(name), 'utf8');
				fs.writeFileSync((dir + '/index.html'), buffer);

				//buffer = new Buffer(createSimpleCSS(), 'utf8');
				//fs.writeFileSync((dir + '/style.css'), buffer);

				var msj = '-> game created!'.blue.bold;
				console.log(msj);
			}
		});
	}).catch(function () {

	});
}

function addExtraFiles(dir) {
	fs.mkdir(dir + '/js', function (err) {
		if (err) {
			console.log('Error creating folder /js');
		} else {
			fs.mkdir(dir + '/js/utils', function (err) {
				if (err) {
					console.log('Error creating folder /utils.');
				} else {
					fs.readFile(__dirname + '/projectFiles/cocoColors.js', 'utf8', function (err, colors) {
						if (err) {
							console.log('Error reading cocoColors file in: ' + __dirname);
						} else {

							fs.writeFileSync((dir + '/js/utils/colors.js'), colors);

							fs.readFile(__dirname + '/projectFiles/stats.js', 'utf8', function (err, stats) {
								if (err) {
									console.log('Error reading stats file in: ' + __dirname);
								} else {

									fs.writeFileSync((dir + '/js/utils/stats.js'), stats);
								}
							});
						}
					});
				}
			});
		}
	});

	fs.mkdir(dir + '/css', function (err) {
		if (err) {
			console.log('Error creating folder css');
		} else {
			fs.readFile(__dirname + '/projectFiles/style.css', 'utf8', function (err, style) {
				if (err) {
					console.log('Error reading style file');
				} else {
					fs.writeFileSync((dir + '/css/style.css'), style);
				}
			});
		}
	});
}

function createHTMLForGame(name) {
	var text = '<!DOCTYPE html>\n';
	text += '<html lang="en">\n\n';
	text += '<head>\n';
	text += '	<meta charset="UTF-8">\n';
	text += '	<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
	text += '	<meta http-equiv="X-UA-Compatible" content="ie=edge">\n';
	text += '	<title>Document</title>\n';
	text += '	<script src="js/app.js"></script>\n';
	text += '	<script src="js/utils/colors.js"></script>\n';
	text += '	<script src="js/utils/stats.js"></script>\n';
	text += '	<link rel="stylesheet" href="css/style.css">\n';
	text += '</head>\n\n';
	text += '<body>\n';
	text += '<h1 id="title"> Game: ' + name + '</h1>';
	text += '</body>\n\n';
	text += '</html>\n';
	return text;
}

function createJSForGame(configuration) {
	var text = '/**\n';
	text += '* @name app.js\n';
	text += '* @file Add a small description for this file.\n';
	text += '* @author ' + configuration.author + ' <' + configuration.email + '>\n';
	text += '* @version 1.0.0\n';
	text += '*/\n\n';
	text += 'window.addEventListener(' + "'load'" + ', init, false);\n\n';
	text += 'function init() {\n';
	text += '	console.log(' + "'Game running!'" + ');\n';
	text += '\n';
	text += '	//Add Stats\n';
	text += '	var stats = new Stats();\n';
	text += '	stats.showPanel(0);\n';
	text += '  	document.body.appendChild(stats.dom);\n';
	text += '\n';
	text += '	var requestId;\n';
	text += '\n';
	text += '	function update() {\n';
	text += '		stats.begin();\n';
	text += '\n';
	text += '		//Add here your game code that needs to be update every frame.\n';
	text += '		stats.end();\n';
	text += '\n';
	text += '		requestId = requestAnimationFrame(update);\n';
	text += '	}\n';
	text += '\n';
	text += '	update();\n';
	text += '\n';
	text += '	//Add here your game code that does not needs to be update every frame.\n';
	text += '}'
	return text;
}

function createHTMLForProject(name) {
	var text = '<!DOCTYPE html>\n';
	text += '<html lang="en">\n\n';
	text += '<head>\n';
	text += '	<meta charset="UTF-8">\n';
	text += '	<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
	text += '	<meta http-equiv="X-UA-Compatible" content="ie=edge">\n';
	text += '	<title>Document</title>\n';
	text += '	<script src="js/app.js"></script>\n';
	text += '	<script src="js/utils/colors.js"></script>\n';
	text += '	<link rel="stylesheet" href="css/style.css">\n';
	text += '</head>\n\n';
	text += '<body>\n';
	text += '<h1 id="title"> Project: ' + name + '</h1>';
	text += '</body>\n\n';
	text += '</html>\n';
	return text;
}

function createJSForProject(configuration) {
	var text = '/**\n';
	text += '* @name app.js\n';
	text += '* @file Add a small description for this file.\n';
	text += '* @author ' + configuration.author + ' <' + configuration.email + '>\n';
	text += '* @version 1.0.0\n';
	text += '*/\n\n';
	text += 'window.addEventListener(' + "'load'" + ', init, false);\n\n';
	text += 'function init() {\n';
	text += '	console.log(' + "'App running!'" + ');\n';
	text += '	//1. Declare variables\n';
	text += '	//2. Initialize variables\n';
	text += '	//3. Program Logic\n';
	text += '}'
	return text;
}

coco.showHelp = function () {
	var msj = '\n';
	msj += '-----------------------------------------------------------------------------------\n';
	msj += '                         Using this CLI is very simple!                            \n'.bold;
	msj += '-----------------------------------------------------------------------------------\n';
	msj += '     Commands    |   Parameters     |  Description                                 \n';
	msj += '-----------------------------------------------------------------------------------\n';
	msj += '   -js      |  	 |   filename       |  Creates a javascrip file                    \n';
	msj += '   -html    |  	 |   filename       |  Creates a html file                         \n';
	msj += '   -css     |	 |   filename       |  Creates a css file                          \n';
	msj += '   -proj    | -p |   name           |  Creates a basic web project                 \n';
	msj += '   -game    | -g |   name           |  Creates a basic game project                \n';
	msj += '   -class   |  	 |   name           |  Creates a ES6 class                         \n';
	msj += '   -email   |  	 |   yourEmail      |  Adds your email to config file              \n';
	msj += '   -author  |    |   name lastName  |  Adds your name and lastname to config file  \n';
	msj += '   -help    | -h |                  |  Shows this information                      \n';
	msj += '   -version | -v |                  |  Shows the version		                   \n';
	msj += '-----------------------------------------------------------------------------------\n';
	msj += 'Update to the latest version using this command: npm update -g cococli\n';
	msj += 'For support or comments send an email to ep@estebanpadilla.com\n';
	msj += 'Thank you for using this tool!\n';
	msj += version;
	msj += '\n';
	console.log(msj);
}

coco.showVersion = function () {
	var msj = '\n';
	msj += version.bold;
	msj += '\n';
	console.log(msj);
}

module.exports = coco;