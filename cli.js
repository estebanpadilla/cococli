#!/usr/bin/env node

/**
* @name cli.js
* @file Add a small description for this file.
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.3.1
*/

var coco = require('./coco');
var colors = require('colors');

function start() {

	var isOK = false;
	var args = process.argv.slice(2);

	switch (args[0]) {
		case '-js':
			coco.createJS(args[1]);
			isOK = true;
			break;
		case '-html':
			coco.createHTML(args[1]);
			isOK = true;
			break;
		case '-css':
			coco.createCSS(args[1]);
			isOK = true;
			break;
		case '-class':
			coco.createClass(args[1]);
			isOK = true;
			break;
		case '-email':
			coco.saveEmail(args[1]);
			isOK = true;
			break;
		case '-author':
			coco.saveAuthor(args[1] + ' ' + args[2]);
			isOK = true;
			break;
		case '-proj':
		case '-p':
			coco.createProject(args[1]);
			isOK = true;
			break;
		case '-game':
		case '-g':
			coco.createGame(args[1]);
			isOK = true;
			break;
		case '-help':
		case '-h':
			coco.showHelp();
			isOK = true;
		case '-version':
		case '-v':
			coco.showVersion();
			isOK = true;
		default:
			break;
	}

	if (!isOK) {
		var msj = 'Error on command!'.bgRed.bold;
		console.log(msj);
	}
}

start();
