angular.module('myApp').config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/page-not-found');
	$stateProvider.state('nav', {
		abstract : true,
		url : '',
		views : {
			'nav@' : {
				template : 'app/views/nav.html',
				controller : 'NavController'
			}
		}
	}).state('login', {
		parent : 'nav',
		url : '/login',
		views : {
			'content@' : {
				template : 'app/views/login.html',
				controller : 'LoginController'
			}
		}
	}).state('users', {
		parent : 'nav',
		url : '/users',
		data : {
			role : 'ADMIN'
		},
		views : {
			'content@' : {
				template : 'app/views/users.html',
				controller : 'UsersController'
			}
		}
	}).state('home', {
		parent : 'nav',
		url : '/',
		views : {
			'content@' : {
				template : 'app/views/song-main-lib.html',
				controller : 'SongsController'
			}
		}
	}).state('page-not-found', {
		parent : 'nav',
		url : '/page-not-found',
		views : {
			'content@' : {
				template : 'app/views/page-not-found.html',
				controller : 'PageNotFoundController'
			}
		}
	}).state('register', {
		parent : 'nav',
		url : '/register',
		views : {
			'content@' : {
				template : 'app/views/register.html',
				controller : 'RegisterController'
			}
		}
	}).state('details', {
        parent : 'nav',
        url : '/details',
        views : {
            'content@' : {
                template : 'app/views/song-details.html',
                controller : 'SongsController'
            }
        }
    }).state('new-song', {
        parent : 'nav',
        url : '/new_song',
        views : {
            'content@' : {
                template : 'app/views/song-add.html',
                controller : 'AddSongsController'
            }
        }
    }).state('edit', {
        parent : 'nav',
        url : '/edit',
        views : {
            'content@' : {
                template : 'app/views/song-edit.html',
                controller : 'EditSongsController'
            }
        }
    }).state('playlist', {
        parent : 'nav',
        url : '/playlist',
        views : {
            'content@' : {
                template : 'app/views/user-playlist.html',
                controller : 'PlaylistController'
            }
        }
    });
});
