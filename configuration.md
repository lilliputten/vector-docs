> $Id: configuration.md 10521 2018-08-09 12:44:56Z miheev $
> $Date: 2018-08-09 15:44:56 +0300 (Чт, 09 авг 2018) $

Конфигурация системы
====================

Зависимости, свойства проекта и скрипты (npm/nodejs)
----------------------------------------------------

- `WEB_TINTS/source/package.json` -- Конфигурация npm.

Сборщик enb
-----------

- `WEB_TINTS/source/.enb/make.js` -- Конфигурация enb.

См. [Сборка enb](enb-make.md)

Сборщик gulp
------------

- `WEB_TINTS/source/gulpfile.config.yaml` -- Конфигурация gulp.
- `WEB_TINTS/source/gulpfile.js` -- Управляющий скрипт gulp.

См. [Процедура сборки и конфигурация](make.md)

Параметры сервера phalcon
-------------------------

- `WEB_TINTS/release/core/scripts/php/app/config/config_constants.php` --
  Параметры конфигурации сервера. Создаётся глобальный ассоциированный
  массив `$_CONSTANTS`, позже используемый для `\Phalcon\Config` (см. ниже).
  (Описания словарей см. в конце файла.)

- `WEB_TINTS/release/core/scripts/php/app/config/config.php` -- Создание
  конфигурации phalcon `\Phalcon\Config`.

Конфигурация приложений phalcon
-------------------------------

- `WEB_TINTS/release/application/scripts/php/app/config/config.php`

- `WEB_TINTS/release/element-dc/scripts/php/app/config/config.php`
- `WEB_TINTS/release/element-tcm/scripts/php/app/config/config.php`
- `WEB_TINTS/release/element-umto/scripts/php/app/config/config.php`

В свойстве массива `$configData['Privilegies']` задаются параметры доступа к
контроллервам, используемым в данном приложении.

См. пример для приложения `application`:

```php
    // ...
    'Privelegies' => array (
        'errors' => array(
            'show401',
            'show404',
            'show500',
        ),
        'session' => array(
            'index',
            'register',
            'start',
            'end',
        ),
        'Login' => array(
            'index',
            'logout',
        ),
        'index' => array(
            'index',
        ),
        'User' => array(
            'signin',
            'signedout',
            'signoff',
        ),
        'Auth' => array(
            'ADAuth',
            'ADClear',
            'ADAuthFailed',
            'ADAuthIntro',
            'signoff',
            'signout',
            'spAuth' => $CONTROLLER_AUTH_MODE,
            'renewNodejsSession' => $DEFAULT_AUTH_MODE,
        ),
        'Layout' => array(
            'get_AppParams_' => $DEFAULT_AUTH_MODE,
            'get_DictsQueue_' => $DEFAULT_AUTH_MODE,
        ),
        'CommonData' => array(
            'getDictsQueue' => $DEFAULT_AUTH_MODE,
        ),
        'ReportSnap' => array(
            'getSnapsList' => $DEFAULT_AUTH_MODE,
            'saveSnap' => $DEFAULT_AUTH_MODE,
            'loadSnap' => $DEFAULT_AUTH_MODE,
        ),
        'KOData' => array(
            'getInitialData' => $DEFAULT_AUTH_MODE,
            'getDataColumns' => $DEFAULT_AUTH_MODE,
        ),
        'DCList' => array(
            'checkWSDLUrl' => $DEFAULT_AUTH_MODE,
        ),
        'Events' => array(
            'AcceptProblem' => $DEFAULT_AUTH_MODE,
        ),
    ),
    // ...
```

Структура меню и список страниц системы
---------------------------------------

См. папку `WEB_TINTS/release/core/scripts/php/app-config`:

- `dc/`, `tcm/`, `umto/` -- Страницы трёх приложений.
- `test-pages/` -- Тестовые страницы.
- `fake-pages/` -- Демо страницы (подключают html-слепки из `WEB_TINTS/release/core/fake-pages`).
- `old-pages/` -- Старые страницы из разработки. К удалению.
- `appdata.php` -- Загрузка страниц (папок со страницами).
- `appmenu.php` -- Описание меню. Создаются две переменные конфигурации:
    - `$_CONSTANTS['appdata']['menuRubrics']` -- Рубрики верхнего уровня (идентификатор, наименование).
    - `$_CONSTANTS['appdata']['menu']` -- Иерархическое дерево страниц по рубрикам.
- `apptools.php` -- Утилиты для создания описаний страниц.
- `generated_bem_variables.php` -- Генерируемый файл с параметрами последней сборки.

Проект bem
----------

- `WEB_TINTS/source/blocks/shared/project/__polyfills/project__polyfills.js`
- `WEB_TINTS/source/blocks/shared/project/__root/project__root.js`
- `WEB_TINTS/source/blocks/shared/project/__config/project__config.js`
- `WEB_TINTS/source/blocks/shared/project/__helpers/project__helpers.js`
- `WEB_TINTS/source/blocks/shared/project/project.deps.js`

Конфигурация приложения app (блоки `project__*`)
------------------------------------------------

- `WEB_TINTS/source/blocks/shared/project/__root/project__root.js`
- `WEB_TINTS/source/blocks/shared/project/__polyfills/project__polyfills.js`
- `WEB_TINTS/source/blocks/shared/project/__config/project__config.js`
- `WEB_TINTS/source/blocks/shared/project/__helpers/project__helpers.js`
- `WEB_TINTS/source/blocks/shared/project/project.js`

(TODO: Дописать про структуру конфигурации, процесс её построения, использование. М.б., выделить в отдельный док-т.)

Расширение конфигурации проекта в рантайм (пример, передача параметров в `app.js`)
----------------------------------------------------------------------------------

- `http://localhost:5590/WEB_TINTS/core/app.html?useSockets=true&catchSocketsError=true#tcm_Reports_efficiency`
- `http://youcomp.geyser.ru:5590/WEB_TINTS/core/app.debug.html?DEBUG=true&audioNotifications=false#tcm_Monitoring_KO`

Переопределять можно все параметры, имеющие смысл в контексте `project.config`.

Системное (на локальной машине `Miheev`)
----------------------------------------

- `C:/nginx-1.11.10/conf/nginx.conf`
- `C:/nginx-1.11.10/logs/error.log`
- `C:/_logs/nginx-error.log`
- `C:/Windows/php.ini`
- `C:/_logs/php.log`
- `C:/Windows/System32/drivers/etc/hosts`
- `C:/Apache24/conf`
- `C:/Apache24/conf/httpd.conf`
- `C:/Apache24/conf/extra/httpd-vhosts.conf`

Системное (на сервере `youcomp`)
--------------------------------

- `c:/nginx-1.9.7/conf/nginx.conf`
- `c:/php_5.6.11/php.ini`

