var _helper = function(name){
    return (name && Object.prototype.toString.call(name) === '[object Function]') ? name :
            this._helpable.helper(name) || function(){
                throw Error('not found the helper:' + name);
            };
};

var _emptyHelpable = {
    // jshint unused:false
    registerHelper: function(name, func){
        return this;
    },
    // jshint unused:false
    helper: function(name){
        return function(){};
    }
};

var _wrapHelpable = function(helpable){
    //handlebars
    return {
        registerHelper: function(name, func){
            helpable.registerHelper(name, func);

            return this;
        },
        helper: function(name){
            return helpable.helpers[name];
        }
    };
};

var _help = function(helpable){
    var that = this;
    this._helpable = _wrapHelpable(helpable);
    this._registerers.forEach(function(register){
        register(that._helpable.registerHelper, that.helper, that.predicate);
    });

    return this;
};

var _create = function() {
    return _cons(...this._registerers);
};

// jshint latedef:false
var _cons = function (...args){
    var dashbars = {
        _registerers: args, 
        _helpable: _emptyHelpable
    };

    dashbars.help = _help.bind(dashbars);
    dashbars.helper = _helper.bind(dashbars);
    dashbars.create = _create.bind(dashbars);
    dashbars.cons = _cons.bind(dashbars);

    return dashbars;
};

module.exports = _cons(require('./dash'), require('./n'), require('./p'), require('./p'), require('./s'));