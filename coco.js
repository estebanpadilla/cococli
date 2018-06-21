#!/usr/bin/env node

/**
 * @todo Add JSON configuration file.
 */

var fs = require('fs');
var path = require('path');
var colors = require('colors');
var args = require("yargs").argv;
var author = '';
var email = '';

function start() {

	var isOK = false;

	for (const key in args) {
		if (args.hasOwnProperty(key)) {
			switch (key) {
				case 'js':
					createJS(args[key]);
					isOK = true;
					break;
				case 'html':
					createHTML(args[key]);
					isOK = true;
					break;
				case 'css':
					createCSS(args[key]);
					isOK = true;
					break;
				case 'class':
					creareClass(args[key]);
					isOK = true;
					break;
				case 'email':
					saveEmail(args[key]);
					isOK = true;
					break;
				case 'author':
					saveAuthor(args[key] + ' ' + args['_']);
					isOK = true;
					break;
				// case 'help':
				// case 'h':
				// showHelp();
				// isOK = true;
				default:
					break;
			}
		}
	}

	if (!isOK) {
		var msj = 'Error on command!'.bgRed.bold;
		console.log(msj);
	}
}

start();

function saveEmail(email) {
	var buffer = new Buffer(email, 'utf8');
	fs.writeFileSync(path.resolve(__dirname + '/settings/', 'email.txt'), buffer);
	var msj = 'Email saved, you can use the same commando to change it!'.bgYellow.bold;
	console.log(msj);
}

function saveAuthor(author) {
	var buffer = new Buffer(author, 'utf8');
	fs.writeFileSync(path.resolve(__dirname + '/settings/', 'author.txt'), buffer);
	var msj = 'Author saved, you can use the same commando to change it!'.bgYellow.bold;
	console.log(msj);
}

function createHTML(name) {
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

function createCSS(name) {
	var buffer = new Buffer('/* Add your amazing style here! */', 'utf8');
	fs.writeFileSync(path.resolve(process.cwd(), (name + '.css')), buffer);

	var msj = 'CSS file created!'.bgBlue.bold;
	console.log(msj);
}

function createJS(name) {

	getAuthor(function () {
		var text = '/**\n';
		text += '* @name ' + name + '.js\n';
		text += '* @file Add a small description for this file.\n'
		text += '* @author ' + author + ' <' + email + '>\n'
		text += '* @version 1.0.0\n'
		text += '*/';
		var buffer = new Buffer(text, 'utf8');
		fs.writeFileSync(path.resolve(process.cwd(), (name + '.js')), buffer);

		var msj = 'JS file created!'.bgBlue.bold;
		console.log(msj);
	});
}


function creareClass(name) {

	getAuthor(function () {
		var className = capitalizeFirstLetter(name);
		var data = '/**\n';
		data += '* @name ' + className + '\n';
		data += '* @extends\n';
		data += '* @file ' + name + '.js\n'
		data += '* @author ' + author + ' <' + email + '>\n'
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
	});
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function getAuthor(callback) {
	fs.readFile(__dirname + '/settings/author.txt', function (err, data) {
		if (err) {
			var msj = 'You have not save a Name and LastName to use as the author for this file!\n'.red.bold;
			msj += 'Use the command:\n'.red;
			msj += 'coco --author Name LastName'.red;
			console.log(msj);
		} else {
			author = data.toString();
			getEmail(callback);
		}
	});
}

function getEmail(callback) {
	fs.readFile(__dirname + '/settings/email.txt', function (err, data) {
		if (err) {
			var msj = 'You have not add an email to use for the author of this file!\n'.red.bold;
			msj += 'Use the command:\n'.red;
			msj += 'coco --email YourEmailAddress'.red;
			console.log(msj);
		} else {
			email = data.toString();
			callback();
		}
	});
}

function showHelp() {
	var msj = 'Help is not ready, sorry!'.bgBlue.bold;
	console.log(msj);
}

//console.log(process.argv);
// var myArgs = process.argv.slice(2);
// console.log('myArgs: ', myArgs);

// var buffer = new Buffer('HOLA COCO', 'utf8');
// console.log(__dirname + '/hola.txt');
// console.log(process.cwd());
// fs.writeFileSync(path.resolve(process.cwd(), 'hola.txt'), buffer);

