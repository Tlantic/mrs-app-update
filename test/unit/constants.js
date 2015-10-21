/**
    Set of constants focused on MRS.Core automated tests
**/
angular.module("MRS.App.Core").constant("$mrsappcoreConfig", {
	
});

angular.module("MRS.App.Helper").constant("$mrsapphelperConfig", {
	
});

angular.module("MRS.App.Device").constant("$mrsappdeviceConfig", {
	
});

angular.module("MRS.App.Update").constant("$mrsappupdateConfig", {
	"module": "MRS.App.Update",
	"check": {
		"interval": 1
	},
	"endpoints": {
		"_default": {},
		"check": {
			"url": "/fake-module-path"
		}
	}
});