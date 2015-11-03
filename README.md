# MRS App Update

MRS App Update module is intended to provide simple tools to check if your App is up to date.

It's designed to work with MRS.App.Core and Tlantic Kernel.

## How to compile
Execute this command in the command line:
```
$ npm install
```
You're done! Simple, eh?

## How to develop
Compile is very simple. Just execute in command line:
```
$ grunt
```
Your code will be tested, compiled and minified into *dist* folder

## How to install
1. Include in your code (js or min.js) in index.html (included in *dist* folder)
```JavaScript
<script type="text/javascript" src="mrs-app-update.min.js"></script>
```
2. Include angular dependency in your module declaration
```JavaScript
angular.module("MyApp", ["MRS.App.Core", "MRS.App.Device", "MRS.App.Update"]);
```
3. Configure your configuration file (see *config/module.conf.json*)
```JavaScript
angular.module("MRS.App.Update").constant("$mrsappupdateConfig", {
	<your configuration here>
});
```


## How to use
This module is available by service.


### API

#### MRSAppUpdate
```JavaScript
angular.module("MyApp").controller("MyController", function(MRSAppUpdate) {
    // your code here
});
```

##### start(interval)
Params:
- interval: integer for update interval (in milliseconds)

Start checking for version updates. If there are any proccess already running, stop and starts the new one.

When an invalid version is found, broadcast a new event.


###### Example
```JavaScript
MRSAppSettings.start(); // will fetch server with default values

$rootScope.$on('MRS_APP_UPDATE.onInvalidVersion', function(latestVersion) {
	// do something
});
```



##### check()
Check for an update. Returns an object with latest version and a flag if this version is valid or not.

###### Example
```JavaScript
MRSAppSettings.check().then(function(result) {
	console.log(result.valid);
	console.log(result.latestVersion);
});
```