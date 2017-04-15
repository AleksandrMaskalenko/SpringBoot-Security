package com.springboot.songlibrary.DAO;


import com.springboot.songlibrary.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface SongDao extends JpaRepository<Song, Integer> {
    List<Song> findAllBy(int userId);



}
