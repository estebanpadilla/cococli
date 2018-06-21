#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var args = require('minimist')(process.argv.slice(2));



for (const key in args) {
	if (args.hasOwnProperty(key)) {
		switch (key) {
			case 'js':
				createJS(args[key]);
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
		console.log(args[key]);
	}
}

function createJS(name) {
	var text = `/** 
* @name ${name}
* @file Add a small description for this file.
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/`;
	var buffer = new Buffer(text, 'utf8');
	fs.writeFileSync(path.resolve(process.cwd(), (name + '.js')), buffer);
}

function saveEmail(email) {
	var buffer = new Buffer(email, 'utf8');
	fs.writeFileSync(path.resolve(__dirname + '/settings/', 'email.txt'), buffer);
}

function saveAuthor(author) {
	var buffer = new Buffer(author, 'utf8');
	fs.writeFileSync(path.resolve(__dirname + '/settings/', 'author.txt'), buffer);
}






// fs.readFile('jokes.txt', function (err, data) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(data.toString());
// 	}
// });

//console.log(process.argv);
// var myArgs = process.argv.slice(2);
// console.log('myArgs: ', myArgs);

// var buffer = new Buffer('HOLA COCO', 'utf8');
// console.log(__dirname + '/hola.txt');
// console.log(process.cwd());
// fs.writeFileSync(path.resolve(process.cwd(), 'hola.txt'), buffer);

