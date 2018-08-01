> $Id: local-dev-server.md 10439 2018-08-01 16:05:47Z miheev $
> $Date: 2018-08-01 19:05:47 +0300 (Ср, 01 авг 2018) $

Локальный сервер разработчика
=============================

Режимы работы
-------------

Локальный сервер может использоваться в двух режимах:

### Standalone enb-server

"Голый" enb-сервер. Вместо реальных данных используются накопленные демо-данные (fake-data, см. [Эмуляция и накопление данных от сервера приложения](fake-data.md)).

Примеры запросов:

- `http://localhost:8080/pages/Report/Report.htm` -- Пакет "Отчёты".
- `http://localhost:8080/pages/MapView/MapView.htm` -- Пакет "Компонент с картой".
- `http://localhost:8080/pages/App/App.html#tcm_Planning_Tasks` -- Страница "Планирование задач".
- `http://localhost:8080/pages/Demo/Demo.htm?demo=ValueCell` -- Демо-компонент "Ячейки данных".
- `http://localhost:8080/pages/Demo/Demo.htm?demo=tableview-local&demo=tableview-static` -- Демо-компоненты "Таблицы".

### Эмуляция реального окружения сервера с помощью nginx

Все запросы данных и ресурсов перенапрвляются к локальному enb-серверу.

Примеры запросов:

- `http://localhost:5590/WEB_TINTS/core/app.html#app:tcm` -- Приложение "ТЦМ" ("ГДЦ").
- `http://localhost:5590/WEB_TINTS/core/app.html?app=umto` -- Приложение "УМТО" ("НЦУО").
- `http://localhost:5590/WEB_TINTS/core/app.html#tcm_Planning_Tasks` -- Страница "ТЦМ / Планирование задач".
- `http://localhost:5590/WEB_TINTS/core/?demo=tableview-local&demo=tableview-static#Demo` -- Демо-компоненты "Таблицы".

Расширение конфигурации проекта в рантайм (пример, передача параметров в `app.js`)
----------------------------------------------------------------------------------

- `http://localhost:8080/pages/App/App.html?DEBUG=true&audioNotifications=false#tcm_Monitoring_KO`
- `http://localhost:5590/WEB_TINTS/core/app.html?useSockets=true&catchSocketsError=true#tcm_Reports_efficiency`

Пеопределять можно все параметры, имеющие смысл в контексте `project.config`.

Определение режима
------------------

При первом обращении в зависимости от адреса запроса (точнее, от порта: для
nginx используется 5590, см. параметр конфигурации `NGINX_PORT` в
`project__root.js` и `WEB_TINTS/source/.enb/make.js`; в последнем см. ещё и
проверку порта в структуре данных `__global.enbServerRequest.headers.host` --
для того, чтобы получить к ней доступ, должен быть применён патч из
`WEB_TINTS/source/!Patches/enb-server`) определяется, проходит ли запрос через серевер nginx.

Независимо от необходимости работы с nginx или standalone-enb-server запуск сервера производится любой из команд:

- `node run -s server`,
- `enb server` (если enb установлен и пропатчен глобально).

> (ВОПРОС: Возможно, надо запускать сервер с переменной окружения или
> параметром, явно указывающим, какой режим необходимо исопльзовать?)

В случае работы из-под nginx происходит прозрачаная для приложения
переадресация ресурсов на enb-сервер.

В противном случае (включён режим DEBUG и установлена переменная
`USE_ENB_URLS`) все пути запросов ресурсов заменяются на локальные (см.
подстановки в `project__config.js`; выбрасываются при обработки директив
`DEBUG*` при постпроцессинге).

Пример формирования корневого пути запроса:
```javascript
    rootUrl = /*DEBUG*/USE_ENB_URLS ? enbRoot :
        '../',
```

Фрагмент настроек редиректов на enb-сервер из конфигурации nginx:
```nginx
    # Перекидываем динамику к enb серверу...
    # Описание содержания страниц
    location ~* ^/WEB_TINTS/(?:release/)*core/js/bemjson/(\w+).json$ {
      proxy_pass http://127.0.0.1:8080/pages/$1/$1.json;
    }
    # Разметка страницы приложения
    location ~* ^/WEB_TINTS/(?:release/)*core/(app|app.debug).html(.*)$ {
      proxy_pass http://127.0.0.1:8080/pages/App/App.html$2;
    }
    # Сброки css|browser|bemhtml для рабочих экранов (версии '.stylesx.css', '.browserx.js', '.bemhtmlx.js')
    location ~* ^/WEB_TINTS/(?:release/)*core/(js|css)/bem/([^\.\/]*)\.(styles|browser|bemhtml)(?:\.min)*\.((?:css|js).*)$ {
      proxy_pass http://127.0.0.1:8080/pages/$2/$2.$3x.$4;
    }
```

См. [полный файл конфигурации nginx](local-dev-server-nginx.conf).

Запросы к данным в режиме nginx отправляются на локально запущенный клиент
"Купол". Запросы обычно отправляются на собственный хост (`127.0.0.1:20062`).

В режиме `enb` запросы данных перенаправляются на расположенные в папке
`WEB_TINTS/source/fake-data` сохранённые демо-данные.

См. [Эмуляция и накопление данных от сервера приложения](fake-data.md).

Клиент "Купол"
--------------

Nodejs скрипт располагается в папке `WEB_TINTS/release/core/scripts/nodejs/low_info_gas`.

Запускается консольной командой:

- `node index.js`

Режим отладки (на 2018.08.01 -- влияет на установку отладочных задержек при запросе данных через сокеты):

- `node index.js --debug`

Параметры работы (локальный адрес доступа, удалённый сервер, параметры
подключения и т.д.) выводятся во время старта скрипта.

Конфигурация локального сервера
-------------------------------

Используемые версии ПО:

- PHP: 5.x
- Apache: 2.4
- Nginx: 1.11
- OpenSSL-Win64: 1.0.x
- Redis server: 2.8.x
- Svn: *

### Изменения в конфигурации

PHP (`C:/Windows/php.ini`):
```php.ini
max_execution_time = 180; Увеличенное время выполнения
memory_limit = 128M; Увеличенный объём памяти
error_log = c:/_logs/php.log; Лог ошибок в удобное место
; Расширения...
extension=php_phalcon.dll
extension=php_redis.dll
extension=php_fileinfo.dll
extension=php_soap.dll
extension=php_mbstring.dll
extension=php_bz2.dll
extension=php_curl.dll
extension=php_exif.dll
extension=php_gd2.dll
extension=php_gettext.dll
extension=php_imap.dll
extension=php_mysql.dll
extension=php_mysqli.dll
extension=php_openssl.dll
extension=php_sockets.dll
extension=php_xmlrpc.dll
soap.wsdl_cache_ttl=1
```

Apache (`C:/Apache24/conf/httpd.conf`):
```apache
# Модули...
LoadModule headers_module modules/mod_headers.so
LoadModule include_module modules/mod_include.so
LoadModule rewrite_module modules/mod_rewrite.so
# Root...
<Directory />
    Options Indexes FollowSymLinks Includes ExecCGI
    AllowOverride All
</Directory>
# Vektor...
DocumentRoot "D:/Work/vektor"
<Directory "D:/Work/vektor">
Options Indexes FollowSymLinks Includes ExecCGI
# Header set Access-Control-Allow-Headers "element-token, Access-Control-Allow-Origin"
# Header set Access-Control-Allow-Origin "http://localhost:8080"
# Header set Access-Control-Allow-Origin "*"
AllowOverride All
Require all granted
</Directory>
# Dir...
<IfModule dir_module>
    DirectoryIndex index.php index.html
</IfModule>
# Fancy directory listings
Include conf/extra/httpd-autoindex.conf
# Language settings
Include conf/extra/httpd-languages.conf
# Virtual hosts
Include conf/extra/httpd-vhosts.conf
# PHP...
# LoadModule php5_module "C:/PHP54/php5apache2_2.dll"
LoadModule php5_module "C:/PHP54/php5apache2_4.dll"
AddType application/x-httpd-php .php .phtml
```

Apache (`C:/Apache24/conf/extra/httpd-vhosts.conf`):
```apache
<VirtualHost 127.0.0.1:80>
ServerName vektor.local
DocumentRoot D:/Work/vektor/WEB_TINTS
CustomLog D:/Work/vektor/.vektor.local.access.log common
ErrorLog D:/Work/vektor/.vektor.local.error.log
Alias /WEB_TINTS/release D:/Work/vektor/WEB_TINTS/release
Alias /WEB_TINTS D:/Work/vektor/WEB_TINTS/release
</VirtualHost>
<VirtualHost 127.0.0.1:80>
ServerName phpinfo.local
DocumentRoot D:/Sites/phpinfo/www
CustomLog D:/Sites/phpinfo/phpinfo.log common
ErrorLog D:/Sites/phpinfo/phpinfo.error.log
</VirtualHost>
```
