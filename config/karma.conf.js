module.exports = function (config) {
    config.set({
        basePath: '../',
        logLevel: config.LOG_WARN,
        frameworks: ['jasmine'],
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/mrs-app-clientdetector/dist/mrs-app-clientdetector.js',
            'bower_components/mrs-app-core/dist/mrs-app-core.js',
            'bower_components/mrs-app-device/dist/mrs-app-device.js',
            'src/update.js',
            'src/*.js',
			'test/unit/constants.js',
            'test/unit/test.*.js'
        ],
        exclude: [
        ],
        singleRun: true,
        reportSlowerThan: 500,
        autoWatch: true,
        browsers: ['PhantomJS'],
        reporters: ['dots', 'coverage', 'junit'],
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/*.js': ['coverage']
        },
        junitReporter: {
            outputFile: 'test/result/test-results.xml',
            suite: 'unit'
        },
        coverageReporter: {
            type: 'html',
            dir: 'test/result/coverage/'
        }
    });
};