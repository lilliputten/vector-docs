> $Date: 2018-08-01 14:36:06 +0300 (Ср, 01 авг 2018) $
> $Id: used-tools.md 10431 2018-08-01 11:36:06Z miheev $

Используемые инструменты и ПО
=============================

Системный уровень
-----------------

### nodejs

Движок JavaScript. Большинство утилит являются nodejs-пакетами из репозитория npm.

См. [Node.js](https://nodejs.org/)

### shell

Для ряда служебных (второстепенных) задач (напр., патчинг сторонних библиотечных файлов)
используются скрипты на shell. Можно использовать встроенный поставку git
([Git](https://git-scm.com/), не проверялось), CYGWIN или аналоги.

Кроме самого shell используются posix-совместимые команды:

- `basename`,
- `chmod`,
- `cp`,
- `date`,
- `find` (используется линк или копия `find_`, чтобы не путать с windows-командой find),
- `grep`,
- `iconv` (для преобразования ответов серверов при удалённых запросах),
- `pwd`,
- `realpath`,
- `rename`,
- `sed`,
- `test`,
- `wget` (удалённые запросы к серверам),
- `zip`.

**ВАЖНО:** В обычном цикле разработки данные служебные команды не исопльзуются.

Управление проектом
-------------------

### npm

Управление зависимостями nodejs (пакеты в `WEB_TINTS/source/node_modules`),
выполнение служебных скриптов.

- Параметры  проекта, зависимости и скрипты в файле: `WEB_TINTS/source/package.json`.

См. [npm](https://www.npmjs.com/)

### bower

Установка, удаление, обновление библиотек (в `WEB_TINTS/source/libs`).

- Конфигурация: `WEB_TINTS/source/.bowerrc`.
- Список библиотек и параметры: `WEB_TINTS/source/bower.json`.

См. [Bower — a package manager for the web](https://bower.io/)

Сборка
------

### gulp

Поточный сборщик.

- Управляющий файл: `WEB_TINTS/source/gulpfile.js`
- Конфигурация: `WEB_TINTS/source/gulpfile.config.yaml`

См. [gulp.js](https://gulpjs.com/)

### enb

Инструмент для сборки веб-проектов, построенных по методологии БЭМ.

- Конфигурационный файл: `WEB_TINTS/source/.enb/make.js`
- Параметры bem-проекта: `WEB_TINTS/source/.bemrc.js`

См. [ENB / Инструментарий / БЭМ](https://ru.bem.info/toolbox/enb/)

Локальный dev-сервер
--------------------

Используемое ПО:

- Apache (2.4)
- nginx (1.11.10)
- PHP (5.6)

См. [Локальный сервер разработчика](local-dev-server.md)

