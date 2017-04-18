package com.springboot.songlibrary.controller;

import com.springboot.songlibrary.service.SongService;
import com.springboot.songlibrary.model.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
public class SongController {

//    private static byte[] bytes;

    @Autowired
    private SongService songService;

    @RequestMapping("/songs")
    public List<Song> getAllSongs() {
        return songService.listSong();
    }

    @RequestMapping(value = "/song/{id}")
    public Song getSong(@PathVariable int id) {
        return songService.getSong(id);
    }

    @RequestMapping(value = "/song/add", method = RequestMethod.POST)
    public void addSong(@RequestBody Song song) {

//        song.setImage(bytes);

        songService.addSong(song);
    }

    @RequestMapping(value = "/song/update", method = RequestMethod.POST)
    public void updateSong(@RequestBody Song song) {

        songService.addSong(song);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void deleteSong(@PathVariable int id) {
        songService.deleteSong(id);
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public void updateSong(@RequestBody Song song, @PathVariable int id) {
        songService.updateSong(song, id);
    }

//    @PostMapping("/upload")
//    public void singleFileUpload(@RequestParam("file") MultipartFile file) {
//        try {
//            bytes = file.getBytes();
//
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

    @RequestMapping("/playlist/{id}")
    public List<Song> loadPlaylist(@PathVariable Long id) {
        return songService.playlist(id);
    }

    @RequestMapping(value = "/playlist/add/{id}", method = RequestMethod.POST)
    public void addSongPlaylist(@PathVariable int id) {
        songService.addSongPlaylist(id);
    }

    @RequestMapping(value = "/playlist/delete/{id}", method = RequestMethod.DELETE)
    public void deleteSongFromPlaylist(@PathVariable int id) {
        songService.deleteSongFromPlaylist(id);
    }

    @RequestMapping("/find/{name}")
    public List<Song> findSongsByName(@PathVariable String name) {
        return songService.findSongByName(name);
    }
}

