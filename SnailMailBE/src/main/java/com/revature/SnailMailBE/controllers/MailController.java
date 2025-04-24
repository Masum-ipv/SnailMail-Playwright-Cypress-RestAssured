package com.revature.SnailMailBE.controllers;

import com.revature.SnailMailBE.models.Mail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Remember the 3 annotations that we include for a Spring MVC Controller:
@RestController //Makes the Class a Bean, and turns response data into JSON
@RequestMapping("/mail") //Sets the base URL to reach this controller (it'll be http://localhost:8080/mail)
@CrossOrigin //Allows requests from any origin (this will let our FE/BE communicate)
public class MailController {

    //This method sends a user's inbox back to them (a List of Mail objects)
    @GetMapping
    public ResponseEntity<List<Mail>> getInbox(){

        //In a real app, this would send a request to the database to get the user's inbox mail records
        //For now, we'll return a hardcoded list of Mail
        List<Mail> inbox = List.of(
                new Mail("snail@snailmail.com", "Hey", "me@snailmail.com", "I am a snail"),
                new Mail("snail@snailmail.com", "Hey", "me@snailmail.com", "I have a shell"),
                new Mail("slug@snailmail.com", "Hey", "me@snailmail.com", "I am a slug"),
                new Mail("clam@snailmail.com", "Hey", "me@snailmail.com", "...")
        );

        //Easily configure and return an HTTP response thanks to ResponseEntity
        //200 level status code, and inbox as the response body
        return ResponseEntity.ok().body(inbox);

    }

    //This method will take in a Mail object and send a (fake) email
    @PostMapping
    public ResponseEntity<Mail> sendMail(@RequestBody Mail mail) {

        //Error handling to make sure it's valid mail (just a couple, to get the idea)
        if(mail.getRecipient() == null || mail.getRecipient().isBlank()){
            //400 level status code, and empty response body
            return ResponseEntity.badRequest().body(null);
        }
        //TODO: check the other fields, and stuff like is the email address is valid

        //In a real app, we'd send this deeper into the app to hit the database

        //For now, we'll just return the mail to the user
        return ResponseEntity.ok().body(mail);

    }

}