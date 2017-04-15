package com.springboot.songlibrary.service;

import com.springboot.songlibrary.DAO.UserDao;
import com.springboot.songlibrary.DAO.SongDao;
import com.springboot.songlibrary.model.User;
import com.springboot.songlibrary.model.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
public class SongService {

    @Autowired
    private SongDao songDao;

    @Autowired
    private UserDao userDao;

    public List<Song> listSong() {
        return songDao.findAll();
    }

    public Song getSong(int id) {
        return songDao.findOne(id);
    }

    public void addSong(Song song) {
        songDao.save(song);
    }

    public void deleteSong(int id) {
        songDao.delete(id);
    }

    public void updateSong(Song song, int id) {
        songDao.save(song);
    }

    public List<Song> playlist(Long userId) {

        List<Song> songs = new ArrayList<>();
        User user = userDao.findOne(userId);

        songs.addAll(user.getSongList());

        return songs;
    }

    public void addSongPlaylist(int id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedUsername = auth.getName();
        User user = userDao.findOneByUsername(loggedUsername);

        List<Song> songs = new ArrayList<>();

        songs.addAll(user.getSongList());

        songs.add(songDao.findOne(id));

        user.setSongList(songs);

        userDao.save(user);
    }

    public void deleteSongFromPlaylist(int id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedUsername = auth.getName();
        User user = userDao.findOneByUsername(loggedUsername);

        List<Song> songs = new ArrayList<>();

        songs.addAll(user.getSongList());

        songs.removeIf(s -> s.getId() == id);

        user.setSongList(songs);

        userDao.save(user);
    }

}
