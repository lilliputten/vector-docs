> $Id: testing-and-linting.md 10457 2018-08-05 16:05:26Z miheev $
> $Date: 2018-08-05 19:05:26 +0300 (Вс, 05 авг 2018) $

Тестирование и линтинг
======================

Линтинг
-------

Линтинг (проверка синтаксиса js-кода реализован через bemhint/jshint), файл
конфигурации:

- `WEB_TINTS/source/.bemhint.js`
- `WEB_TINTS/source/.jshintrc`

Проверка кодовой базы запускается по команде `npm run -s lint` (или `bemhint
blocks` из папки `WEB_TINTS/source`), аналог на сервере -- `remote.php?lint`.

Перед сборкой (`all`, `make`, `remake`) запускается проверка линтером. Сборка
начинается только в случае успешного прохождения проверки.

Модульные тесты
---------------

Модульные тесты (для всех блоков, в которых они реализованы) собираются и
запускаются целевой задачей сборщика enb specs:

- `npm run -s specs`
- `enb make specs` (если enb установлен глобально)

Для проведения модульного тестирования необходимо (пока) запустить локальный
сервер разработки bem (`npm run server -s`).

Документация:

- [Mocha - the fun, simple, flexible JavaScript test framework](https://mochajs.org/#table-of-contents)
- [Should.js API documentation - Unit JS](http://unitjs.com/guide/should-js.html)

ВНИМАНИЕ: В силу ряда причин модульное тестирование находится в состояние
эксперимента. Надо разрабатывать подходы к тестам (делать нормальный мокинг,
проектировать testable-компоненты).

Регрессивное тестирование
-------------------------

TODO:
- В процессе размышления.
- TODO: Интеграционные тесты?

- [gemini-testing/gemini: Utility for regression testing of web pages using screenshots](https://github.com/gemini-testing/gemini)
- [Gemini — Yandex Technologies](https://tech.yandex.com/gemini/)
- [Как мы тестируем CSS-регрессии с Gemini. Доклад на BEMup в Яндексе](https://habrahabr.ru/company/yandex/blog/238323/)

