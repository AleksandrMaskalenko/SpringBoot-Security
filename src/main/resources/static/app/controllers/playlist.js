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




});