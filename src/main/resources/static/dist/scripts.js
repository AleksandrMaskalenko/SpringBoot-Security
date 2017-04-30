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
        }

	});
});
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

angular.module('myApp')

    .controller('AddSongsController', function ($scope, $http, $rootScope, $timeout) {

        $(document).ready(function() {
            $.fn.select2.defaults.set("minimumResultsForSearch","Infinity");
            $(".select--filter").select2({
                minimumResultsForSearch: 2
            }).on('change',function(){$('.select--filter--value').text($(".select--filter").val());});
            $(".select--no-filter").select2();
        }).on('change',function(){$('.select--no-filter--value').text($(".select--no-filter").val());});


        $('#file').on('change', function() {
            document.getElementById("form").submit();
        });

        $('#date').mask("9999");
        $('#duration').mask("99:99");

        $scope.addSong = function () {

            if( document.getElementById("file").files.length === 0 ){
                $scope.message = 'Please select file!';
                $timeout(function(){$scope.messageFile = '';}, 3000);

            } else {

                $http.post('http://localhost:8080/song/add', $scope.song).success(function () {
                    $scope.message = "Song added successfully!";
                    $timeout(function(){$scope.message = '';}, 3000);
                    $scope.song.name = '';
                    $scope.song.author = null;
                    $scope.song.duration = '';
                    $scope.song.date = '';
                    $scope.song.album = '';
                    $('#file').val('');
                }).error(function () {
                    $scope.message = "Oops check form please!";
                    $timeout(function(){$scope.message = '';}, 3000);
                });
            }

        };


        $scope.createAuthor = function () {
            $scope.addAuthor = true;
        };

        $scope.create = function () {

            $http.post('http://localhost:8080/author/add', $scope.author).success(function () {
                $scope.message = "Author added successfully!";
                $timeout(function(){$scope.message = '';}, 3000);
                $scope.author.name = '';
                $scope.addAuthor = null;
                $rootScope.loadAuthors();
            }).error(function () {
                $scope.message = "Oops check form please!";
                $timeout(function(){$scope.message = '';}, 3000);
            });
        };

    });
angular.module('myApp')

    .controller('EditSongsController', function ($scope, $http, $rootScope, $timeout) {

        $scope.authorName = $rootScope.authorScope.name;
        $scope.name = $rootScope.nameScope;
        $scope.duration = $rootScope.durationScope;
        $scope.date = $rootScope.dateScope;
        $scope.album = $rootScope.albumScope;


        $(document).ready(function() {
            $.fn.select2.defaults.set("minimumResultsForSearch","Infinity");
            $(".select--filter").select2({
                minimumResultsForSearch: 2
            }).on('change',function(){$('.select--filter--value').text($(".select--filter").val());});
            $(".select--no-filter").select2();
        }).on('change',function(){$('.select--no-filter--value').text($(".select--no-filter").val());});

        $('#date').mask("9999");
        $('#duration').mask("99:99");


        $scope.editAuthor = function () {
            $scope.editAuthorName = true;
        };


        $scope.edit = function () {
            var authorObjUpd = {
                id: $rootScope.authorId,
                name: $scope.authorName
            };

            $http.post('http://localhost:8080/author/add', authorObjUpd).success(function () {
                $scope.message = "Author updated successfully!";
                $timeout(function(){$scope.message = '';}, 3000);
                $scope.editAuthorName = null;
            });
        };


        $scope.updateSong = function () {

            var songObjUpd = {
                id: $rootScope.idScope,
                name: $scope.name,
                author: $scope.author,
                duration: $scope.duration,
                date: $scope.date,
                album: $scope.album,
                content: $rootScope.contentScope
            };

            $http.post('http://localhost:8080/song/add', songObjUpd).success(function () {
                $scope.message = "Song updated successfully!";
                $timeout(function(){$scope.message = '';}, 3000);
            });

        };
    });
angular.module('myApp')

.controller('LoginController', function($http, $scope, $state, AuthService, $rootScope) {

	$scope.login = function() {

		var base64Credential = btoa($scope.username + ':' + $scope.password);

		$http.get('user', {
			headers : {

				'Authorization' : 'Basic ' + base64Credential
			}
		}).success(function(res) {
			$scope.password = null;
			if (res.authenticated) {
				$scope.message = '';

				$http.defaults.headers.common['Authorization'] = 'Basic ' + base64Credential;
				AuthService.user = res;
				$rootScope.$broadcast('LoginSuccessful');
				$state.go('home');
			} else {
				$scope.message = 'Authetication Failed !';
			}
		}).error(function(error) {
			$scope.message = 'Authetication Failed !';
		});
	};

	$scope.logout = function() {

		$http.defaults.headers.common['Authorization'] = null;
		$scope.user = null;
		$scope.message = 'Successfully logged out';
		$scope.resource = null;
	};
});

angular.module('myApp')

.run(function($rootScope) {

})

.controller('NavController', function($http, $scope, AuthService, $state, $rootScope) {
	$scope.$on('LoginSuccessful', function() {
		$scope.user = AuthService.user;
	});
	$scope.$on('LogoutSuccessful', function() {
		$scope.user = null;
	});
	$scope.logout = function() {
		AuthService.user = null;
		$rootScope.$broadcast('LogoutSuccessful');
		$state.go('login');
	};

    $scope.loadData = function () {
        $http.get('http://localhost:8080/songs').then(function (response) {
            $rootScope.songs = response.data;
        });
    };

    $scope.findSong = function () {
        $http.get('http://localhost:8080/find/' + $scope.find).then(function (response) {

            $rootScope.songs = response.data;
        });

        $scope.find = '';
    };
});

angular.module('myApp')

.controller('PageNotFoundController', function($http, $scope, AuthService) {
});

angular.module('myApp')

.controller('PlaylistController', function ($scope, $http, $rootScope, AuthService) {

    $scope.user = AuthService.user;

    $http.get('http://localhost:8080/playlist/' + $scope.user.principal.id).then(function (response) {
        $scope.songs = response.data;
    });



    $scope.deleteSongFromPlaylist = function (song) {
        var idx = $scope.songs.indexOf(song);
        $http.delete('http://localhost:8080/playlist/delete/' + song.id).then($scope.songs.splice(idx, 1));
    };

    // $scope.playSong = function () {
    //     $http.get('http://localhost:8080/play').then(function (responce) {
    //         $scope.songPlay = responce.data;
    //     });
    // };

    $scope.songDetails = function (song) {

        $rootScope.songId = song.id;
        $rootScope.songName = song.name;
        $rootScope.songAuthor = song.author.name;
        $rootScope.songDuration = song.duration;
        $rootScope.songDate = song.date;
        $rootScope.songAlbum = song.album;

    };


});
angular.module('myApp')

.controller('RegisterController', function($http, $scope, AuthService) {
	$scope.submit = function() {
		$http.post('register', $scope.user).success(function(res) {
			$scope.user = null;
			$scope.confirmPassword = null;
			$scope.register.$setPristine();
			$scope.message = "Registration successfull !";
		}).error(function(error) {
			$scope.message = error.message;
		});
	};
});

angular.module('myApp')

.controller('SongsController', function ($scope, $http, $rootScope, $timeout, AuthService) {

    $scope.user = AuthService.user;

    $http.get('http://localhost:8080/songs').then(function (response) {
        $rootScope.songs = response.data;
    });


    $rootScope.loadAuthors = function () {
        $http.get('http://localhost:8080/authors').then(function (response) {
            $rootScope.authors = response.data;
        });
    };

    $rootScope.loadAuthors();

    $scope.deleteSong = function (song) {
        var idx = $scope.songs.indexOf(song);
        $http.delete('http://localhost:8080/delete/' + song.id).success(function () {
            $scope.songs.splice(idx, 1);
            $scope.message = "Song deleted successfully!";
            $timeout(function(){$scope.message = '';}, 3000);
        });
    };

    $scope.songDetails = function (song) {

        $rootScope.songId = song.id;
        $rootScope.songName = song.name;
        $rootScope.songAuthor = song.author.name;
        $rootScope.songDuration = song.duration;
        $rootScope.songDate = song.date;
        $rootScope.songAlbum = song.album;

    };


    $scope.editSong = function (song) {

        $rootScope.idScope = song.id;
        $rootScope.nameScope = song.name;
        $rootScope.authorScope = song.author;
        $rootScope.authorId = song.author.id;
        $rootScope.durationScope = song.duration;
        $rootScope.dateScope = song.date;
        $rootScope.albumScope = song.album;
        $rootScope.contentScope = song.content;
    };


    $scope.addSongPlaylist = function (song) {

        $http.post('http://localhost:8080/playlist/add/' + song.id)
            .success(function () {
            $scope.message = "Song added successfully!";
            $timeout(function(){$scope.message = '';}, 3000);
        })
            .error(function () {
            $scope.message = "This song already in a playlist!";
            $timeout(function(){$scope.message = '';}, 3000);
        });

    };

    $scope.downloadSong = function (song) {

        $http.post('http://localhost:8080/download/song/' + song.id).then(function () {
            document.getElementById("download").submit();
        });

    };

});
angular.module('myApp')

.controller('UsersController', function($http, $scope, AuthService) {
	var edit = false;
	$scope.buttonText = 'Create';
	var init = function() {
		$http.get('api/users').success(function(res) {
			$scope.users = res;
			
			$scope.userForm.$setPristine();
			$scope.message='';
			$scope.user = null;
			$scope.buttonText = 'Create';
			
		}).error(function(error) {
			$scope.message = error.message;
		});
	};
	$scope.initEdit = function(user) {
		edit = true;
		$scope.user = user;
		$scope.message='';
		$scope.buttonText = 'Update';
	};
	$scope.initAddUser = function() {
		edit = false;
		$scope.user = null;
		$scope.userForm.$setPristine();
		$scope.message='';
		$scope.buttonText = 'Create';
	};
	$scope.deleteUser = function(user) {
		$http.delete('api/users/'+user.id).success(function(res) {
			$scope.deleteMessage ="Success!";
			init();
		}).error(function(error) {
			$scope.deleteMessage = error.message;
		});
	};
	var editUser = function(){
		$http.put('api/users', $scope.user).success(function(res) {
			$scope.user = null;
			$scope.confirmPassword = null;
			$scope.userForm.$setPristine();
			$scope.message = "Editing Success";
			init();
		}).error(function(error) {
			$scope.message = error.message;
		});
	};
	var addUser = function(){
		$http.post('api/users', $scope.user).success(function(res) {
			$scope.user = null;
			$scope.confirmPassword = null;
			$scope.userForm.$setPristine();
			$scope.message = "User Created";
			init();
		}).error(function(error) {
			$scope.message = error.message;
		});
	};
	$scope.submit = function() {
		if(edit){
			editUser();
		}else{
			addUser();	
		}
	};
	init();

});

angular.module('myApp')

.service('AuthService', function() {
	return {
		user : null,
        song : null
	}
});
