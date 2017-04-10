angular.module('myApp', [ 'ui.router' ])

.config([ '$httpProvider', function($httpProvider) {
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
} ])

.run(function(AuthService, $rootScope, $state) {

	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

		if (!AuthService.user) {

			if (toState.name != 'login' && toState.name != 'register') {
				event.preventDefault();
				$state.go('login');
			}
		} else {

			if (toState.data && toState.data.role) {
				if (toState.data.role != AuthService.user.principal.role) {
					event.preventDefault();
					$state.go('access-denied');
				}
			}
		}
	});
});