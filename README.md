> A modern helper library. Much inspired by [dash.el][] and [s.el][], [f.el][], [handlebars-helpers][].

[Handlebars]: http://handlebarsjs.com/
[dash.el]: https://github.com/magnars/dash.el
[s.el]: https://github.com/magnars/s.el
[f.el]: https://github.com/rejeep/f.el
[handlebars-helpers]: https://github.com/assemble/handlebars-helpers

Dashbars that is a helper collection be able to easily combined with built-in helpers:

```html
{{-take 5 (-drop 3 (-range 0 10))}} // [3,4,5,6,7]
{{-slice (-range 0 10) 0 5}} // [0,1,2,3,4]

{{#each (-take 5 (-drop 3 (-range 0 10)))}} // [3,4,5,6,7]
    ...
{{else}}
    ...
{{/each}}

{{#if (-lt? 3 myVar)}} // 3 < myVar
    ...
{{else}}
    ...
{{/if}}
```

You can try this on [trydashbars](http://pismute.github.io/Try-Dashbars/).

## Helpers

### Common predicate

Functions return boolean. The name of predicate should end with question mark(`?`).

Basically, You can use the predicate helper to combine with build-in block helpers(if, unless, each):

```
{{#if (-lt? 3 4)}}
   ...
{{/if}}

{{#if (-string? 'my string')}}
   ...
{{/if}}
```

You can chain helpers:

```
{{#if (-not? (-gt? 3 4))}}
   ...
{{/if}}
```

There are common predicates for object:

- [-is?](#-is-o-) `(o)`
- [-and?](#-and-...) `(...)`
- [-or?](#-or-...) `(...)`
- [-not?](#-not-boolean) `(boolean)`
- [-gt?](#-gt-left-right) `(left, right)`
- [-lt?](#-lt-left-right) `(left, right)`
- [-ge?](#-ge-left-right) `(left, right)`
- [-le?](#-le-left-right) `(left, right)`
- [-ne?](#-ne-left-right) `(left, right)`
- [-equal?](#-equal-left-right) `(left, right)`
- [-deep-equal?](#-deep-equal-left-right) `(left, right)`
- [-in?](#-in-prop-o) `(prop, o)`
- [-has?](#-has-prop-o) `(prop, o)`
- [-empty?](#-empty-o) `(o)`
- [-not-empty?](#-not-empty-o) `(o)`
- [-string?](#-string-o) `(o)`
- [-array?](#-array-o) `(o)`

### Dash

List and Dictionary are abstract term. List demonstrates Array and Set of ES6, somethings which are iterable like list. Dictionary demonstrates plain JavaScript Object and Map of ES6, something which are key-value data structure.

As of now, dashbars tested and supports ES5 only so that List is Array and Dictionary is plain Object.

#### List:

Functions take a list return new list.

All functions which you need are also helper. You should register your helper. And then you can use the name of your helper:

```js
Handlebars.registerHelper('-as-is', function(o){
    return o;
});
```

```html
{{-json (-map '-as-is' (-range 0 5))}} // [0,1,2,3,4]
```

Predicates are the same:

```js
Handlebars.registerHelper('n-even?', function(n){
    return n % 2 === 0;
});
```

```html
{{-json (-take-while 'n-even?' (-range 0 5))}} // [0]
```

- [-map](#-map-fn-list) `(fn, list)`
- [-sort](#-sort-list-compare) `(list, compare)`
- [-take](#-take-n-list) `(n, list)`
- [-drop](#-drop-n-list) `(n, list)`
- [-filter](#-filter-pred-list) `(pred, list)`
- [-take-while](#-take-while-pred-list) `(pred, list)`
- [-drop-while](#-drop-while-pred-list) `(pred, list)`
- [-slice](#-slice-list-begin-end) `(list, begin, end)`
- [-flatten](#-flatten-list) `(list)`
- [-deep-flatten](#-deep-flatten-list) `(list)`

#### Cons:

Functions construct new JavaScript object.

- [-array](#-array-...) `(...)`
- [-range](#-range-from-to-step) `(from, to, step)`
- [-object](#-object-json) `(json)`

#### Reduction:

Functions reducing lists into single value.

- [-size](#-size-list) `(list)`
- [-find](#-find-pred-list) `(pred, list)`
- [-reduce](#-reduce-fn-inital-list) `(fn, initial, list)`
- [-first](#-first-list) `(list)`
- [-last](#-last-list) `(list)`
- [-join](#-join-list-sep) `(list, sep)`
- [-sum](#-sum-list) `(list)`
- [-product](#-product-list) `(list)`
- [-min](#-min-list) `(list)`
- [-max](#-max-list) `(list)`

#### Partitioning:

Functions partitioning the input list into multiple lists.

- [-group-by](#-group-by-fn-list) `(fn, list)`

#### Iteration:

Functions transforming the input list into a list of lists for easy iteration.

- [-grouped](#-grouped-size-list) `(size, list)`

#### Predicate:

- [-every?](#-every-pred-list) `(pred, list)`
- [-some?](#-some-pred-list) `(pred, list)`
- [-none?](#-none-pred-list) `(pred, list)`
- [-contain?](#-contain-item-list) `(item, list)`

#### Set operation:

Operations pretending lists are sets.

- [-union](#-union-...) `(...)`
- [-difference](#-difference-...) `(...)`
- [-intersection](#-intersection-...) `(...)`
- [-distinct](#-distinct-list) `(list)`

#### Dictionary:

Operations on dictionaries.

- [-get](#-get-key-dict) `(key, dict)`
- [-keys](#-keys-dict) `(dict)`
- [-values](#-values-dict) `(dict)`

#### Obejct:

- [-json](#-json-o) `(o)`

#### Function:

Combinational functions, a bit experimental:

- [-as-is](#-as-is-o) `(o)`
- [-partial](#-partial-fn-...) `(fn, ...)`
- [-call](#-call-fn-...) `(fn, ...)`

#### Side Effects:

- [-let](#-let-name-value) `(name, value)`
- [-log](#-log-...) `(...)`

### Number

#### Predicate:

- [n-even?](#n-even-n) `(n)`
- [n-odd?](#n-odd-n) `(n)`

#### Operation:

- [n-add](#n-add-left-right) `(left, right)`
- [n-subtract](#n-subtract-left-right) `(left, right)`
- [n-multiply](#n-multiply-left-right) `(left, right)`
- [n-divide](#n-divide-left-right) `(left, right)`
- [n-modulo](#n-modulo-left-right) `(left, right)`
- [n-bls](#n-bls-left-right) `(left, right)`
- [n-brs](#n-brs-left-right) `(left, right)`
- [n-brss](#n-brss-left-right) `(left, right)`
- [n-band](#n-band-left-right) `(left, right)`
- [n-bor](#n-bor-left-right) `(left, right)`
- [n-bxor](#n-bxor-left-right) `(left, right)`

### String

- [s-size](#s-size-s) `(s)`
- [s-trim](#s-trim-s) `(s)`
- [s-take](#s-take-n-s) `(n, s)`
- [s-drop](#s-drop-n-s) `(n, s)`
- [s-repeat](#s-repeat-n-s) `(n, s)`
- [s-concat](#s-concat-...) `(...)`
- [s-split](#s-split-sep-s) `(sep, s)`
- [s-slice](#s-slice-s-from-to) `(s, from, to)`
- [s-reverse](#s-reverse-s) `(s)`
- [s-replace](#s-replace-old-new-regopts) `(old, new, s, regOpts)`
- [s-match](#s-match-regex-s-regopts) `(regex, s, regOpts)`
- [s-lowercase](#s-lowercase-s) `(s)`
- [s-uppercase](#s-uppercase-s) `(s)`

#### Predicates:

- [s-lowercase?](#s-lowercase-s) `(s)`
- [s-uppercase?](#s-uppercase-s) `(s)`
- [s-match?](#s-match-regex-s-regopts-1) `(regex, s, regOpts)`
- [s-contain?](#s-contain-needle-s-ignorecase-1) `(needle, s, ignoreCase)`
- [s-start-with?](#s-start-with-prefix-s-igrnorecase) `(prefix, s, ignoreCase)`
- [s-end-with?](#s-end-with-suffix-s-ignorecase) `(suffix, s, ignoreCase)`

## API

Functions and Helpers

Template Data:

```
{
    funct0: function(){},
    funct1: function(){ return 1;},
    objec0: {},
    objec01: {},
    objec1: {key:'value'},
    objec11: {key:'value'},
    objec2: {
        key:"value",
        key2:"value2"
    },
    array0: [],
    array1: [1],
    truee0: true,
    false0: false,
    strin0: '',
    strin1: 'string',
    numbe0: 0,
    numbe1: 1
}
```
### Common Predicates

##### -is? `(o)`

Function returns false when `o` is falsey value, otherwise returns true.

```
{{-is? false}} // => false
{{-is? null}} // => false
{{-is? undefined}} // => false
{{-is? 0}} // => false
{{-is? ''}} // => false

{{-is? true}} // => true
{{-is? 'undefined'}} // => true
{{-is? 1}} // => true

{{-is? false0}} // => false
{{-is? strin0}} // => false
{{-is? numbe0}} // => false

{{-is? truee0}} // => true
{{-is? funct0}} // => true
{{-is? objec0}} // => true
{{-is? array0}} // => true
{{-is? strin1}} // => true
```

##### -and? `(...)`

```
{{-and? true false}} // => false
{{-and? true true}} // => true
{{-and? true true 0}} // => false
{{-and? true true 1}} // => true
```

##### -or? `(...)`

```
{{-or? true false}} // => true
{{-or? false false}} // => false
{{-or? false false 0}} // => false
{{-or? false false 1}} // => true
```

##### -not? `(boolean)`

```
{{-not? true}} // => false
{{-not? false}} // => true
{{-not? 0}} // => true
{{-not? 1}} // => false
```

##### -gt? `(left, right)`

```
{{-gt? 1 2}} // => false
{{-gt? 2 2}} // => false
{{-gt? 2 1}} // => true
{{-gt? 'a' 'b'}} // => false
{{-gt? 'a' 'a'}} // => false
{{-gt? 'b' 'a'}} // => true
```

##### -lt? `(left, right)`

```
{{-lt? 1 2}} // => true
{{-lt? 2 2}} // => false
{{-lt? 2 1}} // => false
{{-lt? 'a' 'b'}} // => true
{{-lt? 'a' 'a'}} // => false
{{-lt? 'b' 'a'}} // => false
```

##### -ge? `(left, right)`

```
{{-ge? 1 2}} // => false
{{-ge? 2 2}} // => true
{{-ge? 2 1}} // => true
{{-ge? 'a' 'b'}} // => false
{{-ge? 'a' 'a'}} // => true
{{-ge? 'b' 'a'}} // => true
```

##### -le? `(left, right)`

```
{{-le? 1 2}} // => true
{{-le? 2 2}} // => true
{{-le? 2 1}} // => false
{{-le? 'a' 'b'}} // => true
{{-le? 'a' 'a'}} // => true
{{-le? 'b' 'a'}} // => false
```

##### -ne? `(left, right)`

```
{{-ne? 1 2}} // => true
{{-ne? 2 2}} // => false
{{-ne? 'a' 'b'}} // => true
{{-ne? 'a' 'a'}} // => false
```

##### -equal? `(left, right)`

equals strictly(`===`)

```
{{-equal? objec0 objec0}} // => true
{{-equal? objec0 objec01}} // => false
```

##### -deep-equal? `(left, right)`

```
{{-deep-equal? objec1 objec1}} // => true
{{-deep-equal? objec1 objec11}} // => true
{{-equal? objec1 objec11}} // => false
```

##### -in? `(prop, o)`

```
{{-in? 'objec1' this}} // => true
{{-in? 'not' this}} // => false
```

##### -has? `(prop, o)`

'Object.hasOwnProperty()'

```
{{-has? 'objec1' this}} // => true
{{-has? 'not' this} // => false
```

##### -empty? `(o)`

```
{{-empty? false}} // => true
{{-empty? null}} // => true
{{-empty? undefined}} // => true
{{-empty? 0}} // => true
{{-empty? ''}} // => true

{{-empty? true}} // => true
{{-empty? 'undefined'}} // => false
{{-empty? 1}} // => true

{{-empty? false0}} // => true
{{-empty? strin0}} // => true
{{-empty? numbe0}} // => true

{{-empty? truee0}} // => true
{{-empty? funct0}} // => true
{{-empty? funct1}} // => true
{{-empty? objec0}} // => true
{{-empty? objec1}} // => false
{{-empty? array0}} // => true
{{-empty? array1}} // => false
{{-empty? strin1}} // => false
```

##### -not-empty? `(o)`

`-not-empty?` equals `{{-not? (-empty something)}}`.

```
{{-not-empty? false}} // => false
```

##### -string? `(o)`

```
{{-string? false}} // => false
{{-string? 'true'}} // => true
{{-string? ''}} // => true
```

##### -array? `(o)`

```
{{-array? false}} // => false
{{-array? array0}} // => true
{{-array? array1}} // => true
```

### Dash:

##### -map `(fn, list)`

```
{{-map 'n-even?' (-range 0 5)}} // => [true,false,true,false,true]
```

##### -sort `(list, compare)`

```
{{-sort (-range 0 5) '-lt?'}} // => [4,3,2,1,0]
```

##### -take `(n, list)`

```
{{-take 3 (-range 0 5)}} // => [0,1,2]
```

##### -drop `(n, list)`

```
{{-drop 3 (-range 0 5)}} // => [3,4]
```

##### -filter `(pred, list)`

```
{{-filter 'n-even?' (-range 0 5)}} // => [0,2,4]
```

##### -take-while `(pred, list)`

```
{{-take-while 'n-even?' (-range 0 5)}} // => [0]
```

##### -drop-while `(pred, list)`

```
{{-drop-while 'n-even?' (-range 0 5)}} // => [1,2,3,4]
```

##### -slice `(list, begin, end)`

```
{{-slice (-range 0 5) 0 3}} // => false
```

##### -flatten `(list)`

```
//[[[0,1,2], [0,1,2]],[0,1,2]]
{{-flatten (-array (-array (-range 0 3) (-range 0 3)) (-range 0 3))}} // => [[0,1,2],[0,1,2],0,1,2]
```

##### -deep-flatten `(list)`

```
//[[[0,1,2], [0,1,2]],[0,1,2]]
{{-json (-deep-flatten (-array (-array (-range 0 3) (-range 0 3)) (-range 0 3)))}} // => [0,1,2,0,1,2,0,1,2]
```

#### Cons:

##### -array `(...)`

```
{{-array (-array (-range 0 3) (-range 0 3)) (-range 0 3)}} // => [[[0,1,2], [0,1,2]],[0,1,2]]
```

##### -range `(from, to, step)`

```
{{-range 0 3}} // => [0,1,2]
```

##### -object `(json)`

```
{{{-json (-object '{"key":"value"}')}}} // => {"key":"value"}
```

#### Reduction:

##### -size `(list)`

```
{{-size (-range 0 3)}} // => 3
```

##### -find `(pred, list)`

```
{{-find 'n-odd?' (-range 2 5)}} // => 3
```

##### -reduce `(fn, initial, list)`

```
{{-reduce 'n-add' 0 (-range 0 10)}} // => 45
```

##### -first `(list)`

```
{{-first (-range 3 10)}} // => 3
```

##### -last `(list)`

```
{{-last (-range 3 10)}} // => 9
```

##### -join `(list, sep)`

```
{{-join (-range 0 5) '-'}} // => 0-1-2-3-4
```

##### -sum `(list)`

```
{{-sum (-range 0 5)}} // => 10
```

##### -product `(list)`

```
{{-product (-range 1 5)}} // => 24
```

##### -min `(list)`

```
{{-min (-range 0 5)}} // => 0
```

##### -max `(list)`

```
{{-max (-range 0 5)}} // => 4
```

#### Partitioning:

##### -group-by `(fn, list)`

```
{{{-json (-group-by 'n-even?' (-range 0 5))}}} // => {"true":[0,2,4],"false":[1,3]}
```

#### Iteration:

##### -grouped `(size, list)`

```
{{{-json (-grouped 2 (-range 0 5))}}} // => [[0,1],[2,3],[4]]
```

#### Predicate:

##### -every? `(pred, list)`

```
{{-every? 'n-even?' (-range 0 5)}} // => false
{{-every? 'n-even?' (-array 0 2 4 6)}} // => true
{{-every? 'n-even?' (-array 1 3 5)}} // => false
{{-every? 'n-even?' (-array)}} // => true
```

##### -some? `(pred, list)`

```
{{-some? 'n-even?' (-range 0 5)}} // => true
{{-some? 'n-even?' (-array 0 2 4 6)}} // => true
{{-some? 'n-even?' (-array 1 3 5)}} // => false
{{-some? 'n-even?' (-array)}} // => false
```

##### -none? `(pred, list)`

```
{{-none? 'n-even?' (-range 0 5)}} // => false
{{-none? 'n-even?' (-array 0 2 4 6)}} // => false
{{-none? 'n-even?' (-array 1 3 5)}} // => true
{{-none? 'n-even?' (-array)}} // => false
```

##### -contain? `(item, list)`

```
{{-contain? 0 (-range 1 5)}} // => false
{{-contain? 1 (-range 1 5)}} // => true
```

#### Set operation:

##### -union `(...)`

```
{{-union (-range 0 5) (-range 0 5)}} // => [0,1,2,3,4,0,1,2,3,4]
```

##### -difference `(...)`

```
{{-difference (-range 0 5) (-range 3 8)}} // => [0,1,2]
```

##### -intersection `(...)`

```
{{-intersection (-range 0 5) (-range 3 8)}} // => [3,4]
```

##### -distinct `(list)`

```
{{-distinct (-array 0 0 1 1 2 2 3 3 4 4 5 5)}} // => [0,1,2,3,4,5]
```

#### Dictionary:

sample data:

```
objec2 = {
    "key":"value",
    "key2":"value2"
}
```

##### -get `(key, dict)`

```
{{-get 'key' objec2}} // => "value"
```

##### -keys `(dict)`

```
{{-keys objec2}} // => ["key", "key2"]
```

##### -values `(dict)`

```
{{-values objec2}} // => ["value","value2"]
```

#### Object:

##### -json `(o)`

```
{{{-json (-range 0 5)}}} // => [1,2,3,4,5]
{{{-json objec2}}} // => {"key":"value","key2":"value2"}
```

#### Function:

##### -as-is `(o)`

```
{{{-as-is (-range 0 5)}}} // => [1,2,3,4,5]

{{{-map '-as-is' (-range 0 5)}}} // => // => [1,2,3,4,5]

{{{-group-by '-as-is' (-range 0 5)}}} // => // => {"0":[0],"1":[1],"2":[2],"3":[3],"4":[4]}
```

##### -partial `(fn, ...)`

A function returns a partially applied function. You can chain other functions.

```
{{-filter (-partial '-gt?' 3) (-range 0 5)}} // => [0,1,2]
```

##### -call `(fn, ...)`

`-call` calls a function at once.

```
{{{-call (-partial '-gt?' 3) 2}}} // => true
```

#### Side Effects:

##### -let `(name, value)`

You can define data in current context of Template Data. It is simple concept, `this[name] = value`.
It returns an empty string(`''`).

```
{{{-let 'name' true}}} // => ''
```

##### -log `(...)`

You can log on console. It is simple concept, `console.log(...)`.
It returns an empty string(`''`).

```
{{{-log 'my log'}}} // => ''
```

### Number

#### Predicate:

##### n-even? `(n)`

```
{{{n-even? 0}}} // => true
{{{n-even? 1}}} // => false
```

##### n-odd? `(n)`

```
{{{n-odd? 1}}} // => true
{{{n-odd? 2}}} // => false
```

#### Operation:

##### n-add `(left, right)`

```
{{{n-add 10 5}}} // => 15
```

##### n-subtract `(left, right)`

```
{{{n-subtract 10 5}}} // => 5
```

##### n-multiply `(left, right)`

```
{{{n-multiply 2 5}}} // => 10
```

##### n-divide `(left, right)`

```
{{{n-divide 10 2}}} // => 5
```

##### n-modulo `(left, right)`

```
{{{n-modulo 10 3}}} // => 1
```

##### n-bls `(left, right)`

```
{{{n-bls 1 2}}} // => 4
```

##### n-brs `(left, right)`

Zero fill right shift.

```
{{{n-brs 2 1}}} // => 1
{{{n-brs -1 2}}} // => 0x3FFFFFFF
```

##### n-brss `(left, right)`

Sign propagating right shift.

```
{{{n-brs 2 1}}} // => 1
{{{n-brs -1 2}}} // => 1
```

##### n-band `(left, right)`

```
{{{n-band 5 3}}} // => 1
```

##### n-bor `(left, right)`

```
{{{n-bor 5 3}}} // => 7
```

##### n-bxor `(left, right)`

```
{{{n-bxor 5 3}}} // => 6
```

### String

##### s-size `(s)`

```
{{{s-size 'string'}}} // => 6
```

##### s-trim `(s)`

```
{{{s-trim ' string '}}} // => 'string'
```

##### s-take `(n, s)`

```
{{{s-take 2 'string'}}} // => 'st'
```

##### s-drop `(n, s)`

```
{{{s-drop 2 'string'}}} // => 'ring'
```

##### s-repeat `(n, s)`

```
{{{s-repeat 2 'string'}}} // => 'stringstring'
```

##### s-concat `(...)`

```
{{{s-concat 'st' 'ri' 'ng'}}} // => 'string'
```

##### s-split `(sep, s)`

```
{{{s-split ',' 's,t,r,i,n,g'}}} // => ['s','t','r','i','n','g']
```

##### s-slice `(s, from, to)`

```
{{{s-slice 'string' 1 4}}} // => 'tri'
{{{s-slice 'string' 1}}} // => 'tring'
{{{s-slice 'string'}}} // => 'string'
{{{s-slice 'string' 0 -1}}} // => 'strin'
```

##### s-reverse `(s)`

```
{{{s-reverse 'string'}}} // => 'gnirts'
```

##### s-replace `(old, new, s, regOpts)`

```
{{{s-replace 'str' 'int' 'string string STRING'}}} // => "inting string STRING"
{{{s-replace 'str' 'int' 'string string STRING' 'g'}}} // => "inting inting STRING"
{{{s-replace 'str' 'int' 'string string STRING' 'gi'}}} // => "inting inting intING"
```

##### s-match `(regex, s, regOpts)`

```
{{{s-match 's.+?i' 'string string STRING'}}} // => ["stri"]
{{{s-match 's.+?i' 'string string STRING' 'g'}}} // => ["stri","stri"]
{{{s-match 's.+?i' 'string string STRING' 'gi'}}} // => ["stri","stri","STRI"]
{{{s-match 'si' 'string string STRING' 'gi')}}} // => []
```

##### s-lowercase `(s)`

```
{{{s-lowercase 'STRing'}}} // => 'string'
```

##### s-uppercase `(s)`

```
{{{s-uppercase 'STRing'}}} // => 'STRING'
```

#### Predicates:

##### s-lowercase? `(s)`

```
{{{s-lowercase? 'STRING'}}} // => false
{{{s-lowercase? 'STRing'}}} // => false
{{{s-lowercase? 'string'}}} // => true
```

##### s-uppercase? `(s)`

```
{{{s-uppercase? 'STRING'}}} // => true
{{{s-uppercase? 'STRing'}}} // => false
{{{s-uppercase? 'string'}}} // => false
```

##### s-match? `(regex, s, regOpts)`

```
{{{s-match? '.*r' 'string'}}} // => true
{{{s-match? 'g.*r' 'string'}}} // => false
```

##### s-contain? `(needle, s, ignoreCase)`

```
{{{s-contain? 'str' 'string'}}} // => true
{{{s-contain? 'gnitrs' 'string'}}} // => false
```

##### s-start-with? `(prefix, s, ignoreCase)`

```
{{{s-start-with? 'str' 'string'}}} // => true
{{{s-start-with? 'tri' 'string'}}} // => false
```

##### s-end-with? `(suffix, s, ignoreCase)`

```
{{{s-end-with? 'ing' 'string'}}} // => true
{{{s-end-with? 'rin' 'string'}}} // => false
```

## Conventional guide.

### Namespace

Start with:

- `-`: Collections functions and basic utility
- `n-`: Numeric functions
- `d-`: Date functions
- `s-`: String functions

### Predicate

- Predicate should return real boolean(not falsey/truey values)
- The name of predicate should end with question mark('?')

### Arguments

- Mandatory arguments should be before target object, but Optional arguments should be after target object. Let's see [s-replace](#s-replace-old-new-regopts):

```html
{{s-replace old new s regOpts}}
```
- `old` and `new` are mandatory arguments.
- `s` is main argument
- `regOpts` is optional.

## License

MIT © [Changwoo Park](https://pismute.github.io/)

[npm-url]: https://npmjs.org/package/dashbars
[npm-image]: https://badge.fury.io/js/dashbars.svg
[travis-url]: https://travis-ci.org/pismute/dashbars
[travis-image]: https://travis-ci.org/pismute/dashbars.svg?branch=master
[daviddm-url]: https://david-dm.org/pismute/dashbars.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/pismute/dashbars
[coverall-image]: https://coveralls.io/repos/pismute/dashbars/badge.svg
[coverall-url]: https://coveralls.io/r/pismute/dashbars
