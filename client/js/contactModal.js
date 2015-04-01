Template.contactModal.rendered = function(){
	$(document).foundation();
	if(Meteor.user())
	Meteor.call('getContacts', function(e,r){
		$('#s').autocomplete({
			source : r.map(function(i){
				if(i.username != Meteor.user().username) return i.username;
				else return ''
			}),
			appendTo : document.getElementById('list')
		}).data("ui-autocomplete")._renderItem = function(ul, item) {

			var listItem = $("<li></li>")
			.data("item.autocomplete top reveal-modal", item)
			.append("<a>" + item.label + "</a>")
			.appendTo(ul);
			ul.addClass('f-dropdown');
			ul.addClass('font');
			return listItem;
		};
	});
	$('input#s').keydown(function(e){
		e = e.originalEvent;
		if(e.which===13){
			if(Meteor.user())
			Meteor.call('getContact', this.value , function(e,reciever){
				var msg  = _messages.find({recieverId : reciever._id});
				if(reciever!=undefined){
					if(msg.count() == 0){
						Meteor.call('createConversation', Meteor.user(), reciever, function(e,r){
							Router.go("/" + r)
						})
					}
					else
						Router.go("/"+msg.fetch()[0]._id)
					this.value=''
					$('#myModal').foundation('reveal', 'close');
			}
		})
	}
})
}
