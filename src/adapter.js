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