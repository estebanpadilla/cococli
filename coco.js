#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var colors = require('colors');
var args = require('minimist')(process.argv.slice(2));
var author = '';
var email = '';

for (const key in args) {
	if (args.hasOwnProperty(key)) {
		switch (key) {
			case 'js':
				createJS(args[key]);
				break;
			case 'html':
			case 'index':
				createHTML();
				break;
			case 'css':
			case 'style':
				createCSS();
				break;
			case 'email':
				saveEmail(args[key]);
				break;
			case 'author':
				saveAuthor(args[key] + ' ' + args['_']);
				break;
			default:
				break;
		}
		// console.log(args[key]);
	}
}

function createJS(name) {

	if (author === '') {
		author = 'Add your name here';
	}

	if (email === '') {
		email = 'Add your email here';
	}

	fs.readFile('./settings/email.txt', function (err, data) {
		if (err) {
			var msj = 'You have not add an email to use on this file!\n'.red.bold;
			msj += 'Use the command:\n'.red;
			msj += 'coco --email YourEmailAddress'.red;
			console.log(msj);
		} else {
			email = data.toString();
			fs.readFile('./settings/author.txt', function (err, data) {
				if (err) {
					var msj = 'You have not save a name to use as the author for your file!\n'.red.bold;
					msj += 'Use the command:\n'.red;
					msj += 'coco --author Name LastName'.red;
					console.log(msj);
				} else {
					author = data.toString();
					var text = `/** 
* @name ${(name + '.js')}
* @file Add a small description for this file.
* @author ${author} <${email}>
* @version 1.0.0
*/`;
					var buffer = new Buffer(text, 'utf8');
					fs.writeFileSync(path.resolve(process.cwd(), (name + '.js')), buffer);
				}
			});
		}
	});
}

function saveEmail(email) {
	var buffer = new Buffer(email, 'utf8');
	fs.writeFileSync(path.resolve(__dirname + '/settings/', 'email.txt'), buffer);
}

function saveAuthor(author) {
	var buffer = new Buffer(author, 'utf8');
	fs.writeFileSync(path.resolve(__dirname + '/settings/', 'author.txt'), buffer);
}

function createHTML() {
	var text = `
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>

<body>

</body>

</html>`
	var buffer = new Buffer(text, 'utf8');
	fs.writeFileSync(path.resolve(process.cwd(), 'index.html'), buffer);
}

function createCSS() {
	var buffer = new Buffer('/* Add your amazing style here! */', 'utf8');
	fs.writeFileSync(path.resolve(process.cwd(), 'style.css'), buffer);
}

//console.log(process.argv);
// var myArgs = process.argv.slice(2);
// console.log('myArgs: ', myArgs);

// var buffer = new Buffer('HOLA COCO', 'utf8');
// console.log(__dirname + '/hola.txt');
// console.log(process.cwd());
// fs.writeFileSync(path.resolve(process.cwd(), 'hola.txt'), buffer);

