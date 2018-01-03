/* global describe, it */
'use strict';

var expect = require('chai').expect;

var _helper = function(){
    return 'this is a helper';
};

var _registerer = function(_register){
    _register({
        'helper': _helper
    });
};

describe('Dashbars', function () {
    describe('mock:', function () {
        var dashbars = require('../lib/dashbars').cons(_registerer);

        dashbars.help(require('./mock-helpable').create());

        it('lookup a helper', function(){
            expect(dashbars.helper('helper')).to.equal(_helper);
        });
    });

    describe('Handlebars:', function () {
        var dashbars = require('../lib/dashbars').cons(_registerer);

        dashbars.help(require('handlebars').create());

        it('lookup a helper', function(){
            expect(dashbars.helper('helper')).to.equal(_helper);
        });
    });
});
