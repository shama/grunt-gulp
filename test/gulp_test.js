var grunt = require('grunt');

exports.gulp = {
  fileswritten: function(test) {
    test.expect(1);

    var actual = grunt.file.expand({ filter: 'isFile' }, 'tmp/**/*');
    var expected = [
      'tmp/expand/one.js',
      'tmp/expand/two.js',
      'tmp/fn.js',
      'tmp/srcdest.js',
    ];
    test.deepEqual(actual, expected);

    test.done();
  },
  filecontents: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/srcdest.js');
    var expected = grunt.file.read('test/expected/srcdest.js');
    test.equal(actual, expected);

    test.done();
  },
};
