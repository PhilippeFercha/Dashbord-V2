module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

	    sass: {
	    	app: {
				files: [{
	          		expand: true,
	          		cwd: 'scss',
	          		src: ['*.scss'],
	          		dest: 'css',
	          		ext: '.css'
	        	}]
	      	},
	      	options: {
        		sourceMap: false
      		}
	    },

	    postcss: {
	      	options: {
	        	processors: [
	          		require('autoprefixer')({
	          			browsers: ['ie >= 11']
	          		}),
	          		require('cssnano')({
	          			calc: {
	          				precision: 2
	          			},
	          			discardComments: {
                    		removeAll: true,
                		},
	          		}),
	          		require("css-mqpacker")()
	        	]
	      	},

	      	dist: {
	        	src: 'css/screen.css',
	        	dest: 'css/screen.min.css'
	      	}
	    },

	    concat: {
	      	dist: {
      			files : {
      				'js/app.js': [
      					'js/main.js',
      					'js/components/*.js',
      					'!**/app.js',
      					'!**/vendor.js',
      					'!**/plugins.js'
      				],

      				'js/vendor.js': [
      					'js/vendor/modernizr-2.8.3.min.js',
      					'js/plugins.js',
      					'js/vendor/jquery-3.3.1.min.js',
      					'js/vendor/jquery-ui.min.js',
      					'js/vendor/jquery-migrate-3.0.0.min.js',
      					'js/vendor/jquery.selectric.min.js',
      					'js/vendor/parsley.min.js',
      					'js/i18n/parsley-fr.js'
      				],

      				'css/vendor.css': [
      					'scss/vendor/selectric.css',
      					'scss/vendor/jquery-ui.css'
      				]
      			}
    		}
	    },

	    jshint: {
	    	files: [
	        	'js/components/*.js',
	        	'js/main.js',
	      	],
	      	options: {
	        	scripturl: true,
	        	globals: { jQuery: true }
	      	}
	    },

	    uglify: {
	    	options: {
	    		mangle: false,
	        	compress: true
	      	},
	      	dist: {
			    files : {
			        'js/app.min.js' : [
			          'js/app.js'
			        ],

			        'js/vendor.min.js' : [
			          'js/vendor.js'
			        ]
			    }
	      	}
	    },

		sassdoc: {
	    	default: {
	      		src: 'scss/partials/*.scss'
	    	},
	  	},

	    watch: {
	    	js:{
	        	files: [
					'js/*.js',
					'js/components/*.js'
				],
	        	tasks: ['jshint','concat', 'uglify'],
	        	options: { spawn: false }
	     	},
			sass: {
				files: [
					'scss/*.scss',
					'scss/*/*.scss',
					'scss/*/*/*.scss',
					'scss/*/*/*/*.scss',
					'scss/*/*/*/*/*.scss'
				],
				tasks: ['sass', 'postcss'],
				options: { spawn: false }
			},
	    },
	});

  	require('load-grunt-tasks')(grunt);

  	grunt.registerTask('default', ['jshint','uglify']);
	grunt.registerTask('generatedoc', ['sassdoc']);
};