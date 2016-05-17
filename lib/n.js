// jshint unused:false
var n = function n($register, $helper){

    //Predicate
    $register('n-even?', function(n) {
        return n%2 === 0;
    });
    $register('n-odd?', function(n) {
        return n%2 !== 0;
    });

    //Operation
    $register('n-add', function(left, right) {
        return left+right;
    });

    $register('n-subtract', function(left, right) {
        return left-right;
    });

    $register('n-multiply', function(left, right) {
        return left*right;
    });

    $register('n-divide', function(left, right) {
        return left/right;
    });

    $register('n-modulo', function(left, right) {
        return left % right;
    });

    $register('n-bls', function(left, right) {
        return left << right;
    });

    $register('n-brs', function(left, right) {
        return left >>> right;
    });

    $register('n-brss', function(left, right) {
        return left >> right;
    });

    $register('n-band', function(left, right) {
        return (left & right) >>> 0;
    });

    $register('n-bor', function(left, right) {
        return (left | right) >>> 0;
    });

    $register('n-bxor', function(left, right) {
        return (left ^ right) >>> 0;
    });
};
