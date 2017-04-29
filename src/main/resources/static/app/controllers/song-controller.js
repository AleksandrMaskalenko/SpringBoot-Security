angular.module('myApp')

.controller('SongsController', function ($scope, $http, $rootScope, $timeout, AuthService) {

    $scope.user = AuthService.user;

    $http.get('http://localhost:8080/songs').then(function (response) {
        $rootScope.songs = response.data;
    });

    $http.get('http://localhost:8080/authors').then(function (response) {
        $rootScope.authors = response.data;
    });


    $(document).ready(function() {
        $.fn.select2.defaults.set("minimumResultsForSearch","Infinity");
        $(".select--filter").select2({
            minimumResultsForSearch: 2
        }).on('change',function(){$('.select--filter--value').text($(".select--filter").val());});
        $(".select--no-filter").select2();
    }).on('change',function(){$('.select--no-filter--value').text($(".select--no-filter").val());});


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
        $rootScope.authorid = song.author.id;
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