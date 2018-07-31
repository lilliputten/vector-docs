> $Id: enb-maker.md 10423 2018-07-31 15:34:45Z miheev $
> $Date: 2018-07-31 18:34:45 +0300 (Вт, 31 июл 2018) $

Сборка утилитой enb
===================

ENB — инструмент для сборки веб-проектов, построенных по методологии БЭМ.

См.:

- [ENB / Инструментарий / БЭМ](https://ru.bem.info/toolbox/enb/)
- [enb/enb: Tool for building web projects, BEM bundler.](https://github.com/enb/enb)

## Конфигурационные файлы

Конфигурация сборки задаётся в файле `WEB_TINTS/source/.enb/make.js`.

В папке `WEB_TINTS/source/.enb/techs` хранятся доп. модули ("технологии") для обработки различных типов файлоы:

- `bemjson-to-json.js`: Преобразование сгенерённой для пакета структуры страницы (после bemtree) в json.
- `enb-repack-bemhtml.js`:  Переупаковка пакетов с шаблонами.
- `enb-repack-browser.js`: Переупаковка пакетов со скриптами.
- `enb-repack-styles.js`: Переупаковка пакетов со стилями.

Переупаковка заключается в фильтрации блоков для общего (`App`) или кастомных пакетов. Соотв., общие блоки включаются в общий пакет, остальные остаются только в кастомных.

### TODO: Переделать переупаковку с использованием merge/substract

См. merge/substract/intersect:

- `BEM.decl.merge()` и `BEM.decl.subtract()` в [bem-tools/api](https://github.com/bem-archive/bem-tools/blob/dev/docs/api/api.ru.md)
- [Операции над декларациями](https://ru.bem.info/methodology/declarations/#Операции-над-декларациями)

## Запуск

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

