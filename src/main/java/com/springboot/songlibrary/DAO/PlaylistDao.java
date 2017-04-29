package com.springboot.songlibrary.DAO;


import com.springboot.songlibrary.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaylistDao extends JpaRepository<Playlist, Integer> {

}
