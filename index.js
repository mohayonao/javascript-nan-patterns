var assert;
if (typeof require !== "undefined") {
  assert = require("chai").assert;
} else {
  assert = chai.assert;
}
assert.isNaN = function(value, message) {
  assert(isNaN(value), message);
};
assert.isNotNaN = function(value, message) {
  assert(!isNaN(value), message);
};

describe("JavaScript NaN Patterns", function() {
  it("NaN Literal", function() {
    assert.isNaN( NaN );
  });
  it("The casts of an non-numeric object", function() {
    assert.isNaN( + /non-numeric object/ );
    assert.isNaN( parseFloat("non-numeric") );
    
    assert.isNotNaN( + new Date() );
  });
  it("The additions inf + -inf", function() {
    assert.isNaN( +Infinity + -Infinity );
    assert.isNaN( -Infinity + +Infinity );
    
    assert.isNotNaN( +Infinity + +Infinity ); // +Infinity
    assert.isNotNaN( -Infinity + -Infinity ); // -Infinity
  });
  it("The subtractions inf - inf", function() {
    assert.isNaN( +Infinity - +Infinity );
    assert.isNaN( -Infinity - -Infinity );
    
    assert.isNotNaN( +Infinity - -Infinity ); // +Infinity
    assert.isNotNaN( -Infinity - +Infinity ); // -Infinity
  });
  it("The multiplications 0 * inf", function() {
    assert.isNaN( 0 * Infinity );
    assert.isNaN( Infinity * 0 );
  });
  it("The divisions 0 / 0", function() {
    assert.isNaN( 0 / 0 );
  });
  it("The divisions inf / inf", function() {
    assert.isNaN( Infinity / Infinity );
  });
  it("The remainders x % 0", function() {
    assert.isNaN( 1 % 0 );
    assert.isNaN( 0 % 0 );
  });
  it("The remainders Infinity % x", function() {
    assert.isNaN( Infinity % 1 );
    assert.isNaN( Infinity % 0 );
    assert.isNaN( Infinity % Infinity );
  });
  it("The square root of a negative number", function() {
    assert.isNaN( Math.sqrt(-0.000001) );
    assert.isNaN( Math.sqrt(-Infinity) );
    
    assert.isNotNaN( Math.sqrt(+Infinity) );
    assert.isNotNaN( Math.sqrt(+0.000001) );
    assert.isNotNaN( Math.sqrt(0) );
  });
  it("The logarithm of a negative number", function() {    
    assert.isNaN( Math.log(-0.000001) );
    assert.isNaN( Math.log(-Infinity) );
    
    assert.isNotNaN( Math.log(+Infinity) ); // Infinity
    assert.isNotNaN( Math.log(+0.000001) );
    assert.isNotNaN( Math.log(0));          // -Infinity
  });
  it("The inverse sine or cosine of a number that is less than −1 or greater than +1", function() {
    assert.isNaN( Math.asin(+Infinity) );
    assert.isNaN( Math.asin(+1.000001) );
    assert.isNotNaN( Math.asin(+1.000) );
    assert.isNotNaN( Math.asin(0)      );
    assert.isNotNaN( Math.asin(-1.000) );
    assert.isNaN( Math.asin(-1.000001) );
    assert.isNaN( Math.asin(-Infinity) );

    assert.isNaN( Math.acos(+Infinity) );
    assert.isNaN( Math.acos(+1.000001) );
    assert.isNaN( Math.acos(-1.000001) );
    assert.isNotNaN( Math.acos(+1.000) );
    assert.isNotNaN( Math.acos(0)      );
    assert.isNotNaN( Math.acos(-1.000) );
    assert.isNaN( Math.acos(-Infinity) );
  });
  it("The trigonometric functions of an infinite number", function() {
    assert.isNaN( Math.sin(+Infinity) );
    assert.isNaN( Math.sin(-Infinity) );
    assert.isNaN( Math.cos(+Infinity) );
    assert.isNaN( Math.cos(-Infinity) );
    assert.isNaN( Math.tan(+Infinity) );
    assert.isNaN( Math.tan(-Infinity) );
  });
  it("The non-integer power of a negative number", function() {
    assert.isNaN( Math.pow(-1, 0.1) );
    
    assert.isNotNaN( Math.pow(-Infinity, 0.1) ); // Infinity
    assert.isNotNaN( Math.pow(-1, 1.0) );
  });
  it("The case of via Float32Array", function() {
    var a = 1e40;
    var b = new Float32Array([a])[0]; // b is an Infinity
    
    assert.isNotNaN( 0 * a );
    assert.isNaN( 0 * b );
  });

});
