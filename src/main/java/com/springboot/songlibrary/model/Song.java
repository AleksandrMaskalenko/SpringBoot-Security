package com.springboot.songlibrary.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String author;
    private String duration;
    private String date;
    private String album;
    private byte[] image;

//    @ManyToMany
////    @JoinTable(name = "playlist", joinColumns = {@JoinColumn(name = "song_id")}, inverseJoinColumns = {@JoinColumn(name = "user_id")})
//    private List<AppUser> appUserList = new ArrayList<>();

    public Song() {
    }

    public Song(String name, String author, String duration, String date, String album, byte[] image) {
        this.name = name;
        this.author = author;
        this.duration = duration;
        this.date = date;
        this.album = album;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getAlbum() {
        return album;
    }

    public void setAlbum(String album) {
        this.album = album;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

//    public List<AppUser> getAppUserList() {
//        return appUserList;
//    }
//
//    public void setAppUserList(List<AppUser> appUserList) {
//        this.appUserList = appUserList;
//    }
}
