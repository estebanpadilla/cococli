#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

// fs.readFile('jokes.txt', function (err, data) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(data.toString());
// 	}
// });

console.log(process.argv);
var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

var buffer = new Buffer('HOLA COCO', 'utf8');
// console.log(__dirname + '/hola.txt');
console.log(process.cwd());
fs.writeFileSync(path.resolve(process.cwd(), 'hola.txt'), buffer);

