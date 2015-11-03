/*global angular*/

/**
 * The 'MRS.App.Update' module provides remote check for .
 * @module MRS.App.Update
 * @requires MRS.App.Core
 * @beta
 **/
angular.module('MRS.App.Update', ['MRS.App.Core', 'MRS.App.Helper', 'MRS.App.Device'])

.config(['$mrsappupdateConfig', function (config) {
    'use strict';
    
    var defaultConfig = {
        DEBUG: false,
        check: {
            autoStart: true,
            interval: 6 * 60 * 60 * 1000
        },
        endpoints: {
            check: {
                method: 'POST',
                cache: true,
                timestamp: 6 * 60 * 60 * 1000
            }
        }
    };

    // merge config with default
    var mergedConfig = angular.merge({}, defaultConfig, config);
    angular.merge(config, mergedConfig);
}]);