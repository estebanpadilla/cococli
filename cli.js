#!/usr/bin/env node

/**
* @name cli.js
* @file Add a small description for this file.
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.0.0
*/

var coco = require('./coco');
var args = require("yargs").argv;
var colors = require('colors');

function start() {

	var isOK = false;

	for (const key in args) {
		if (args.hasOwnProperty(key)) {
			switch (key) {
				case 'js':
					coco.createJS(args[key]);
					isOK = true;
					break;
				case 'html':
					coco.createHTML(args[key]);
					isOK = true;
					break;
				case 'css':
					coco.createCSS(args[key]);
					isOK = true;
					break;
				case 'class':
					coco.createClass(args[key]);
					isOK = true;
					break;
				case 'email':
					coco.saveEmail(args[key]);
					isOK = true;
					break;
				case 'author':
					coco.saveAuthor(args[key] + ' ' + args['_']);
					isOK = true;
					break;
				case 'proj':
					coco.createProject(args[key]);
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
