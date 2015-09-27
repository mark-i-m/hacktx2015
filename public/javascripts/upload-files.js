$('document').ready(function() {
    var containers = document.getElementsByClassName("box");

    for(var i = 0; i < containers.length; i++) {
        var dropzone = containers[i];
        var storage;

        dropzone.addEventListener('dragover', function(e) {
            e.stopPropagation();
            e.preventDefault();
            // e.dataTransfer.dropEffect = 'copy';
        });

        dropzone.addEventListener('drop', function(e) {
            e.stopPropagation();
            e.preventDefault();

            var files = e.dataTransfer.files;
            // console.log(files);
            for(var j = 0; j < files.length; j++) {
                // upload to storage
                console.log(files[j].name);
            }
        });
    }
});
