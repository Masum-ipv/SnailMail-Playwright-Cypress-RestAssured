package com.revature.SnailMailBE.controllers;

import com.revature.SnailMailBE.models.ChangePasswordDTO;
import com.revature.SnailMailBE.models.User;
import com.revature.SnailMailBE.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController //Make the class a bean, send HTTP responses in JSON format
@RequestMapping("/user") //Set the base URL to /user. Requests will be localhost:8080/user
@CrossOrigin //Allow requests from any origin (like our React FE)
public class UserController {

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<User> getUserInfo() {

        User u = userService.getUser();
        System.out.println("User: " + u);
        //Return the user object
        return ResponseEntity.ok().body(u);
    }

    //change password
    @PatchMapping("/password")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDTO cpwDTO) {

        //Skipping the service layer, but it would do things like make sure both fields are present.
        //as well as checking that the old password is correct. Hardcoding that below.

        //(Assuming the old password is "password"
        if (cpwDTO.getOldPassword().equals("password")) {
            return ResponseEntity.ok().body("Password changed successfully");
        } else {
            return ResponseEntity.status(400).body("Old password is incorrect!");
        }

    }

    //IRL, maybe there would just be a single method to handle any user value updates

    @PutMapping()
    public ResponseEntity<?> updateUserInfo(@RequestBody User user) {
        System.out.println("Request body user: " + user);
        if (user.getUsername().length() < 5 || user.getEmail().length() < 5) {
            return ResponseEntity.status(400).body("Username and email must be at least 5 characters long");
        }
        return ResponseEntity.ok().body(userService.updateUser(user));
    }
}