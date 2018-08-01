> $Id: configuration.md 10430 2018-08-01 10:43:07Z miheev $
> $Date: 2018-08-01 13:43:07 +0300 (Ср, 01 авг 2018) $

Конфигурация системы
====================

## Зависимости, свойства проекта и скрипты (npm/nodejs)

- `WEB_TINTS/source/package.json` -- Конфигурация npm.

## Сборщик enb

- `WEB_TINTS/source/.enb/make.js` -- Конфигурация enb.

См. [Сборка enb](enb-make.md)

## Сборщик gulp

- `WEB_TINTS/source/gulpfile.config.yaml` -- Конфигурация gulp.
- `WEB_TINTS/source/gulpfile.js` -- Управляющий скрипт gulp.

См. [Процедура сборки и конфигурация](make.md)

## Параметры сервера phalcon

- `WEB_TINTS/release/core/scripts/php/app/config/config_constants.php` --
  Параметры конфигурации сервера. Создаётся глобальный ассоциированный
  массив `$_CONSTANTS`, позже используемый для `\Phalcon\Config` (см. ниже).
  (Описания словарей см. в конце файла.)

- `WEB_TINTS/release/core/scripts/php/app/config/config.php` -- Создание
  конфигурации phalcon `\Phalcon\Config`.

## Конфигурация приложений phalcon

- `WEB_TINTS/release/application/scripts/php/app/config/config.php`

- `WEB_TINTS/release/element-dc/scripts/php/app/config/config.php`
- `WEB_TINTS/release/element-tcm/scripts/php/app/config/config.php`
- `WEB_TINTS/release/element-umto/scripts/php/app/config/config.php`

## Структура меню и список страниц системы

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

## Проект bem

- `WEB_TINTS/source/blocks/shared/project/__polyfills/project__polyfills.js`
- `WEB_TINTS/source/blocks/shared/project/__root/project__root.js`
- `WEB_TINTS/source/blocks/shared/project/__config/project__config.js`
- `WEB_TINTS/source/blocks/shared/project/__helpers/project__helpers.js`
- `WEB_TINTS/source/blocks/shared/project/project.deps.js`

## Расширение конфигурации проекта в рантайм (пример, передача параметров в `app.js`)

- `http://localhost:5590/WEB_TINTS/core/app.html?useSockets=true&catchSocketsError=true#tcm_Reports_efficiency`
- `http://youcomp.geyser.ru:5590/WEB_TINTS/core/app.debug.html?DEBUG=true&audioNotifications=false#tcm_Monitoring_KO`

## Системное (на локальной машине `Miheev`)

- `C:/nginx-1.11.10/conf/nginx.conf`
- `C:/nginx-1.11.10/logs/error.log`
- `C:/_logs/nginx-error.log`
- `C:/Windows/php.ini`
- `C:/_logs/php.log`
- `C:/Windows/System32/drivers/etc/hosts`
- `C:/Apache24/conf`
- `C:/Apache24/conf/httpd.conf`
- `C:/Apache24/conf/extra/httpd-vhosts.conf`

## Системное (на сервере `youcomp`)

- `c:/nginx-1.9.7/conf/nginx.conf`
- `c:/php_5.6.11/php.ini`


