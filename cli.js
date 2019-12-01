#!/usr/bin/env node

/**
* @name cli.js
* @file Add a small description for this file.
* @author Esteban Padilla <ep@estebanpadilla.com>
* @version 1.6.0
* How to run on developement: node cli.js Commands Parameters
*/

var coco = require('./coco');

function start() {

	var isOK = false;
	var args = process.argv.slice(2);

	switch (args[0]) {
		case '-js':
			coco.createJS(args[1]);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-html':
			coco.createHTML(args[1]);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-css':
			coco.createCSS(args[1]);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-class':
			coco.createClass(args[1]);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-email':
			coco.saveEmail(args[1]);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-author':
			coco.saveAuthor(args[1] + ' ' + args[2]);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-proj':
		case '-p':
			coco.createProject(args[1]);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-game':
		case '-g':
			coco.createGame(args[1]);
			isOK = true;
			coco.closeReadLine();
			break;
		case '-help':
		case '-h':
			coco.showHelp();
			isOK = true;
			coco.closeReadLine();
			break;
		case '-version':
		case '-v':
			coco.showVersion();
			isOK = true;
			coco.closeReadLine();
			break;
		case '-config':
			isOK = coco.setupConfiguration();
			break;
		default:
			break;
	}

	if (!isOK) {
		var msj = '-> Error on command!';
		console.log(msj);
		coco.closeReadLine();
	}
}

start();
