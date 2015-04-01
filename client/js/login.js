Template.login.events({

  'submit form' : function(e){
    e.preventDefault();
    'use strict';
    var el = {
      user : $('#user').val(),
      pass : $('#pass').val()
    }
    Meteor.loginWithPassword(el.user, el.pass, function(err){
      if(err) {
        $('#err').html(
          $("<div data-alert class='alert-box secondary'>"
          .concat(err.reason)
          .concat("<a href='#' onclick='$(this).parent().remove()' class='close'>&times;</a>")
          .concat("</div>")
          )
        )
      }
      else location.reload();
    })
  },
  'click #createUser' : function(e){
    var el = {
      user : $('#user').val(),
      pass : $('#pass').val()
    }
    Accounts.createUser({
      username : el.user,
      password : el.pass
    }, function(err){
      if(err) {
        $('#err').html(
          $("<div data-alert class='alert-box secondary'>"
          .concat(err.reason)
          .concat("<a href='#' onclick='$(this).parent().remove()' class='close'>&times;</a>")
          .concat("</div>")
          )
        )
      }
      else location.reload()
    });
  }
});
Template.login.helpers({
  reason : function(){

  }
})
