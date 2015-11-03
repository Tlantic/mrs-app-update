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