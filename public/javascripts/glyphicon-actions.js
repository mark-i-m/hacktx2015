function enableDownload() {
	$('.download').click(function() {
		var item = $(this).parent().parent();
		var file = $(item).find("span").text();
		// var storage = $(item);
		console.log(file);
	});
}

function enableDelete() {
	$('.bin').click(function() {
		var item = $(this).parent().parent();
		var file = $(item).find("span").text();
		// var storage = $(item);
		console.log(file);
		$(item).remove();
	});
}