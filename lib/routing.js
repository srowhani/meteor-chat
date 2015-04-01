Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'spinner',
  waitOn: function() {
    document.title = 'meteor-chat';
    return Meteor.subscribe('messages');
  }
})

Router.map(function() {
  this.route('layout', {
    path:'/', 
    onBeforeAction: function(){
      Router.go('/chat');
    }
  })
  this.route('main', {
    path: '/:_id',
    data: function() {
      var self = this;
      return {
        messages: function() {
          if (self.params._id)
            if (_messages.findOne({
                _id: self.params._id
              }))
              return _messages.findOne({
                _id: self.params._id
              }).messages.map(function(i) {
                i.bubble = i.author == Meteor.user().username ?
                  'bubble1' : 'bubble2';
                return i;
              })
        },
        user: Meteor.user()
      }
    }
  })

})


Router.onAfterAction(function() {
  var m = _messages.find({
    _id: this.params._id
  }).fetch()[0];
  if (!m) {
    $('.selected').removeClass('selected');
    Session.set('contact', '');
    return;
  }
  m = m.recieverName === Meteor.user().username ? m.senderName : m.recieverName;
  document.title = 'Chat with ' + m;
  Session.set('contact', m)
  Session.set('path', this.params._id)
});
