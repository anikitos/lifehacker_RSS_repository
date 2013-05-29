function parse_post(element) {
	var post = new Object();
	post.title = $(element).find("title").text();
	post.tag = $(element).find("category").text();
	post.id = $(element).find("guid").text();
	post.url = $(element).find('link').text();
	post.description = $("<div/>").html($(element).find("description")).text();
	post.img = $('img', post.description)[0].src; //107x60px
	var shorten = 120;
	if (post.title.length > 80) {
		shorten = 70;
	}
	post.description = $.trim($(post.description).text());
	post.description = post.description.substr(0, shorten);
	return post;
}
