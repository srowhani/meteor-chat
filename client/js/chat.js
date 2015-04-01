Template.chat.events({
  'click .encrypted': function(e) {
    var password = prompt('Password');
    if (password === null) return;
    if (password.length === '') return;
    Meteor.call('decryptMessage',
      this.textContent,
      password,
      function(err, res) {
        res = res === undefined ? '' : res;
        if (res.length)
          e.currentTarget.parentElement.innerHTML = res;
        else alert('Incorrect Key')
      });
  }
})

Template.message.rendered = function(){
  var el = document.querySelector('.wrapper') || document.getElementById('chat');
  if(el)
    el.scrollTop = el.scrollHeight;
}

