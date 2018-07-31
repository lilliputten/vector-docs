> $Date: 2018-07-31 16:46:42 +0300 (Вт, 31 июл 2018) $
> $Id: dev-servers.md 10419 2018-07-31 13:46:42Z miheev $

Работа с серверами
==================

Новый адрес (2017.10.13, после переезда):

    NEW: 185.41.41.90
    OLD: 195.133.216.10

    SVN: 185.41.41.90:8433

    Sockets: *:8083

SVN:

- `svn://svnsrv:8433/WEB_TINTS`

Адреса для просмотра:

- [Локальный сервер enb](http://localhost:8080/pages/App/App.html)

- [Локальная копия plain, debug](http://localhost/WEB_TINTS/release/core/app.debug.html)
- [Локальная копия nginx, debug](http://localhost:5590/WEB_TINTS/release/core/app.debug.html)

- [Локальная копия plain](http://localhost/WEB_TINTS/release/core/app.html)
- [Локальная копия nginx](http://localhost:5590/WEB_TINTS/release/core/app.html)

Примеры локальных страниц:

- [local:enb:MapView](http://localhost:8080/pages/MapView/MapView.htm)
- [local:nginx:MapView](http://localhost:5590/WEB_TINTS/release/core/app.debug.html#MapView?audioNotifications=false)

Внутренний сервер:

- [Apache plain](http://youcomp.geyser.ru:8082/WEB_TINTS/core/app.html)
- [Apache nginx](http://youcomp.geyser.ru:5590/WEB_TINTS/core/app.html)
- [IIS plain](http://youcomp.geyser.ru:80/WEB_TINTS/core/app.html)
- [IIS nginx](http://youcomp.geyser.ru:5591/WEB_TINTS/core/app.html)

Stable-версия:

- [Apache plain](http://youcomp.geyser.ru:8082/stable/core/app.html)
- [Apache nginx](http://youcomp.geyser.ru:5590/stable/core/app.html)
- [IIS plain](http://youcomp.geyser.ru:80/stable/core/app.html) *В IIS не проверено!*
- [IIS nginx](http://youcomp.geyser.ru:5591/stable/core/app.html) *В IIS не проверено!*

См. [создание stable версии](stable-server.md).

Внешний сервер:

- [Remote Apache plain](http://185.41.41.90:8082/WEB_TINTS/core/app.html)
- [Remote Apache nginx](http://185.41.41.90:5590/WEB_TINTS/core/app.html)
- [Remote IIS plain](http://185.41.41.90:56010/WEB_TINTS/core/app.html)
- [Remote IIS nginx](http://185.41.41.90:5591/WEB_TINTS/core/app.html)

"Три приложения":

- [ТЦМ](http://185.41.41.90:8082/WEB_TINTS/element-tcm)
- [УМТО](http://185.41.41.90:8082/WEB_TINTS/element-umto)
- [ЦОД](http://185.41.41.90:8082/WEB_TINTS/element-dc)

Релиз:

    http://youcomp.geyser.ru:8082/WEB_TINTS_R/core/app.html

Сервер с картами "Автоспутник":

    http://youcomp.geyser.ru:5588/api/json/navsys.api.map.drawTile/j7AX5tuobawjbB8/google/day/8/153/78

Удалённый просмотр логов:

- [application](http://185.41.41.90:8082/WEB_TINTS/logs.php?logfile=application/scripts/php/app/logs/log.txt&clear=yes)
- [element-tcm](http://185.41.41.90:8082/WEB_TINTS/logs.php?logfile=element-tcm/scripts/php/app/logs/log.txt&clear=yes)
- [element-dc](http://185.41.41.90:8082/WEB_TINTS/logs.php?logfile=element-dc/scripts/php/app/logs/log.txt&clear=yes)
- [element-umto](http://185.41.41.90:8082/WEB_TINTS/logs.php?logfile=element-umto/scripts/php/app/logs/log.txt&clear=yes)

Доступ к удалённому управлению:

- [Apache](http://youcomp.geyser.ru:8082/WEB_TINTS/remote.php?log)
- [Remote Apache](http://185.41.41.90:8082/WEB_TINTS/remote.php?log)

Обновить с командной строки:

    `wget -qO- http://185.41.41.90:8082/WEB_TINTS/remote.php?update`
    `wget -SO- http://185.41.41.90:8082/WEB_TINTS/remote.php?update`

Перегенерировать всё (включая перевыкладку библиотек и статики):

    `wget -qO- http://185.41.41.90:8082/WEB_TINTS/remote.php?all`

Перегенерировать только динамический контент:

    `wget -qO- http://185.41.41.90:8082/WEB_TINTS/remote.php?remake`

Файлы в проекте:

    `WEB_TINTS/release/logs.php`
    `WEB_TINTS/release/remote.php`

Команды удалённого управления:

- `?log` -- Последние записи в логе svn. Выводит 10 записей.
- `?phpinfo` -- Информация из phpinfo().
- `?update` -- Обновить репозиторий.
- `?commit` -- Зафиксить удалённые изменения (например, после генерации) в репозиторий.
- `?cleanup` -- Очистить состояние удалённого репозитория.
- `?clean` -- Очистить файлы сборщика, временные файлы, тестовые данные (команда `gulp cleanAll`).
- `?cleanCache` -- Очистить кеш приложения (php/phalcon).
- `?redis_flush` -- Очистить кеш redis.
- `?data` -- Создать и скачать архив с содержимым папки `sources/fake-data/`.
- `?lint` -- Обновить и запустить статический анализ кода (hint/lint).
- `?tests` -- Обновить и запустить статические тесты (specs).
- `?all` -- Обновить и перегенерировать проект.
- `?remake` -- Обновить и перегенерировать проект (без перезаписи библиотек).
- `?stable` -- Установить рабочие файлы в production.

