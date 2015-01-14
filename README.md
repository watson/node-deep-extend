Node.JS module “Deep Extend”
============================

Recursive object extending.

[![NPM](https://nodei.co/npm/deep-extend.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/deep-extend/)
[![NPM](https://nodei.co/npm-dl/deep-extend.png?height=3)](https://nodei.co/npm/deep-extend/)

Install
-----

	npm install deep-extend

Usage
-----

	var deepExtend = require('deep-extend')();
	var obj1 = {
		a: 1,
		b: 2,
		d: {
			a: 1,
			b: [],
			c: { test1: 123, test2: 321 }
		},
		f: 5,
		g: 123
	};
	var obj2 = {
		b: 3,
		c: 5,
		d: {
			b: { first: 'one', second: 'two' },
			c: { test2: 222 }
		},
		e: { one: 1, two: 2 },
		f: [],
		g: (void 0),
		h: /abc/g,
		f: null
	};

	deepExtend(obj1, obj2);

	console.log(obj1);
	/*
	{ a: 1,
	  b: 3,
	  d:
	   { a: 1,
	     b: { first: 'one', second: 'two' },
	     c: { test1: 123, test2: 222 } },
	  f: null,
	  g: undefined,
	  c: 5,
	  e: { one: 1, two: 2 },
	  h: /abc/g }
	*/

Custom Clone Logic
------------------

The deep-extend module will by default extend all types of objects. But
if you clone a custom object it will no longer be an instance of its
original class. If this is important to you, you can supply a custom cloning
function which you can use to implement your own cloning logic.

It will be called for every value in the object. If you return a falsy
value the default behavior of deep-extend will be used. If you return a
truthy value that value will be used as a replacement for the original
value.

	var Foo = function(val) {
		this.foo = val;
	};
	var Bar = function(val) {
		this.bar = val;
	};

	var cloner = function (obj) {
		// if given an instance of Foo, return a clone of it
		if (obj instanceof Foo) return new Foo(obj.foo);
	};

	var deepExtend = require('deep-extend')(cloner);
	var obj = {
		a: new Foo(1),
		b: new Bar(2)
	};

	var clone = deepExtend({}, obj);

	console.log(clone);
	/*
	{ a: { foo: 1 },
	  b: { bar: 2 } }
	*/
	console.log(clone.a instanceof Foo); // true
	console.log(clone.b instanceof Bar); // false
