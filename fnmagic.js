/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX = function fileNameMagic(pattern, factOverrides) {
  var parts = pattern.split(/\v/);
  if (parts.length < 2) { return pattern; }
  function facts(x) { return EX[x](facts); }
  Object.assign(facts, {
    now: new Date(),
  }, factOverrides);
  return parts.map(function (part, idx) {
    if (idx === 0) { return part; }
    var magic = EX[part.slice(0, 1)];
    if (!magic) { return part; }
    return (magic(facts) + part.slice(1));
  }).join('');
};

EX.u = function (f) {
  return (f('D') + '-' + f('T')
    + '.' + f('n') + '-' + f('p') + '-' + f('r') + '-' + f('r')
    );
};
EX.r = function () { return (Math.random().toString(36).slice(2) || '0'); };
EX.Z = function (f) { return f.now.toISOString(); };
EX.q = function (f) { return String(f.now.getTime()); };
EX.Q = function (f) { return f.now.getTime().toString(36); };
EX.T = function (f) { return (f('H') + f('M') + f('S')); };
EX.D = function (f) { return (f('y') + f('m') + f('d')); };
EX.a = function (f) { return f.now.toGMTString().slice(0, 3); };

function dateFunc(ch, mtd, cut, add) {
  add = 1e6 + (add || 0);
  if (!cut) { cut = 2; }
  EX[ch] = function (f) {
    var d = f.now, m = d[mtd];
    return (m.call(d) + add).toFixed(0).slice(-cut);
  };
}
dateFunc('Y', 'getFullYear', 4);
dateFunc('y', 'getFullYear');
dateFunc('m', 'getMonth', 2, 1);
dateFunc('d', 'getDate');
dateFunc('H', 'getHours');
dateFunc('M', 'getMinutes');
dateFunc('S', 'getSeconds');






module.exports = EX;
