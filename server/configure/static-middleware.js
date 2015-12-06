"use strict";
var path = require('path');
var express = require('express');
//var favicon = require('serve-favicon');

module.exports = function (app) {

    var root = app.getValue('projectRoot');

    var npmPath = path.join(root, './node_modules');
    var publicPath = path.join(root, './images');
    var browserPath = path.join(root, './js');
    var cssPath = path.join(root, './css');

    //app.use(favicon(app.getValue('faviconPath')));
    // app.all("/", function (req, res, next) {
    // 	console.log("hit static middleware");
    // 	next();
    // });
    app.use(express.static(npmPath));
    app.use(express.static(publicPath));
    app.use(express.static(browserPath));
    app.use(express.static(cssPath));

};
