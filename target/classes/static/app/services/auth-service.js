angular.module('myApp')

.service('AuthService', function() {
	return {
		user : null
	}
});

// (function (module) {
//
//     var fileReader = function ($q, $log) {
//
//         var readAsDataURL = function (file, scope) {
//             var deferred = $q.defer();
//
//             var reader = getReader(deferred, scope);
//             reader.readAsDataURL(file);
//
//             return deferred.promise;
//         };
//
//         return {
//             readAsDataUrl: readAsDataURL
//         };
//     };
//
//     module.factory("fileReader",
//         ["$q", "$log", fileReader]);
//
// }(angular.module("myApp")));
