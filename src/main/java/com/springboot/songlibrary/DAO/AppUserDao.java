package com.springboot.songlibrary.DAO;

import com.springboot.songlibrary.model.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppUserDao extends JpaRepository<AppUser, Long> {
	AppUser findOneByUsername(String username);
}
