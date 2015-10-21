/*! mrs-app-update - v1.0.0 - 2015-10-21 10:09:47 GMT */
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
/**
 * The Update adapter is responsible for parsing requests to/from server.
 * 
 * @class MRSAppUpdate.Adapter
 * @namespace MRS.App.Update
 * @since 1.0.0
**/
angular.module('MRS.App.Update').service('MRSAppUpdate.Adapter', [
    function mrsAppUpdateAdapter() {
        
    'use strict';
    
    this.check = {
        
        to: function checkTo(request) {
            
            request.data = {
                os: request.data.device.os,
                osVersion: request.data.device.osVersion,
                appVersion: request.data.appVersion
            };
            
            return request;
        }
        
    };
    
}]);
/**
 * The Update service is responsible for all business logic of this module.
 * 
 * @class MRSAppUpdate
 * @namespace MRS.App.Update
 * @since 1.0.0
 **/
angular.module('MRS.App.Update').provider('MRSAppUpdate', function() {
    'use strict';
    
    // local variables
    var _updateEvent = 'MRS_APP_UPDATE.onUpdateAvailable',
        _checkPromise;
        
    var _appVersion;
    var _device;
    
    /**
     * Provider methods
     */
    
    /**
     * @method setAppVersion
     * @public
     * @param {string} appVersion
     */
    this.setAppVersion = function(appVersion) {
        _appVersion = appVersion;
    };
    
    
    /**
     * Public
     */
    
    this.$get = ['$mrsappupdateConfig', '$log', '$interval', 'MRSAppUpdate.Service', 'MRSAppDevice', 'eventPublisher',
    function mrsAppUpdateService($config, $log, $interval, $service, $device, $events) {
        
        var self = this;
        
        this.startChecking = function startChecking(interval) {
            // don't start to watch again if there is one already running
            if (_checkPromise) {
                $interval.cancel(_checkPromise);
                _checkPromise = undefined;
            }
            
            // callback
            function intervalWrapper() {
                self.checkForUpdates().then(function onCheckComplete(result) {
                    if (result) {
                        $events.publish(_updateEvent);   
                    }
                });
            }
            
            // create a new interval for checking
            _checkPromise = $interval(intervalWrapper, interval);
        };
        
        this.checkForUpdates = function checkForUpdates() {
            // get device from device module
            if (!_device) {
                _device = $device.getLocalDeviceInformation();
            }
            
            function onSuccess(result) {
                // parse result
                return result;
            }
            
            function onError(err) {
                throw err;
            }
            
            return $service.check({
                device: _device,
                appVersion: _appVersion})
                .then(onSuccess).catch(onError);
        };
        
        this.isRunning = function isRunning() {
            return _checkPromise !== undefined;
        };
        
        if ($config.check && $config.check.autoStart && $config.check.interval) {
            this.startChecking($config.check.interval);
        }
        
        return {
            start: self.startChecking,
            check: self.checkForUpdates,
            isRunning: self.isRunning
        };
    }];
    
});
/**
 * The Update service is responsible for loading setting files from server.
 * 
 * @class MRSAppUpdate.Service
 * @namespace MRS.App.Update
 * @since 1.0.0
 **/
angular.module('MRS.App.Update').factory('MRSAppUpdate.Service', ['$mrsappupdateConfig', 'MRSAppHelper.Service', 'MRSAppUpdate.Adapter',
    function mrsAppUpdateService($config, $serviceHelpers, $adapter) {
    
    'use strict';
    
    return $serviceHelpers.serviceBuilderWithDefaultConvention(
        $adapter,
        $config.endpoints,
        [
            /**
             * Check if there is any update for this App
             * @method check
             * @public
             * @param
             * @return {}
             */
            'check'
        ]);
    
}]);