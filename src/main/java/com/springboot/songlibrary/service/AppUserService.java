package com.springboot.songlibrary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.springboot.songlibrary.model.AppUser;
import com.springboot.songlibrary.DAO.AppUserDao;


@Service
public class AppUserService implements UserDetailsService {

	@Autowired
    AppUserDao appUserDao;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		AppUser appUser = appUserDao.findOneByUsername(username);
		return appUser;
	}

}
