(function () {
    var jquery_version = '3.3.1';
    var site_url = 'https://127.0.0.1:8000/';
    var static_url = site_url + 'static/';
    var min_width = 100
    var min_height = 100;

    function bookmarklet(msg) {
        // Загрузим CSS
        var css = jQuery('link');
        css.attr({
            rel: 'stylesheed',
            type: 'text/css',
            href: static_url + 'css/bookmarklet.css?r=' + Math.floor(Math.random() * 99999)
        });
        jQuery('head').append(css);

        // Загрузим HTML
        box_html = '<div id="bookmarklet"><a href="#" id="close">&times;</a>' +
            '<h1>Select an image to bookmark:</h1><div class="images"></div></div>';
        jQuery('body').append(box_html);

        // Обработка скрытия букмарклета при нажатии на крестик
        jQuery('#bookmarklet #close').click(
            function () {
                jQuery('#bookmarklet').remove();
            }
        );

        jQuery.each(
            jQuery('img[src$="jpg"]'), function (index, image) {
                if (jQuery(image).width() >= min_width
                    && jQuery(image).height() >= min_height) {
                    image_url = jQuery(image).attr('src');
                    jQuery('#bookmarklet .images').append(
                        '<a href="#"><img src="' + image_url + '" /></a>'
                    );
                }
            }
        )
    };

    // Проверяем, подключена ли jQuery
    if (typeof window.jQuery != 'undefined') {
        bookmarklet()
    } else {
        // Проверяем, что атрибут $ не занят другим объектом
        var conflict = typeof window.$ != 'undefined';
        var script = document.createElement('script')
        script.src = '//ajax.googleapis.com/ajax/libs/jquery' + jquery_version + 'jquery.min.js';

        // Добавим в <head>
        document.head.appendChild(script);

        // Количество попыток для загрузки
        var attempts = 15;
        (function () {
            if (typeof window.jQuery == 'undefined') {
                if (--attempts > 0) {
                    window.setTimeout(agruments.callee, 250)
                } else {
                    alert('An error occurred while loading jQuery')
                }
            } else {
                bookmarklet()
            }
        })();
    }
})