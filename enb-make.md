> $Id: enb-make.md 10445 2018-08-05 13:05:22Z miheev $
> $Date: 2018-08-05 16:05:22 +0300 (Вс, 05 авг 2018) $

Сборка bem-проекта (утилитой enb)
=================================

ENB — инструмент для сборки веб-проектов, построенных по методологии БЭМ.

См.:

- [ENB / Инструментарий / БЭМ](https://ru.bem.info/toolbox/enb/)
- [enb/enb: Tool for building web projects, BEM bundler.](https://github.com/enb/enb)

Конфигурационные файлы
----------------------

Структура bem-проекта (уровни переопределения, шаблоны для bem-tools/create)
описывается в файле:

- `WEB_TINTS/source/.bemrc.js`

Конфигурация сборки задаётся в файле:

- `WEB_TINTS/source/.enb/make.js`.

В папке `WEB_TINTS/source/.enb/techs` хранятся доп. модули ("технологии") для
обработки различных типов файлоы:

- `bemjson-to-json.js`: Преобразование сгенерённой для пакета структуры
  страницы (после bemtree) в json.
- `enb-repack-bemhtml.js`:  Переупаковка пакетов с шаблонами.
- `enb-repack-browser.js`: Переупаковка пакетов со скриптами.
- `enb-repack-styles.js`: Переупаковка пакетов со стилями.

Переупаковка заключается в фильтрации блоков для общего (`App`) или кастомных
пакетов. Соотв., общие блоки включаются в общий пакет, остальные остаются
только в кастомных.

### TODO: Переделать переупаковку с использованием merge/substract

См. merge/substract/intersect:

- `BEM.decl.merge()` и `BEM.decl.subtract()` в [bem-tools/api](https://github.com/bem-archive/bem-tools/blob/dev/docs/api/api.ru.md)
- [Операции над декларациями](https://ru.bem.info/methodology/declarations/#Операции-над-декларациями)

Запуск
------

Запуск сборки возможен:

1. С помощью консольного вызова enb (должен быть установлен глобально):

- `enb make {target|package name}` (`target`, eg: 'docs', 'specs')
- `YENV="inject" enb make {target|package name}`
- `enb server`

2. Из сборщика gulp (в составных командах):

- `gulp all`
- `gulp make`
- `gulp remake`

3. Из менеджера npm:

- `npm run -s server`
- `npm run -s docs`
- `npm run -s specs`
- `npm run -s make`
- `npm run -s all`

Процесс сборки
--------------

Исходными файлами для сборки являются пакты (bundles), расположенные в папке
`WEB_TINTS/source/pages`, вида:

- `WEB_TINTS/source/pages/{PkgName}/{PkgName}.bemjson`

Из них в процессе обработки автоматически создаётся набор файлов вида:

- `WEB_TINTS/source/pages/{PkgName}/{PkgName}.*`

А именно:

- `{PkgName}.deps.js` -- Файл зависимостей пакета.
- `{PkgName}.bemdecl.js` -- Список деклараций используемы в пакете блоков.
- `{PkgName}.json` -- Bemjson результат обработки пакета (технология `bemjson-to-json`; см. выше).
- `{PkgName}.htm` -- Минимизированный html-контент пакета.
- `{PkgName}.html` -- html-контент пакета.
- `{PkgName}.bemhtml.js` -- Bemhtml-шаблоны.
- `{PkgName}.bemhtmlx.js` -- Пересобранные (технология `enb-repack-bemhtml`; см. выше) bemhtml-шаблоны.
- `{PkgName}.browser.js` -- Клиентский js-код.
- `{PkgName}.browserx.js` -- Пересобранный (технология `enb-repack-browser`; см. выше) клиентский js-код.
- `{PkgName}.styles.css` -- Стили.
- `{PkgName}.styles.css.map` -- Sourcemaps для стилей.
- `{PkgName}.stylesx.css` -- Пересобранные (технология `enb-repack-styles`; см. выше) стили.

Постобработка
-------------

Позже, во время выполнения команды `inject` (`gulp inject` или в составе
комплексных `gulp remake` или `gulp all`) происходит дополнительная обработка
файлов пакетов (styles, browser, bemhtml).

См. раздел "Постобработка" в документе [Процедура сборки и конфигурация](make.md).

Исходные компоненты
-------------------

Во время сборки по мере необходимости (указаны в общем файле зависимостей
проекта `WEB_TINTS/source/blocks/shared/app/app.deps.js` или присутствуют в
результирующем bemtree текущей страницы) подключаются библиотечные компоненты
из папок `WEB_TINTS/source/blocks/*`.

См. [Компонетны БЭМ-проекта (блоки)](bem-blocks.md).
