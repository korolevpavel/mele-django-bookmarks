(function () {
    var jquery_version = '3.3.1';
    var site_url = 'http://127.0.0.1:8000/';
    var static_url = site_url + 'static/';
    var min_width = 100
    var min_height = 100;

    function bookmarklet(msg) {
        // Код букмарклета
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