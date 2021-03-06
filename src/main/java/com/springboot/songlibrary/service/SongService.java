package com.springboot.songlibrary.service;

import com.springboot.songlibrary.DAO.PlaylistDao;
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

    @Autowired
    private PlaylistDao playlistDao;

    private List<Song> songs;
    private User user;

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
        if (playlistDao.findOne(id) != null) {
            playlistDao.delete(id);
        }

        songDao.delete(id);
    }

    public List<Song> playlist(Long userId) {

        List<Song> songs = new ArrayList<>();
        User user = userDao.findOne(userId);

        songs.addAll(user.getSongList());

        return songs;
    }

    public void addSongPlaylist(int id) throws Exception {
        authentication();

        for (Song song: songs) {
            if (song.getId() == id) {

                throw new RuntimeException("This song already in a playlist");
            }
        }
        songs.add(songDao.findOne(id));

        saveUser();
    }

    public void deleteSongFromPlaylist(int id) {
        authentication();

        songs.removeIf(s -> s.getId() == id);

        saveUser();
    }

    public List<Song> findSongByName(String name) {
        return songDao.findSongsByName(name);
    }

    private void authentication() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedUsername = auth.getName();
        user = userDao.findOneByUsername(loggedUsername);
        songs = new ArrayList<>();
        songs.addAll(user.getSongList());
    }

    private void saveUser() {
        user.setSongList(songs);
        userDao.save(user);
    }

}
