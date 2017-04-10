package com.springboot.songlibrary.DAO;


import com.springboot.songlibrary.model.Song;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SongDao extends JpaRepository<Song, Integer> {

}
