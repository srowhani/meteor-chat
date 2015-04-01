Template.input.events({
	'keydown #r': function(e) {
		if (e.which == 13) {
			e.preventDefault();
			var el = $('#r');
			var id = window.location.pathname.substr(1);
			var text = el.val()
			var b = {};
			var regx =
				/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
			(regx.exec(el.val()) || []).filter(function(i) {
				for (var j in b)
					if (b.hasOwnProperty(j))
						if (b[j].indexOf(i) > -1) return false
				b[i] = i
				return true;

			}).forEach(function(i) {
				text = text.replace(i, "<a href='" + i + "' target='_blank'>" + i +
					"</a>")
			});

			if (el.val().length || window.attatchments) {
				Meteor.call('sendMessage', id, {
					author: Meteor.user().username,
					textContent: text,
					encrypted: false,
					timestamp: new Date(),
					attatchments: Session.get('filelist') || []
				});
			}
			el.val('');
		}
	}
});

Template.input.helpers({
	disable: function() {
		return Session.get('contact') === '' ? 'disabled' : ''
	}
})
