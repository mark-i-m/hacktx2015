var drives = {
	"GD": { "name" : "Google Drive", "color" : "F44336", "url" : "googledrive", "icon": "GD.png"},
	"OD": { "name" : "One Drive", "color" : "094AB2", "url" : "onedrive", "icon": "OD.png"},
	"DB": { "name" : "Dropbox", "color" : "007EE5", "url" : "dropbox", "icon": "DB.png"}
}, box;

$(window).ready(function() {
	newBox();
	$(".new").click(function() {
		$("").append(newBox());
	});
	$(window).on('resize', function() {
		$('.drive, .item').each(function() {
			$(this).height($(this).width());
		})
	}).trigger('resize'); 
});

var json = {
	"cats.txt" : {"type" : "txt",
			"size"  : "100",
			"date" : "26 September 2015"},
	"dogs.doc" : {"type" : "txt",
			"size"  : "100",
			"date" : "26 September 2015"},
	"birds" : {"type" : "folder",
			"size"  : "200",
			"date" : "26 September 2015"},
	"frogs.png" : {"type" : "img",
			"size"  : "100",
		 	"date" : "26 September 2015"},
	"squirrels.jpg" : {"type" : "img",
			"size"  : "100",
			"date" : "26 September 2015"},
	"fish.gif" : {"type" : "other",
			"size"  : "200",
			"date" : "26 September 2015"}
}

// allows for storage and files to be displayed when clicking on a panel
function enableDisplay() {
	$('.drive').click(function() {
		var storageType = $(this).text().replace(/\s/g, '');;
		// console.log(storageType);
		var color = $(this).css('background-color');
		// $.get('/', function(data) {
		// 	listFiles(data);
		// });
		//listFiles(json, color, storageType);
	});
}

function listFiles(json, color, storageType) {
	//$(".drives").css("display", "none");

	box.append('<div class="background" style="background:' + color + '"></div>');
	grid = '<div class="container" data-storage="' + storageType + '"><div class="grid">';
	for(var f in json) {
		// grid += '<div class="item"><div class="background"></div><span class="title">' + f + '</span></div>';
		grid += '<div class="item"><div class="glyphicons"><img class="glyph download" src="../download.png"><img class="glyph bin" src="../bin.png"></div><img class="icon" src="../' + json[f].type + '.svg"><div class="background"></div><span class="title">' + f + '</span></div>';
	}
	$('.box').append((grid = $(grid + '</div></div>')));
	$.Velocity.hook(box.find('.background'), "translateY", "100%");
	box.find('.drives').velocity({scale: .2}, 400, "easeIn");
	box.find('.background').velocity({translateY: 0}, 400, "easeIn", function() {
		box.css('overflow', 'hidden');
		box.find('.drives').css("display", "none");
		box.find('.drives').remove();
		grid.find('.item').each(function (e) {
			var d = $(this);
			$.Velocity.hook(d, "translateY", "50%");
			setTimeout(function() {
				d.velocity({"translateY": "0", opacity: 1}, 400, "easeIn", function() {
					d.find('.icon').velocity({opacity: 1}, 400, "easeIn");
		   			d.find('.title').velocity({opacity: 1}, 400, "easeIn");
		    	});
		    }, e*200);
		});
	})
	$(window).trigger('resize');
	enableDownload();
	enableDelete();
}

function newBox() {
	$('.box').removeClass('show');
	// if($('.drives'))
	// 	$('.box').remove();
	
	box = '<div class="box show"><div class="drives">';
	for(var d in drives)
		box += '<div class="drive" style="background: #' + drives[d].color + '"><span class="title">'+ drives[d].name +'</span><img class="icon" src="../'+ drives[d].icon +'"></span><a href="login/'+ drives[d].url +'" target="_blank"></div>';
	$("body").append((box = $(box + '</div></div>')));
	$(box).find('.drive').each(function (e) {
		var d = $(this);
		$.Velocity.hook(d, "translateY", "50%");
		setTimeout(function() {
			d.velocity({"translateY": "0", opacity: 1}, 400, "easeIn", function() {
	   			d.find('.title').velocity({opacity: 1}, 400, "easeIn");
	   			d.find('.icon').velocity({opacity: 1}, 400, "easeIn");
	    	});
	    }, e*200);
	});
	$(window).trigger('resize');
	enableDisplay();
}
