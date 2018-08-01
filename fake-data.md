> $Id: fake-data.md 10439 2018-08-01 16:05:47Z miheev $
> $Date: 2018-08-01 19:05:47 +0300 (Ср, 01 авг 2018) $

Эмуляция и накопление данных от сервера приложения
==================================================

Демо-данные сохраняются в папке:

- `WEB_TINTS/source/fake-data` (см. параметр `FAKE_DATA_PATH` в
  `config_constants.php` и в `project__config.js`).

Использовать демо-данные на клиенте -- параметр `project.config.USE_FAKE_DATA`.
Устанавливается, если работа в режиме чистого enb-сервера.

Сохранять демо-данные на сервере -- параметр `FAKE_DATA_STORE`
(`config_constants.php`). Все блоки работы с демо-данными оформлены как
`DEBUG-BEGIN..END`, т.е., при создании stable-версии удаляются.

При сохранении и загрузке данных на основе переданных с запросом параметров
рассчитывается уникальное имя файла, вида:

- `WEB_TINTS/source/fake-data/application/Layout/get_AppParams__GET_userID_155.json`
- `WEB_TINTS/source/fake-data/application/KOData/getInitialData_GET_userID_155.json`
- `WEB_TINTS/source/fake-data/application/KOData/getDataColumns_GET_userID_155_columns_objID_name_typeID_division_pos__40746a8b9006e284aaba59031247a95e.json`
- `WEB_TINTS/source/fake-data/application/CommonData/getDictsQueue_GET_userID_155_lifetime_long_idlist_CarModel_DC_DictCh_eaa567a943c771987c3642a36068d893.json`

Если получаемое имя длиннее максимально разрешённого, то используется md5-хэш.

Должна поддерживаться идентичность алгоритмов формирования уникальных имён
файлов(запросов) на сервере и на клиенте.

На сервере см. метод `Helper:makeStoreRequestFilename`
(`WEB_TINTS/release/core/scripts/php/app/library/Library/Helper.php`).

На клиенте: `requestor:makeStoreRequestFilename`
(`WEB_TINTS/source/blocks/libs/requestor/requestor.js`).

Создаваемые уникальные идентификаторы зависят только от набора и значений
параметров, не учитывая их порядок. Некоторые параметры исключаются из
идентификаторов (заменяются на константу `ANY`; см. `anyValuesParams` в обоих
алгоритмах).

Подстановка путей на клиенте происходит в методе
`project__helpers:expand_path`. При этом пути должны задаваться с префиксном
виде, шаблонами типа следующих:

- `{{enbRoot}}someFilename`
- `{{approot}}element-tcm/TCMAnalytics/Report`
- `{{bemjson}}Package.json`

...и т.д.

Необходимые значения для подстановок создаются на этапе вычисления
конфигурации, в `project__config.js`, в зависимости от параметра
`USE_ENB_URLS`.

Пример формирования корневого пути запроса:
```javascript
    rootUrl = /*DEBUG*/USE_ENB_URLS ? enbRoot :
        '../',
```

Для некоторых запросов демо-данные не сохраняются. См. условия в методе
`Helper:storeRequest` (`WEB_TINTS/release/core/scripts/php/app/library/Library/Helper.php`).

Общий способ работы с демо-данными:

1. (Не обязательно.) Очистить демо-данные удалённой командой `cleanFake` (напр. `http://185.41.41.90:8082/WEB_TINTS/remote.php?cleanFake`)

2. На удалённом или локальном сервере (в том числе на enb-сервере под nginx)
   проходятся все запросы, которые будут использоваться во время работы с
   локальным сервером в режиме эмуляции.

3. Если данные формируются на удалённом сервере: Скачать сформированную папку
   `fake-data`. Напр., через
   `http://185.41.41.90:8082/WEB_TINTS/remote.php?getFakeData`. (Локальный
   сервер сам будет сохранять данные в эту папку.)

4. При запуске enb-server в самостоятельном режиме получаем загрузку демо данных на отработанных запросах.

ВНИМАНИЕ: Для того, чтобы enb-server мог работать из-под nginx, необходимо применять патч из `WEB_TINTS/source/!Patches/enb-server`.

