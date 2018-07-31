> $Id: used-libs.md 10416 2018-07-31 12:15:55Z miheev $
> $Date: 2018-07-31 15:15:55 +0300 (Вт, 31 июл 2018) $

Используемые библиотеки
=======================

В скобках -- версия/источник библиотеки на момент составления/обновления документа.
См. конфигурацию bower (`WEB_TINTS/source/bower.json`).



Служебные
---------

### es5-shim (`^4.5.9`)

Полифилы для браузерного ES5.

Загружается статической ссылкой в теле шаблона (`app.html`, первым, до подключения `jquery`). Ссылка создаётся в `WEB_TINTS/source/blocks/shared/page/page.bemhtml`.

- [es5-shim - npm](https://www.npmjs.com/package/es5-shim)
- [es-shims/es5-shim: ECMAScript 5 compatibility shims for legacy (and modern) JavaScript engines](https://github.com/es-shims/es5-shim)

### jquery (`^3.2.1`)

- [jquery - npm](https://www.npmjs.com/package/jquery)
- [jquery/jquery: jQuery JavaScript Library](https://github.com/jquery/jquery)
- Конфигурация для стандартного загрузчика из `bem-core`: `WEB_TINTS/source/blocks/loaders/jquery/__config/jquery__config.js`

### jquery-md5 (`1.0.1`)

Создание хешей для строковых данных.

- [jquery.md5 - npm](https://www.npmjs.com/package/jquery.md5)
- [placemarker/jQuery-MD5: JavaScript MD5 plugin, usable as part of the jQuery library or standalone](https://github.com/placemarker/jQuery-MD5)
- Модуль-загрузчик: `WEB_TINTS/source/blocks/loaders/md5/md5.js`



Браузер
-------

### jquery.nicescroll (`^3.7.6`)

Кастомная прокрутка.

- [inuyaksa/jquery.nicescroll: nicescroll plugin for jquery - scrollbars like iphone/ipad](https://github.com/inuyaksa/jquery.nicescroll)
- Модуль-загрузчик: `WEB_TINTS/source/blocks/loaders/nicescroll`

### file-saver (`FileSaver#^1.3.3`)

Сохранение сгенерированных документов (pdf, rtf) из браузера.

- [eligrey/FileSaver.js: An HTML5 saveAs() FileSaver implementation](https://github.com/eligrey/FileSaver.js/)
- Модуль-загрузчик: `WEB_TINTS/source/blocks/loaders/FileSaver`

### pdfmake (`^0.1.27`)

Создание pdf документов на клиенте. Для сохранения используется `file-saver`.

Загружается через `app.resolve_assets()` в `WEB_TINTS/source/blocks/custom/Report/__Export/Report__Export.js`.

- [bpampuch/pdfmake: Client/server side PDF printing in pure JavaScript](https://github.com/bpampuch/pdfmake)
- [pdfmake - npm](https://www.npmjs.com/package/pdfmake)

### php-date-formatter (`^1.3.4`)

Форматирование/распознавание дат.

- [php-date-formatter - npm](https://www.npmjs.com/package/php-date-formatter)
- [kartik-v/php-date-formatter: A Javascript datetime formatting and manipulation library using PHP date-time formats.](https://github.com/kartik-v/php-date-formatter)
- Модуль-загрузчик: `WEB_TINTS/source/blocks/libs/dateformatter/dateformatter.js`

### ol (`https://github.com/openlayers/openlayers/releases/download/v4.6.5/v4.6.5-dist.zip`)

Картографическая библиотека OpenLayers.

Загружается в модуле `anymap` (обычно по требованию; напр., для пакета `MapView`, см.).

- [ol - npm](https://www.npmjs.com/package/ol)
- [openlayers/openlayers: OpenLayers](https://github.com/openlayers/openlayers)
- Библиотека AnyMap: `WEB_TINTS/source/libs-dev/anymap`
- Инициализатор-загрузчик: `WEB_TINTS/source/blocks/custom/AnyMap/AnyMap.js`

### socket.io-client (`^1.7.2`)

Работа с сокетами.

- [socket.io-client - npm](https://www.npmjs.com/package/socket.io-client)
- [socketio/socket.io-client: Realtime application framework (client)](https://github.com/socketio/socket.io-client)
- Модуль-загрузчик: `WEB_TINTS/source/blocks/loaders/socketio`

### store.js (`^2.0.3`)

Сохранение данных в localStorage браузера между сессиями.

- [store - npm](https://www.npmjs.com/package/store)
- [marcuswestin/store.js: Cross-browser storage for all use cases, used across the web.](https://github.com/marcuswestin/store.js)
- Модуль-загрузчик: `WEB_TINTS/source/blocks/loaders/store/store.js`



Уровень проекта ("системное")
-----------------------------

### bem-core (`4.2.1`)

Базовые компоненты bem-проекта.

Устанавливается как зависимость для `bem-core`.

### bem-components (`^6.0.1`)

Интерфейсные компоненты bem-проектов.

Подключаются при сборке страниц по необходимости (по указаниям в зависимостях).

- [bem-components - npm](https://www.npmjs.com/package/bem-components)
- [bem/bem-components: Set of components for sites development](https://github.com/bem/bem-components)

### bem-pr (`^0.14.0`)

Служебная библиотека для инфрастурктуры bem-пректа (для создания документации, тестирования, пр.).

- [narqo/bem-pr: A set of bem-make extenstions to wrap common infrastructure's tasks](https://github.com/narqo/bem-pr)



Интерфейс (стили, иконки и пр)
------------------------------

### font-awesome (`^5.0.6`)

Набор иконок Font Awesome.

- [Icons | Font Awesome](https://fontawesome.com/icons?m=free)
- [font-awesome - npm](https://www.npmjs.com/package/font-awesome)
- [FortAwesome/Font-Awesome: The iconic SVG, font, and CSS toolkit](https://github.com/FortAwesome/Font-Awesome)
- Модуль-загрузчик: `WEB_TINTS/source/blocks/loaders/fontawesome/fontawesome.js`

### themify-icons (`^0.1.2`)

Набор иконок Themify.

- [Themify Icons - 320+ Free Icons For Web Design & Apps](https://themify.me/themify-icons)
- [lykmapipo/themify-icons: Pixel-perfect, hand-crafted icons that draw inspiration from Apple iOS 7](https://github.com/lykmapipo/themify-icons)
- Модуль-загрузчик: `WEB_TINTS/source/blocks/loaders/themifyicons/themifyicons.js`


Собственные (разрабатываемые и поддерживаемые) библиотеки
---------------------------------------------------------

Хранятся в папке `WEB_TINTS/source/libs-dev`.

Библиотеки, поддерживаемые и разрабатываемые в рамках проекта.

Попадают в production, непосредственно собираясь из этой папки (см. настройки gulp в `gulpfile.config.yaml`).

### anymap

Универсальный картографический модуль. Используется частично (местами явно ориентируемся на OpenLayers, см. `ol` выше).

### icon-sprites

Создание наборов иконок в спрайты -- из отдельных изображений.

См. README библиотеки: `WEB_TINTS/source/libs-dev/icon-sprites/README.md`

### RTFReport

Создание rtf-документов на клиенте.

Иcпользуется так же собственная библиотека jsrtf (ограниченный функционал; дополняется по мере необходимости):

- [lilliputten/jsrtf: An RTF document creation library for javascript](https://github.com/lilliputten/jsrtf)
- [jsrtf - npm](https://www.npmjs.com/package/jsrtf)

Сборка на webpack. См. `WEB_TINTS/source/libs-dev/RTFReport/webpack.config.js`

## Библиотеки как модули

См. также папки:

- `WEB_TINTS/source/blocks/root`
- `WEB_TINTS/source/blocks/libs`
- `WEB_TINTS/source/blocks/loaders`

-- на предмет используемых загрузчиков/интерфейсов к библиотекам%

- `FileSaver`
- `SecureAjax`
- `dateformatter`
- `datetimepicker`
- `fontawesome`
- `iconSprites`
- `jquery`
- `md5`
- `mousewheel`
- `nicescroll`
- `socket`
- `socketio`
- `store`
- `themifyicons`

## Серверные библиотеки

См. [соотв. документ](php-libs.md)

