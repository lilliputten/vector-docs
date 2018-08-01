> $Id: local-dev-server.md 10435 2018-08-01 14:01:13Z miheev $
> $Date: 2018-08-01 17:01:13 +0300 (Ср, 01 авг 2018) $

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

Пример формирования корневного пути запросов:
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

Открытие страниц системы или отдельных пакетов
----------------------------------------------

В режиме nginx можно работать
