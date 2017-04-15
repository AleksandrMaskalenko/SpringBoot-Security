angular.module('myApp')

.controller('SongsController', function ($scope, $http, $rootScope, AuthService) {

    $scope.user = AuthService.user;

    $scope.loadData = function () {
        $http.get('http://localhost:8080/songs').then(function (response) {
            $scope.songs = response.data;
        });

    };

    $scope.loadData();

    $scope.deleteSong = function (song) {
        var idx = $scope.songs.indexOf(song);
        $http.delete('http://localhost:8080/delete/' + song.id).then($scope.songs.splice(idx, 1));

    };

    $scope.songDetails = function (song) {

        $rootScope.songId = song.id;
        $rootScope.songName = song.name;
        $rootScope.songAuthor = song.author;
        $rootScope.songDuration = song.duration;
        $rootScope.songDate = song.date;
        $rootScope.songAlbum = song.album;
        $rootScope.songImage = song.image;

    };

    $rootScope.addSong = function () {

        var songObj = {
            name: $scope.nameAdd,
            author: $scope.authorAdd,
            duration: $scope.durationAdd,
            date: $scope.dateAdd,
            album: $scope.albumAdd
        };

        $http.post('http://localhost:8080/song/add', songObj);

    };

    $scope.editSong = function (song) {

        $rootScope.idScope = song.id;
        $rootScope.nameScope = song.name;
        $rootScope.authorScope = song.author;
        $rootScope.durationScope = song.duration;
        $rootScope.dateScope = song.date;
    };

    $scope.name = $rootScope.nameScope;
    $scope.author = $rootScope.authorScope;
    $scope.duration = $rootScope.durationScope;
    $scope.date = $rootScope.dateScope;


    $scope.updateSong = function () {

        var songObjUpd = {
            id: $scope.id = $rootScope.idScope,
            name: $scope.name,
            author: $scope.author,
            duration: $scope.duration,
            date: $scope.date
        };

        $http.post('http://localhost:8080/song/add', songObjUpd);

    };

    $scope.addSongPlaylist = function (song) {

        $http.post('http://localhost:8080/playlist/add/' + song.id);
    };

});