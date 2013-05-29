function fetch_feed() {
 
	var req = new XMLHttpRequest();
	req.open("GET", 'http://feeds.gawker.com/lifehacker/full', true);
	req.onload = display_stories.bind(this);
	req.send(null);
	/*
		chrome.extension.sendRequest({'action' : 'fetch_feed', 'url' : 'http://feeds.gawker.com/lifehacker/full'}, 
			function(response) {
				display_stories(response);
			}
		);
	*/
}

function display_stories(feed_data) {

    var xml_doc = feed_data.target.responseXML;
	$xml = $(xml_doc);
    var items = $xml.find("item");
    $('#popup').html('<img src="images/logo.png" id="logo" onclick="open_item(\'http://lifehacker.com/\'); window.close();" /><br clear="all" />');
	//console.log(items[0]);
    items.each(function(index, element) {
        var post = parse_post(element);
        var item = '';
        var class2 = '';
        if (index >= localStorage['unread_count']) {
            item += '<div class="post read">';
        }
        else {
            item += '<div class="post">'
        }
        item += "<span class=\"tag\">" + post.tag + "</span>\n" +
                "\n" +
                "<div id=\"" + post.id + "\" class=\"item\"    >\n"+    //onclick=\"open_item(\'" + post.url + "\')\">\n" +
                "<img src=\"" + post.img + "\" width=\"107\" height=\"60\" />\n" +
                "<a href=\"" + post.url + "\" target=\"_blank\"><h4>" + post.title + "</h4></a>\n" +
                "<span class=\"description\">" + post.description + "...</span>\n" +
                "</div>\n" +
                "\n";
        item += "</div>";
		//console.log(item);
        $('#popup').append(item);
    });
}
