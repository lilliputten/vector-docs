> $Id: server-side.md 10455 2018-08-05 15:55:35Z miheev $
> $Date: 2018-08-05 18:55:35 +0300 (Вс, 05 авг 2018) $

Серверная часть
===============

Общая информация
----------------

Сервер работает на связке php/phalcon. См.:

- [Высокопроизводительный PHP Фреймворк - Phalcon Framework](https://phalconphp.com/ru/)

См. [Структура каталогов](catalogues.md), разделы "Серверная часть", "Ядро
серверной части" и "Код и библиотеки phalcon/php сервера" для информации о
структуре каталогов на сервере.

Для получения данных от сервера приложений используется nodejs приложение
"Купол".

Клиент "Купол"
--------------

В `WEB_TINTS/release/core/scripts/nodejs` расположено приложение клиента
"Купол", отвечающего за взаимодействие с сервром данных.

См. методы создания запросов и получения данных в
`WEB_TINTS/release/core/scripts/php/app/library/Library/Helper.php`.

Сервер php/phalcon
------------------

Папка `WEB_TINTS/release/core/scripts/php` содержит весь серверный код.

Папка `WEB_TINTS/release/core/scripts/php/vendor` -- установленные в
атоматическом режиме php-библиотеки. См. [Серверные библиотеки
php/phalcon](php-libs.md).

`WEB_TINTS/release/core/scripts/php/app` -- общие файлы приложения phalcon.

Файлы конфигурации сервера находятся в папке
`WEB_TINTS/release/core/scripts/php/app/config/`, основные параметры -- в файле
`config_constants.php`. См. [Конфигурация системы](configuration.md).

Приложение SPA
--------------

`WEB_TINTS/release/core/scripts/php/app-config` -- конфигурация SPA-приложения
(описания страниц, меню системы).

См. [Одностраничная архитектура приложения](single-page-app.md).

Авторизация
-----------

Папки `WEB_TINTS/release/ADAuth` и `WEB_TINTS/release/ADAuthErr` -- авторизация
пользователя в системе.

Отдельные приложения в составе сервера
--------------------------------------

(TODO: Как это правильно называть?)

Расположены в папках вида `WEB_TINTS/release/{appName}`

- `WEB_TINTS/release/element-dc`
- `WEB_TINTS/release/element-tcm`
- `WEB_TINTS/release/element-umto`

Общий код (получение конфигурации, загрузка словарей и общих данных) находится
в отдельном приложении `application`:

- `WEB_TINTS/release/application`

Параметры каждого приложения и настройка прав доступа к его контроллерам
находится в файлах `WEB_TINTS/release/{appName}/scripts/php/app/config/config.php`.

