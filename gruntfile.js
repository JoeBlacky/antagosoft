module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['js/dev/*.js'],
        dest: 'js/script.js'
      },
      distscss: {
        src: ['scss/*.scss'],
        dest: 'scss/main.scss'
      }
    },
    sass: {
      dist: {
        options: {
          sourcemap: 'none',
          style: 'compact'
        },
        files: {
          'css/main.css': 'scss/main.scss'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          'js/<%= pkg.name %>.js' : '<%= concat.dist.dest %>'
        }
      }
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'})
          //require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/dev/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },
    watch: {
      sass: {
        files: ['scss/**/*.scss', 'scss/*.scss'],
        tasks: ['sass']
      },
      js: {
        files: 'js/dev/script.js'
      },
      files: '<%= concat.dist.src %>',
      tasks: ['concat', 'uglify', 'sass']
    }
  });

  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['concat', 'uglify', 'imagemin']);

};