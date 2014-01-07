(function() {
  var Test;

  Test = (function() {
    function Test() {}

    Test.prototype.method = function() {
      return console.log('Yay!');
    };

    return Test;

  })();

}).call(this);
