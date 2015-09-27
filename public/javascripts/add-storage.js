 $(function() {
	var drives = {
		"googledrive": { "name" : "Google Drive", "color" : "F44336", "url" : "/login/googledrive", "icon": "GD.png"},
		"onedrive": { "name" : "One Drive", "color" : "094AB2", "url" : "/login/onedrive", "icon": "OD.png"},
		"dropbox": { "name" : "Dropbox", "color" : "007EE5", "url" : "/login/dropbox", "icon": "DB.png"}
	}, box, date = new Date();

	$(window).ready(function() {
		checkCookies();
		$(".new").click(function() {
			$("").append(newBox());
		});
		$(window).on('resize', function() {
			$('.drive, .item').each(function() {
				$(this).height($(this).width());
			})
		}).trigger('resize');
	});

	// allows for storage and files to be displayed when clicking on a panel
	function enableDisplay() {
		$('.drive').click(function(e) {
			//e.preventDefault();
			var storageType = $(this).text().replace(/\s/g, '').toLowerCase();
			var color = $(this).css('background-color');
			listFiles(cookie);
		});
	}

	function listFiles(cookie) {
		//$(".drives").css("display", "none");
		var email = cookie[1],
			type = cookie[0],
			color = drives[type].color;
        console.log(color);
		$.get('/list/' + type + '/' + email, function(data) {
			box.find('.container').append('<div class="background" style="background:#' + color + '"></div>')
			grid = '<div class="grid" data-storage="' + type + '">';
			for(var f in data) {
				// grid += '<div class="item"><div class="background"></div><span class="title">' + f + '</span></div>';
				grid += '<div class="item"><div class="glyphicons"><img class="glyph download" src="../download.png"><img class="glyph bin" src="../bin.png"></div><img class="icon" src="../' + data[f].type + '.svg"><div class="background"></div><span class="title">' + f + '</span></div>';
			}
			box.find('.container').append((grid = $(grid + '</div>')));
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
		});
	}

	function updateTabs (box) {
		var current = box.index(),
			length = $('.box').length;
		//$('.box').removeClass('show');

		$('.box').each(function(e) {
			var amount = e > current ? (-95 + (5 * Math.min(length - current - 1, 2)) - 5 * (e - current)) : (-(5 * Math.min(current, 2)) + 5 * (current - e));
		   	$(this).velocity({translateX: amount + "%"}, 400, "easeIn");
		   	$(this).find('.container').velocity({translateX: - amount + "%"}, 400, "easeIn", function() {
		   		//box.addClass('show');
		   	});
		});
		return box;
	}

	// $('body').on('mousedown', '.item', function() {
	// 	var item = $('<div class="drag"></div>');
	// 	$(this).parent().append(item);
	// 	console.log(item)
	// 	item.css({'position': 'absolute', 'top': $(this).css('top'), 'left' : $(this).css('left')})
	// 	$('body').on('mousemove', function() {
	// 		item.css()
	// 	})
	// })
	$('body').on('mousedown', '.item', function() {
		var clone = $(this).clone();
		$('body').append(clone)
		$(clone).draggabilly({

		})
	});

	$('body').on('mouseover', '.box:not(.show)', function() {
			$('.box').removeClass('show');
			$(this).addClass('show');
			updateTabs($(this));
	})

	function newBox(cookie) {
		$('.box').removeClass('show');
		// if($('.drives'))
		// 	$('.box').remove();
		box = '<div class="box show"><div class="container">';
		if(!cookie){
			box += '<div class="drives">';
			for(var d in drives)
				box += '<div class="drive" style="background: #' + drives[d].color + '"><span class="title">'+ drives[d].name +'</span><img class="icon" src="../'+ drives[d].icon +'"></span><a href="'+ drives[d].url +'?'+ Date() +'"></div>';
			box += '</div>'
		} else {
            console.log(cookie);
			listFiles(cookie.split('-'));
		}
		$("body").prepend((box = $(box + '</div></div>')));
		updateTabs(box).find('.drive').each(function (e) {
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

	function readCookie(name) {
          var nameEQ = name + "=";
          var ca = document.cookie.split(';');
          for(var i=0;i < ca.length;i++) {
              var c = ca[i];
              while (c.charAt(0)==' ') c = c.substring(1,c.length);
              if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
          }
          return null;
      }

	function checkCookies() {
		var users = readCookie('users');
		console.log(users);
		if(users) {
            users = users.split(',');
			for(var c in users)
				newBox(users[c]);
        }
		else newBox();
	}
});
