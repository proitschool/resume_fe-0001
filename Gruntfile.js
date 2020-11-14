module.exports = function(grunt) {

	// Load plugins
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');

	const path = {
		webapp: './webapp',
		app: '.'
	};

	// Project configuration.
	grunt.initConfig({
		exec: {
			build_frontend: {
				cwd: './webapp',
				cmd: 'npx webpack --config webpack.config.prod.js'
			}
		},
		clean: {
			backend_static: [`${path.app}/static`],
			frontend_dist: [`${path.webapp}/dist`],
			frontend_tmp: [`${path.webapp}/tmp`]
		},
		copy: {
			dist_to_static: {
				expand: true,
				cwd: `${path.webapp}/dist`,
				src: `**/*`,
				dest: `${path.app}/static/`
			}
		}
	});

	// Tasks.
	grunt.registerTask('default', [
		'clean:backend_static',
		'clean:frontend_dist',
		'exec:build_frontend',
		'clean:frontend_tmp',
		'copy:dist_to_static'
	]);
};
