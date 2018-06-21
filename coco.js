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
				createHTML(args[key]);
				break;
			case 'css':
			case 'style':
				createCSS(args[key]);
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

	fs.readFile(__dirname + '/settings/author.txt', function (err, data) {
		if (err) {
			var msj = 'You have not save a Name and LastName to use as the author for this file!\n'.red.bold;
			msj += 'Use the command:\n'.red;
			msj += 'coco --author Name LastName'.red;
			console.log(msj);

		} else {
			author = data.toString();
			fs.readFile(__dirname + '/settings/email.txt', function (err, data) {
				if (err) {
					var msj = 'You have not add an email to use for the author of this file!\n'.red.bold;
					msj += 'Use the command:\n'.red;
					msj += 'coco --email YourEmailAddress'.red;
					console.log(msj);
				} else {
					email = data.toString();
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
				}
			});
		}
	});
}

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

								//console.log(process.argv);
								// var myArgs = process.argv.slice(2);
								// console.log('myArgs: ', myArgs);

								// var buffer = new Buffer('HOLA COCO', 'utf8');
								// console.log(__dirname + '/hola.txt');
								// console.log(process.cwd());
								// fs.writeFileSync(path.resolve(process.cwd(), 'hola.txt'), buffer);

