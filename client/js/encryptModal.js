Template.encryptModal.rendered = function() {
  $('.f').bind('submit', function(e) {
    e.preventDefault();
    Meteor.call('sendEncryptedMessage',
      location.pathname.substr(1),
      e.target['t_m'].value,
      e.target['t_p'].value,
      function(evt, r) {
        $('#encryptModal').foundation('reveal', 'close');
        e.target['t_m'].value = '';
        e.target['t_p'].value = '';
      }
    );
    return false;
  })
}
