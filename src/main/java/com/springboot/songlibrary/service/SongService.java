package com.springboot.songlibrary.service;

import com.springboot.songlibrary.DAO.SongDao;
import com.springboot.songlibrary.model.Song;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class SongService {

    @Autowired
    private SongDao songDao;

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
}
