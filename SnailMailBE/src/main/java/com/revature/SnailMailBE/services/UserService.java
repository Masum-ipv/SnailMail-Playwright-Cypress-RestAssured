package com.revature.SnailMailBE.services;

import com.revature.SnailMailBE.models.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    //Instantiate the User to send back (hardcoded)
    User user = new User(
            "SnailMailGuy",
            "me@snailmail.com",
            "password",
            "user");

    public User getUser() {
        return user;
    }

    public User updateUser(User user) {
        this.user = user;
        return user;
    }
}
