Meteor.methods({
	sendMessage : function(id, msg){
		var c = _messages.findOne({_id : id});
		if(!c) return;
		var m = c.messages;
		m.push(msg);
		_messages.update({_id : id}, {$set : {messages : m}})
	},
	createConversation : function(sender, reciever){
		return _messages.insert({
								senderId: sender._id,
								recieverId : reciever._id,
								senderName : sender.username,
								recieverName : reciever.username,
								messages : [],
								isRead : false,
								created : new Date()
							});
	},
	getContacts : function(){
		return Meteor.users.find({}).fetch()
	},
	getContact  : function(val){
		return Meteor.users.findOne({ username : val });
	},
	sendEncryptedMessage : function(id,msg,pass){
		var encrypted = CryptoJS.AES.encrypt(msg, pass).toString();

		var c = _messages.findOne({_id : id});
		if(!c) return false;
		var m = c.messages;
		m.push({
			author: Meteor.user().username,
			textContent: encrypted,
			encrypted : true,
			timestamp: new Date(),
			attatchments: []
		});
		_messages.update({_id : id}, {$set : {messages : m}})

	},
	decryptMessage : function(enc, pass){
		return CryptoJS.AES.decrypt(enc, pass).toString(CryptoJS.enc.Utf8) || '';
	}

})

Meteor.publish('messages', function(){
	var me = this.userId;
	return _messages.find({
			$or : [ {senderId : me}, {recieverId : me}]
		});
})
