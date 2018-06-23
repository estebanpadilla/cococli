/**
* @name coco.js
* @file Add a small description for this file.
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/

var helpers = require('./lib/helpers');
var fs = require('fs');
var path = require('path');
var colors = require('colors');

var coco = {};

coco.saveEmail = function (email) {
	this.loadConfiguration().then(function (configuration) {
		configuration.email = email;
		this.saveConfiguration(configuration);
	}).catch(function (reject) {
		//Do nothing here for now.
	});;
}

coco.saveAuthor = function (author) {
	this.loadConfiguration().then(function (configuration) {
		configuration.author = author;
		this.saveConfiguration(configuration)
	}).catch(function (reject) {
		//Do nothing here for now.
	});;
}

coco.loadConfiguration = function () {
	return new Promise(function (resolve, reject) {
		var file = fs.readFile((__dirname + '/configuration.json'), function (err, data) {
			if (err) {
				var msj = 'There is not configuration file saved'.red;
				console.log(msj);
				reject(null);
			} else {
				var configuration = JSON.parse(data);
				resolve(configuration)
			}
		});
	});
}

coco.saveConfiguration = function (configuration) {
	var buffer = new Buffer(JSON.stringify(configuration), 'utf8');
	fs.writeFileSync(path.resolve(__dirname, '/configuration.json'), buffer);
	var msj = 'Configuration saved, you can use the same command to change it!'.bgYellow.bold;
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

	var msj = 'HTML file created!'.bgBlue.bold;
	console.log(msj);
}

coco.createCSS = function (name) {
	var buffer = new Buffer('/* Add your amazing style here! */', 'utf8');
	fs.writeFileSync(path.resolve(process.cwd(), (name + '.css')), buffer);
	var msj = 'CSS file created!'.bgBlue.bold;
	console.log(msj);
}

coco.createJS = function (name) {

	this.loadConfiguration().then(function (configuration) {

		var text = '/**\n';
		text += '* @name ' + name + '.js\n';
		text += '* @file Add a small description for this file.\n'
		text += '* @author ' + configuration.author + ' <' + configuration.email + '>\n'
		text += '* @version 1.0.0\n'
		text += '*/';
		var buffer = new Buffer(text, 'utf8');
		fs.writeFileSync(path.resolve(process.cwd(), (name + '.js')), buffer);

		var msj = 'JS file created!'.bgBlue.bold;
		console.log(msj);
	}).catch(function (reject) {
		//Do nothing here for now.
	});
}


coco.createClass = function (name) {

	this.loadConfiguration().then(function (configuration) {

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

		var msj = 'Class created!'.bgBlue.bold;
		console.log(msj);
	}).catch(function (reject) {
		//Do nothing here for now.
	});
}

coco.createProject = function (name) {
	this.loadConfiguration().then(function (configuration) {
		//Create directory
		//Add index, js, style
		var dir = path.resolve(process.cwd(), name);
		fs.mkdir(dir, function (err) {
			if (err) {
				console.log('Error making dir');
			} else {

				var text = '/**\n';
				text += '* @name index.js\n';
				text += '* @file Add a small description for this file.\n';
				text += '* @author ' + configuration.author + ' <' + configuration.email + '>\n';
				text += '* @version 1.0.0\n';
				text += '*/\n\n';
				text += 'window.addEventListener(' + "'load'" + ', init, false);\n\n';
				text += 'function init() {\n';
				text += '	console.log(' + "'App running!'" + ');\n';
				text += '	//Declare variables\n';
				text += '	//Initialize variables\n';
				text += '	//Program Logic\n';
				text += '}'

				var buffer = new Buffer(text, 'utf8');
				fs.writeFileSync((dir + '/index.js'), buffer);

				var text = '<!DOCTYPE html>\n';
				text += '<html lang="en">\n\n';
				text += '<head>\n';
				text += '	<meta charset="UTF-8">\n';
				text += '	<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
				text += '	<meta http-equiv="X-UA-Compatible" content="ie=edge">\n';
				text += '	<title>Document</title>\n';
				text += '	<script src="index.js"></script>\n';
				text += '	<link rel="stylesheet" href="style.css">\n';
				text += '</head>\n\n';
				text += '<body>\n';
				text += '</body>\n\n';
				text += '</html>\n';
				var buffer = new Buffer(text, 'utf8');
				fs.writeFileSync((dir + '/index.html'), buffer);

				var buffer = new Buffer('/* Add your amazing style here! */', 'utf8');
				fs.writeFileSync((dir + '/style.css'), buffer);

				var msj = 'Project created!'.bgBlue.bold;
				console.log(msj);
			}
		});

	}).catch(function () {

	});
}

coco.showHelp = function () {
	var msj = 'Help is not ready, sorry!'.bgBlue.bold;
	console.log(msj);
}

module.exports = coco;