'use strict';
require('babel-core/register');
var chalk = require('chalk');

// Create a node server instance! cOoL!
var server = require('http').createServer();

var createApplication = function () {
    return new Promise (function (resolve) {
    	var app = require('./app');
    	return resolve(server.on('request', app)); // Attach the Express application.
    });
};

var startServer = function () {

    var PORT = process.env.PORT || 1337;

    server.listen(PORT, function () {
        console.log(chalk.blue('Server started on port', chalk.magenta(PORT)));
    });

};

createApplication().then(startServer).catch(function (err) {
    console.error(chalk.red(err.stack));
    process.kill(1);
});