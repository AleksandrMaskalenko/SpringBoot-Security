package com.springboot.songlibrary.service;

import com.springboot.songlibrary.DAO.AppUserDao;
import com.springboot.songlibrary.DAO.SongDao;
import com.springboot.songlibrary.model.AppUser;
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
    private AppUserDao appUserDao;

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
        AppUser user = appUserDao.findOne(userId);

        songs.addAll(user.getSongList());

        return songs;
    }

    public void addSongPlaylist(int songId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedUsername = auth.getName();
        AppUser user = appUserDao.findOneByUsername(loggedUsername);
        List<Song> songs = new ArrayList<>();

//        AppUser user = appUserDao.findOne(userId);
        songs.addAll(user.getSongList());
        songs.add(songDao.findOne(songId));

        user.setSongList(songs);

        appUserDao.save(user);
    }

    public void deleteSongFromPlaylist(int id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedUsername = auth.getName();
        AppUser user = appUserDao.findOneByUsername(loggedUsername);
        List<Song> songs = new ArrayList<>();

        songs.addAll(user.getSongList());

        for (Song song: songs) {
            if(song.getId() == id) {
                songs.remove(song);
            }
        }

        appUserDao.save(user);
    }

}
