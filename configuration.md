> $Id: configuration.md 10422 2018-07-31 14:39:11Z miheev $
> $Date: 2018-07-31 17:39:11 +0300 (Вт, 31 июл 2018) $

Конфигурация системы
====================

Конфигурация
------------

Проект:

    WEB_TINTS/source/package.json

Сборщик enb

    WEB_TINTS/source/.enb/make.js
    .enb/make.js

Сборщик gulp:

    WEB_TINTS/source/gulpfile.config.yaml
    WEB_TINTS/source/gulpfile.js

Сервер:

    WEB_TINTS/release/core/scripts/php/app/config/config_constants.php

(Описания словарей см. в конце файла.)

    WEB_TINTS/release/core/scripts/php/app/config/config.php

Конфигурация приложений phalcon

    WEB_TINTS/release/application/scripts/php/app/config/config.php

    WEB_TINTS/release/element-dc/scripts/php/app/config/config.php
    WEB_TINTS/release/element-tcm/scripts/php/app/config/config.php
    WEB_TINTS/release/element-umto/scripts/php/app/config/config.php

Проект

    WEB_TINTS/source/blocks/shared/project/__polyfills/project__polyfills.js
    WEB_TINTS/source/blocks/shared/project/__root/project__root.js
    WEB_TINTS/source/blocks/shared/project/__config/project__config.js
    WEB_TINTS/source/blocks/shared/project/__helpers/project__helpers.js
    WEB_TINTS/source/blocks/shared/project/project.deps.js

Настройки стилей и цветовых решений (дополнительно к конфигурации):

Расширение конфигурации проекта в рантайм (пример):

    http://localhost:5590/WEB_TINTS/core/app.html?useSockets=true&catchSocketsError=true#tcm_Reports_efficiency
    http://youcomp.geyser.ru:5590/WEB_TINTS/core/app.debug.html?DEBUG=true&audioNotifications=false#tcm_Monitoring_KO

Системное

    C:/nginx-1.11.10/conf/nginx.conf
    C:/nginx-1.11.10/logs/error.log
    C:/_logs/nginx-error.log
    C:/Windows/php.ini
    C:/_logs/php.log
    C:/Windows/System32/drivers/etc/hosts
    C:/Apache24/conf
    C:/Apache24/conf/httpd.conf
    C:/Apache24/conf/extra/httpd-vhosts.conf


