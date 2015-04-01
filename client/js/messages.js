Template.messages.helpers({
  conversation: function() {
    var _c = 0
    result = _messages.find({}).map(function(i) {
      var n = i.senderId === Meteor.userId() ? i.recieverName : i.senderName
      return {
        name: n,
        count: i.messages.length,
        countStr: i.messages.length > 1 ?
          '' + i.messages.length + ' Messages' : '1 Message',
        repr: i.messages[i.messages.length - 1] ?
          i.messages[i.messages.length - 1].textContent.substring(0,
            15) + '...' : '',
        date: i.created,
        read: i.isRead || !this.count,
        messages: i.messages,
        _id: i._id,
        selected: Session.get('path') == i._id ? 'selected' : ''
      }

    })
    return _.sortBy(result, function(i) { //amortized O(logn)
      return i.date;
    }).map(function(i) {
      i.tabIndex = ++_c
      return i;
    })
  }
});

Template.messages.events({
  'click div': function(e) {
    $(".selected").removeClass('selected');
    $(e.currentTarget).addClass('selected');
    Router.go('/'.concat(this._id));
  },
  'keydown': function(e) {
    if (e.which === 38) {
      var selected = $('.selected');
      if (selected && selected.prev().hasClass('message')) {
        Router.go('/'.concat(selected.prev()[0].dataset['id']))

      }
    } else if (e.which === 40) {
      var selected = $('.selected');
      if (selected && selected.next().hasClass('message')) {
        Router.go('/'.concat(selected.next()[0].dataset['id']))
      }
    }
  }
})
