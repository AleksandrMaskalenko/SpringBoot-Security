angular.module('myApp', [ 'ui.router' ])

.config([ '$httpProvider', function($httpProvider) {
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
} ])

.run(function(AuthService, $rootScope, $state) {

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

		if (!AuthService.user  ) {
            $state.go('login');
            event.preventDefault();

			// if (toState.name != 'login' && toState.name != 'register') {
			// 	event.preventDefault();
			//
			// }
		}

	});
});