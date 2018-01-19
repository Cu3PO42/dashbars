const isEmpty = require('lodash/isEmpty');
const isEqual = require('lodash/isEqual');

var _is = function(o){
    return !!o;
};

// jshint unused:false
module.exports = function p($register, $helper){

    $register('-is?', _is);
    $register('-and?', function() {
        return Array.prototype.slice.call(arguments, 0, -1)
            .every(_is);
    });
    $register('-or?', function() {
        return Array.prototype.slice.call(arguments, 0, -1)
            .some(_is);
    });
    $register('-not?', function(t) {
        return !t;
    });
    $register('-gt?', function(left, right) {
        return left > right;
    });
    $register('-lt?', function(left, right) {
        return left < right;
    });
    $register('-ge?', function(left, right) {
        return left >= right;
    });
    $register('-le?', function(left, right) {
        return left <= right;
    });
    $register('-ne?', function(left, right) {
        return left !== right;
    });
    $register('-equal?', function(left, right) {
        return left === right;
    });
    $register('-deep-equal?', function(left, right) {
        return isEqual(left,right);
    });
    $register('-in?', function(prop, o) {
        return prop in o;
    });
    $register('-has?', function(prop, o) {
        return Object.prototype.hasOwnProperty.call(o, prop);
    });
    $register('-empty?', function(o){
        return isEmpty(o);
    });
    $register('-not-empty?', function(o){
        return !isEmpty(o);
    });
    $register('-string?', function(o){
        return typeof o === 'string' || o instanceof String;
    });
    $register('-array?', function(o){
        return Array.isArray(o);
    });
};
