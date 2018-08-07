> $Id: obsolette-components.md 10480 2018-08-07 12:15:59Z miheev $
> $Date: 2018-08-07 15:15:59 +0300 (Вт, 07 авг 2018) $

Устаревшие компоненты
=====================

Устаревшие блоки (к замене/удалению)
------------------------------------

Преимущественно используются в заглушках из `fake-pages`.

- `KOLoader` -- интегрирован в `MapList`.
- `box_actions` -- заменён на `boxActions`.
- `box_columns_selector` -- вообще не используется?
- `boxing_sync`
- `boxing`
- `boxset`
- `columns_selector`
- `content_box`
- `datasets`
- `object_details` -- Используется в старом `Admin`. ???
- `objects_list` -- Используется в старом `Admin`. ???
- `panelbox`
- `request_controller` -- Используются `requestor`, `SecureAjax`.
- `split_objects_list`
- `split_view` -- Используется только в демо-страница (fake-pages) и на старом AdminKO.
- `test_controller`
- `vlayout` (Используется `box`).

Устаревшие пакеты (bem-bundles)
-------------------------------

- `AdminKO` -- Старая страница "Администрирование КО"
- `AdminOld` -- Старая страница "Администрирование КО"
- `Test` -- Демонстрация секций `box` в разных режимах. См. `WEB_TINTS/source/blocks/interface/box/_demo`. TODO: Интегрировать в пакет `Demo`?

Файлы конфигурации (экспериментальные и неиспользуемые)
-------------------------------------------------------

Документация:

- `jsdoc.yaml` -- Конфигурация jsdoc (заменить на документацию в enb/make)
- `make-docs.js` -- Тест сборки документации для bem-lib-site

См. скрипт в package.json:

```json
    "docs": "mv bower.json bower.json.SAVE && rm -rf docs tmp && bem-lib-site-data . && bem-lib-site-view tmp/data && mv bower.json.SAVE bower.json",
```

Прочее:

- `.htaccess.demoserver` -- Старый файл конфигурации apache для демо-сайта
- `.project.exclude` -- Описание исключений файлов для дублирования в репозиторий git
- `.travis.yml` -- Travis не исопльзуется (и не будет исопльзоваться?)

