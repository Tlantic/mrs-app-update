describe('MRS.U:', function () {
    'use strict';
    
    var validInputData = {
            appVersion: '0.1.0',
            device: {
                os: 'android',
                osVersion: '5.1.0'
            }
        },
        validRequestData = {
            appVersion: '0.1.0',
            os: 'android',
            osVersion: '5.1.0'  
        },
        validResponse = {
            status: 'OK',
            result: {
                latestVersion: '1.0.0',
                valid: true
            }
        },
        validResponseData = {
            latestVersion: '1.0.0',
            valid: true
        };
    
    describe('update service:', function() {
       
       var updateService, window, httpService, httpBackendService, log, rootScope, interval;
       
       beforeEach(module('MRS.App.Update'));
       
       beforeEach(module(function (MRSAppUpdateProvider) {                
            MRSAppUpdateProvider
                .setAppVersion('1.0.0');
       }));
        
        
       beforeEach(inject(function (MRSAppUpdate, $window, $http, $httpBackend, $log, $rootScope, $interval) {
           updateService = MRSAppUpdate;
           httpService = $http;
           httpBackendService = $httpBackend;
           window = $window;
           log = $log;
           rootScope = $rootScope;
           interval = $interval;
           
           spyOn(rootScope, '$broadcast');
       }));
       
       beforeEach(function() {
            httpBackendService.whenPOST('/fake-module-path').respond(200, validResponse);
       });
       
       afterEach(function () {
           httpBackendService.verifyNoOutstandingRequest();
           //httpBackendService.verifyNoOutstandingExpectation();
        });
        
        it('should have a check method', function() {
            expect(updateService.check).toBeDefined();
        });
        
        it('should be already running', function() {
            expect(updateService.isRunning()).toBe(true);
        });
        
        describe('config:', function() {
      
            it('should have app version configured in start', function() {
                // Force to recycle scope
                interval.flush(5);
                httpBackendService.flush();
                rootScope.$digest();
                
                expect(rootScope.$broadcast).toHaveBeenCalled();
            });
             
        });
        
    });
    
    describe('settings adapter: ', function() {
        
        var updateAdapter;
        
        beforeEach(module('MRS.App.Update'));
        
        beforeEach(inject(['MRSAppUpdate.Adapter', function (MRSAppUpdateAdapter) {
            updateAdapter = MRSAppUpdateAdapter;
        }]));
        
        it('should have a check method', function() {
            expect(updateAdapter.check).toBeDefined();
        });
        
        describe('check:', function() {

            it('should have a to method', function() {
                expect(updateAdapter.check.to).toBeDefined();
            });
            /*
            it('should have a from method', function() {
                expect(updateAdapter.check.from).toBeDefined();
            });
            */
            it('to result must be valid', function() {
                var request = updateAdapter.check.to({data: validInputData});
                
                expect(angular.equals(request, {data: validRequestData})).toBe(true);
            });
            
        });
        
        
    });
});