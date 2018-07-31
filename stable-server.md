> $Date: 2018-07-31 16:46:42 +0300 (Вт, 31 июл 2018) $
> $Id: stable-server.md 10419 2018-07-31 13:46:42Z miheev $

Стабильная версия проекта
=========================

Создаётся на рабочем сервере в папке `D:/websites/stable` при запуске скрипта
`remote.php?stable`:

- [Apache](http://youcomp.geyser.ru:8082/WEB_TINTS/remote.php?stable)
- [Remote Apache](http://185.41.41.90:8082/WEB_TINTS/remote.php?stable)

Альтернатива: запуск команды `gulp stable` на сервере в папке
`WEB_TINTS/source` -- возможно, оптимально для отлеживания ошибок (выполнение
команды занимает продолжительное время и может отрубаться по таймауту).

При этом выполняется:

- Сбор и поиск фсех файлов.
- Все файлы, кроме папок `core/css/bem`, `core/js/bem`, `logs`, `cache`,
  `demo`, файлов с расширениями `.php`, `.zip`, масками `00*`, переносятся "как
  есть".
- Исключаются так же файлы с расширениями: `.map`, `.swp`, `.log`, `.tmp` и др.
- Отдельно обрабатываются файлы из bem-пакетов:
  `*.{styles,browser,bemhtml}.{css.js}` -- для них готовятся соотв.
  минимизированные файлы (`uglifyjs`, `cssmin` соотв).
- Собственные (не библиотечные) php-файлы обрабатываются (см. поток
  `gulpfile.js:uglifyPhpAsset`) препроцессингом (обработка директив `DEBUG`,
  `DEBUG-BEGIN..END`, `NO-DEBUG` и т.д. -- см. `preprocessCode`) и
  минифицируются, если установлен флаг `UGLIFY_MIN_ASSETS`.

Для детальной информации о производимых действиях см. реализацию gulp-команды
`stable` в `gulpfile.js` (`gulp.task( 'stable' ...`).

После создания папки с рабочей версией можно переименовать её в `stable-YYMMDD`
(по текущей дате) и сделать символическую ссылку командой `D:/websites> mklink
/D stable stable-YYMMDD`. В этом случае можно хранить ряд последних стабильных
копий в соотв. папках.

Stable-версия доступна для просмотра по адресам (см. информацию в [справочнике
по серверам](dev-servers.md) и настройки серверов):

- [Apache plain](http://youcomp.geyser.ru:8082/stable/core/app.html)
- [Apache nginx](http://youcomp.geyser.ru:5590/stable/core/app.html)
- [IIS plain](http://youcomp.geyser.ru:80/stable/core/app.html) *В IIS не проверено!*
- [IIS nginx](http://youcomp.geyser.ru:5591/stable/core/app.html) *В IIS не проверено!*

