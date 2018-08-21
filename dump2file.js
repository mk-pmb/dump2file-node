/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX, fileNameMagic = require('./fnmagic'),
  promisedFs = require('nofs'), nodeInspect = require('util').inspect;


EX = function dump2file(what, filename) {
  what = EX.serialize(what);
  filename = String(filename || '');
  if (!filename) { filename = '\vu.dump'; }
  filename = EX.fileNameMagic(filename);

};


EX.serialize = function (x) {
  if (!x) { return String(x); }
  if (typeof x === 'string') { return x; }
  if (Buffer.isBuffer(x)) { return x; }
  return nodeInspect(x);
};





















module.exports = EX;
