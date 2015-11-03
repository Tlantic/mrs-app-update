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
        
        // Run this when starting
        if ($config.check && $config.check.autoStart && $config.check.interval) {
            this.startChecking($config.check.interval);
        }
        
        return {
            /**
             * Start monitoring for update versions.
             * When an invalid version is found, 
             *  
             * @method start
             * @public
             * @param {int} interval the interval time delay to check for updates
             */
            start: self.startChecking,
            
            /**
             * Check for updates on server.
             * 
             * @method check
             * @public
             * @return {object} object with valid property and latest version 
             */
            check: self.checkForUpdates,
            
            /**
             * Tells if the background service for checking is running.
             * 
             * @method isRunning
             * @public
             */
            isRunning: self.isRunning
        };
    }];
    
});