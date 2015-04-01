Template.talk.helpers({
	contacts : function(){
		return _contacts.find().map(function(i){return i.name})
	},
	to: function(){
		return Session.get('contact') ? "<a href='" + Session.get('path') + "'>" + Session.get('contact') + "</a>" : ' '
	}
})
