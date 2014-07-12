module.exports = function(grunt) {
  grunt.initConfig({
    server: {
       port: 3250,
       base: './public'
    },
    uglify: {
      my_target: {
        files: {
          'public/js/main.min.js': ['public/js/main.js']
        }
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "public/css/main.css": "public/css/styles.less",
          "public/components/normalize-css/normalize.min.css": "public/components/normalize-css/normalize.css"
        }
      }
    },
    watch: {
      styles: {
        files: ['public/css/*.less', 'front-app/*' , '*.js'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    },
    bgShell: {
        _defaults: {
          bg: true
        },
        smartcomments: {
            bg: false,
            cmd: 'smartcomments -g --config smartcomments.json'
        },
        yuidoc: {
            cmd: 'yuidoc -c yuidoc.json ./'
        },
        server: {
            cmd: ""
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bg-shell');

  grunt.registerTask('default', ['less', 'bgShell:smartcomments', 'bgShell:yuidoc', 'server', 'watch']);

  grunt.registerTask('server', 'Start a custom web server', function() {
    grunt.log.writeln('Started web server on port 3250');
    require('./server.js').listen(3250);
  });

};