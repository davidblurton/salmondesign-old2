$.fn.clicktoggle = function (a, b) {
    return this.each(function () {
        var clicked = false;

        $(this).bind("click", function () {
            if (clicked) {
                clicked = false;
                return b.apply(this, arguments);
            }

            clicked = true;
            return a.apply(this, arguments);
        });
    });
};

$(document).ready(function () {
    $('.photo-content-temp img:first-of-type').each(function () {
        var image_src = $(this).attr('src');
        var thumbnail = $(this).closest('.photo-thumbnail');
        var load_spinner = $(thumbnail).children('.photo-thumbnail-loading-progress');
        var post_content = $(thumbnail).children('.photo-content-temp');

        var temp_image = new Image();
        temp_image.src = image_src;
        temp_image.onload = function () {
            var height = temp_image.height / temp_image.width * thumbnail.width();
            $(load_spinner).remove();
            $(post_content).remove();
            $(thumbnail).css({
                'opacity': 0,
                'background-image': 'url(' + image_src + ')',
                'height': height
            }).animate({
                opacity: 1
            }, {
                duration: 500
            });
        };
    });

    $('.fotorama').fotorama({
        nav: 'thumbs',
        allowfullscreen: true,
        keyboard: true
    });

    $('a[rel=darkbox]').darkbox();
});