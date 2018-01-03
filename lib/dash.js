const difference = require('lodash.difference');
const dropWhile = require('lodash.dropwhile');
const find = require('lodash.find');
const flatten = require('lodash.flatten');
const flattenDeep = require('lodash.flattendeep');
const intersection = require('lodash.intersection');
const isempty = require('lodash.isempty');
const isequal = require('lodash.isequal');
const range = require('lodash.range');
const takeWhile = require('lodash.takewhile');
const uniq = require('lodash.uniq');

// jshint unused:false
module.exports = function dash($register, $helper){
    //List
    $register('-map', function(fn, list) {
        return list.map($helper(fn));
    });
    $register('-sort', function(list, compare, options) {
        return list.slice().sort(options && $helper(compare));
    });
    $register('-take', function(n, list) {
       return list.slice(0, n);
    });
    $register('-drop', function(n, list) {
       return list.slice(n);
    });
    $register('-filter', function(pred, list) {
       return list.filter($helper(pred));
    });
    $register('-take-while', function(pred, list) {
        return takeWhile(list, $helper(pred));
    });
    $register('-drop-while', function(pred, list) {
        return dropWhile(list, $helper(pred));
    });
    $register('-slice', function(list, begin, end, options) {
        return list.slice(end && begin, options && end);
    });
    $register('-flatten', function(list) {
        return flatten(list);
    });
    $register('-deep-flatten', function(list) {
        return flattenDeep(list);
    });

    //Cons
    $register('-array', function() {
        return Array.prototype.slice.call(arguments, 0, -1);
    });
    $register('-range', function(from, to, step, options) {
        return range(to && from, step && to, options && step);
    });
    $register('-object', function(json) {
        return JSON.parse(json);
    });

    //Reductions
    $register('-size', function(list) {
        return list.length;
    });
    $register('-find', function(pred, list) {
        return find(list, $helper(pred).bind(this));
    });
    $register('-reduce', function(fn, initial, list) {
        return list.reduce($helper(fn), initial);
    });
    $register('-first', function(list) {
        return list[0];
    });
    $register('-last', function(list) {
        return list[list.length-1];
    });
    $register('-join', function(list, sep, options) {
        return list.join(options? sep:'');
    });
    $register('-sum', function(list) {
        return list.reduce(function(r, e){
                return r+e;
            }, 0);
    });
    $register('-product', function(list) {
        return list.reduce(function(r, e){
                return r*e;
            }, 1);
    });
    $register('-min', function(list) {
        return list.reduce(function(r, e){
                return r<e? r:e;
            }, Number.MAX_VALUE);
    });
    $register('-max', function(list) {
        return list.reduce(function(r, e){
                return r>e? r:e;
            }, Number.MIN_VALUE);
    });

    //Partitioning
    $register('-group-by', function(fn, list) {
        var that = this;
        return list.reduce(function(r, el){
            var key = $helper(fn).call(that, el);

            if( r[key] ){
               r[key].push(el);
            }else{
               r[key] = [el];
            }

            return r;
        }, {});
    });

    //Iteration
    $register('-grouped', function(size, list){
        return range(0, list.length, size)
            .map(function(n){ return list.slice(n, n+size);});
    });

    //Predicate
    $register('-every?', function(pred, list){
        return list.every($helper(pred));
    });
    $register('-some?', function(pred, list){
        return list.some($helper(pred));
    });
    $register('-none?', function(pred, list){
        return !list.some($helper(pred));
    });
    $register('-contain?', function(item, list){
        return list.some(function(el){
                return el === item;
            });
    });

    //Set operation
    $register('-union', function() {
        return Array.prototype.concat.apply(arguments[0],
            Array.prototype.slice.call(arguments, 1, -1));
    });
    $register('-difference', function() {
        return difference.apply(null,
            Array.prototype.slice.call(arguments, 0, -1));
    });
    $register('-intersection', function() {
        return intersection.apply(null,
            Array.prototype.slice.call(arguments, 0, -1));
    });
    $register('-distinct', function(list) {
        return uniq(list);
    });

    //Dictionary
    $register('-get', function(key, dict) {
        return dict[key];
    });
    $register('-keys', function(dict) {
        return Object.keys(dict);
    });
    $register('-values', function(dict) {
        return Object.keys(dict).map(function(k){
                return dict[k];
            });
    });

    //Object
    $register('-json', function(dict) {
        return JSON.stringify(dict);
    });

    //Function
    $register('-call', function() {
        var fn = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1, -1);

       return fn.apply(this, args);
    });
    $register('-as-is', function(o) {
        return o;
    });
    $register('-partial', function() {
        var fn = arguments[0];
        var applied = Array.prototype.slice.call(arguments, 1, -1);
        var that = this;
        return function(){
            var args = applied.slice();
            var arg = 0;
            for ( var i = 0; i < args.length || arg < arguments.length; i++ ) {
                if ( args[i] === undefined ) {
                    args[i] = arguments[arg++];
                }
            }

            return $helper(fn).apply(that, args);
        };
    });

    //Side Effects
    $register('-let', function(name, value) {
        this[name] = value;
    });
    $register('-log', function() {
        console.log.call(this, Array.prototype.slice.call(arguments, 1, -1));
    });

};
