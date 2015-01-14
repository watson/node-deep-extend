var should = require('should');
var Extend = require('../index');

var Foo = function(val) {
	this.foo = val;
};
var Bar = function(val) {
	this.bar = val;
};
var cloner = function(obj) {
	if (obj instanceof Foo) return new Foo(obj.foo);
};

var extend = Extend(cloner);

describe('deep-extend with custom cloner', function() {

	it('can extend on 1 level', function() {
		var obj = {
			a: new Foo(1),
			b: new Bar(2)
		};
		var clone = extend({}, obj);
		clone.should.eql({
			a: { foo: 1 },
			b: { bar: 2 }
		});
		clone.a.should.be.an.instanceof(Foo);
		clone.b.should.not.be.an.instanceof(Bar);
	});

});
