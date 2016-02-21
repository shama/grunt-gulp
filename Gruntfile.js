/*
 * grunt-gulp
 * https://github.com/shama/grunt-gulp
 *
 * Copyright (c) 2016 Kyle Robinson Young
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  var coffee = require('gulp-coffee');
  var concat = require('gulp-concat');
  var gulp = require('gulp');

  grunt.initConfig({
    gulp: {
      // Grunt src->dest config with gulp tasks
      srcdest: {
        options: {
          tasks: function(stream) {
            return stream.pipe(coffee());
          }
        },
        src: ['test/fixtures/*.coffee'],
        dest: 'tmp/srcdest.js',
      },
      // Grunt expand mapping
      expand: {
        expand: true,
        cwd: 'test/fixtures/',
        src: '*.js',
        dest: 'tmp/expand',
      },
      // Or bypass everything while still integrating gulp
      fn: function() {
        var dest = gulp.dest('tmp/');
        dest.on('end', function() {
          grunt.log.ok('Created tmp/fn.js');
        });
        return gulp.src('test/fixtures/*.coffee')
          .pipe(coffee())
          .pipe(concat('fn.js'))
          .pipe(dest);
      },
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    clean: {
      tmp: 'tmp',
    },

    nodeunit: {
      tests: ['test/*_test.js'],
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['clean', 'gulp', 'nodeunit']);
  grunt.registerTask('default', ['jshint']);
};
