> $Date: 2018-08-01 19:05:47 +0300 (Ср, 01 авг 2018) $
> $Id: dev-servers.md 10439 2018-08-01 16:05:47Z miheev $

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

- `all` -- Перегенерить всё. Локально: `gulp all`, npm run -s all.
- `cleanCache` -- Очистка данных приложения (php/phalcon). Локально: `gulp cleanCache`.
- `cleanFake` -- Очистка демо-данных. Локально: `gulp cleanFake`.
- `clean` -- Очистить файлы сборщика, временные файлы, тестовые данные (осторожно! как минимум надо будет перегенирить проект!). Локально: `gulp cleanAll`.
- `cleanup` -- Очистить состояние svn. Локально: `svn cleanup`.
- `commit` -- Синхронизировать изменения на сервере с репозиторием svn (сделать коммит). Локально: `svn commit -m ...`.
- `getFakeData` -- Получить в архивированном виде папку с демо-данными удалённого сервера.
- `lint` -- Запустить проверку линтером. Локально: `npm run -s lint`.
- `log` -- Показать лог svn (10 записей). Локально: `svn log -l 10`.
- `phpinfo` -- Информация из phpinfo().
- `redisFlush` -- очистка кеша redis. Локально: `redis-cli flushall`.
- `remake` -- Перегенерить без копирования статики (без gulp init). Локально: `gulp remake`, `npm run -s remake`.
- `stable` -- Создать stable-версию проекта. Локально: `gulp stable`, `npm run -s stable`.
- `test` -- Проверка работоспособности (выводит лог svn с одной последней записью и текст "ok").
- `tests` -- Запустить тесты (на сервере не работает!). Локально: `npm run -s tests`.
- `update` -- Обновить из svn. Локально: `svn update`.
