Handlebars.registerHelper('substr',
	function(string, start, end, l){
		var s = string.substring(start,end);
		if(s.length > 15 && l.length > 0) s += '...'
		return s;
	}
)
