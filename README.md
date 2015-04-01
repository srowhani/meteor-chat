meteor-chat
===========

This is an independent project done for Professor Anil Somayaji for COMP2406 - Web Development

It showcases the framework Meteor, and how powerful it can truly be.

##Dependencies
 - Iron Router
 - gadicohen:reactive-window
 - Foundation
 - Meteor-Platform

This app works on the following premise. There exists two databases.

- Users
- Conversations

Conversations include two unique user ID's. The sender, and the reciever. Using MongoDB's quick ability to
grab a cursor of matching elements of a query, if a client is either a sender, or reciever they will have 
access to their part of the database.

##Demo

A working demo can be found on:

https://seena.meteor.com/chat