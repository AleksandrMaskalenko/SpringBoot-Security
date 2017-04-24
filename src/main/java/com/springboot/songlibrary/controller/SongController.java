package com.springboot.songlibrary.controller;

import com.springboot.songlibrary.service.SongService;
import com.springboot.songlibrary.model.Song;
import org.apache.tomcat.util.codec.binary.Base64;
import org.apache.tomcat.util.codec.binary.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@RestController
public class SongController {

    private byte[] bytes;

    private Song downloadSong;

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

        song.setContent(bytes);

        songService.addSong(song);

        bytes = null;
    }

    @RequestMapping(value = "/song/update", method = RequestMethod.POST)
    public void updateSong(@RequestBody Song song) {

        songService.addSong(song);
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public void deleteSong(@PathVariable int id) {
        songService.deleteSong(id);
    }

    @RequestMapping(value = "/download/song/{id}", method = RequestMethod.POST)
    public void findSongForDownload(@PathVariable int id) throws IOException {
        downloadSong = songService.getSong(id);

    }

    @RequestMapping(value = "/downloadSong")
    public HttpEntity<byte[]> downloadSong() throws IOException {

        byte[] fileByte = downloadSong.getContent();

        HttpHeaders header = new HttpHeaders();
        header.setContentType(new MediaType("audio", "mpeg3"));
        header.set("Content-Disposition", "attachment; filename=" + downloadSong.getName() + ".mp3");
        header.setContentLength(fileByte.length);

        return new HttpEntity<byte[]>(fileByte, header);
    }

    @PostMapping("/upload")
    public void singleFileUpload(@RequestParam("file") MultipartFile file) throws IOException {
            bytes = file.getBytes();
    }

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

//    @RequestMapping("/play")
//    public String playSong() {
//        Song song = songService.getSong(3);
//        byte[] fileByte = song.getContent();
//
//        StringBuilder sb = new StringBuilder();
//        sb.append("data:audio/mp3;base64,");
//        sb.append(StringUtils.newStringUtf8(Base64.encodeBase64(fileByte, false)));
//
//        return sb.toString();
//    }
}