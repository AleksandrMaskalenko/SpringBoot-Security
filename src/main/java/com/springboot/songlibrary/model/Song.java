package com.springboot.songlibrary.model;

import javax.persistence.*;


@Entity
@Table(name = "song")
public class Song {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "song_name")
    private String name;

    @Column(name = "song_author")
    private String author;

    @Column(name = "song_duration")
    private String duration;

    @Column(name = "song_date")
    private String date;

    public Song() {
    }

    public Song(String name, String author, String duration, String date) {
        this.name = name;
        this.author = author;
        this.duration = duration;
        this.date = date;
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

}
