function enableDownload() {
	$('.download').click(function() {
		var item = $(this).parent().parent();
		var file = $(item).find("span").text();
		var storage = $(item).parent().parent().attr("data-storage");
		console.log(file);
		console.log(storage);

		//download
	});
}

function enableDelete() {
	$('.bin').click(function() {
		var item = $(this).parent().parent();
		var file = $(item).find("span").text();
		var storage = $(item).parent().parent().attr("data-storage");

		console.log(storage);
		// delete

		$(item).remove();
	});
}