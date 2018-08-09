> $Id: server-data.md 10527 2018-08-09 15:30:43Z miheev $
> $Date: 2018-08-09 18:30:43 +0300 (Чт, 09 авг 2018) $

Описания данных на сервере
==========================

Структура данных списка КО
--------------------------

- `WEB_TINTS/release/core/scripts/php/app/library/Library/Data.php` -- Общие данные приложения.
- `WEB_TINTS/release/core/scripts/php/app/library/Library/KOData.php` -- Описание и методы для работы с данными КО

В общих данных задаются статические словари и (потенциально) прочие константы для работы приложения и передачи клиенту.

В `KOData` описиваются описания данных и методы для работы со списком КО.

Свойство `$objects_list_columns` содержит описание полей данных для запроса данных и показа информации в таблицах, полях фильтра и т.д. на клиенте:

```php
    public $objects_list_columns = [
        [
            'id'        => 'objID',
            'hidden'    => true,
            'key'       => true,
        ],
        [
            'id'        => 'name',
            'title'     => 'Наименование КО',
            'required'  => true,
        ],
        [
            'id'         => 'typeID',
            'title'      => 'Тип КО',
            'filter'     => 'selector_group',
            'filterForced' => true,
            'defaultValue' => '__ALL__', // По умолчанию выбрано всё
            'group_id'   => 'separated',
            'dict'       => 'objTypesBrief',
            'data_dict'  => 'objTypesCodes',
            'hints_dict' => 'objTypes',
            'mode'       => 'multiple',
            'required'   => true,
            'show'       => true,
        ],
        [
            'id'        => 'division',
            'title'     => 'Подразделение',
            'datasets'  => 'TS,LS',
            'dict'      => 'division',
            'filter'    => 'select',
            'dict_tree_key' => 'parentID', // Иерархическая структура (ключ родителя)
            'dict_mode' => 'check', // Множественный выбор
            'show'      => true,
        ],
        // ...
```

См. контроллеры для работы с данными:

- `WEB_TINTS/release/core/scripts/php/app/controllers/CommonDataController.php`
- `WEB_TINTS/release/core/scripts/php/app/controllers/KODataController.php`

Запрос получения конфигурации проекта
-------------------------------------

Метод `get_AppParams_` общего контроллера `Layout` для приложения
`appllication` (запрос `{{approot}}application/Layout/get_AppParams_` см.
`WEB_TINTS/release/core/scripts/php/app/controllers/LayoutController.php`)
подготавливает и отправляет клиенту (конкретно, в модуль `app`) конфигурацию
проекта.

Это первый запрос клиента, поэтому именно на нём происходит проверка
авторизации библиотечным модулем `SecureAjax`
(`WEB_TINTS/source/blocks/libs/SecureAjax/SecureAjax.js`). В случае
необходимости перед возвратом ответа в `requestor` (и выше по цепочке вызовов)
пользователю предалагается пройти авторизацию.

```javascript
{
    config: {
        // Параметры сборки
        bem: {
            projectName: 'vektor-element',
            projectVersion: '0.0.9',
            dateTag: '180809-144138',
            hashTag: 'd21a4e',
            projectTag: '0.0.9 @ 180809-144138 | d21a4e',
        },
        // Адрес сервера сокетов. См. `WEB_TINTS/source/blocks/libs/socket/socket.js`.
        websocketUrl: 'http://youcomp.geyser.ru:8083',
        // // Адрес ГИС сервера. На клиенте не используется.
        // mapserverUrl: 'http://youcomp.geyser.ru:5588',
        cache: {
            // Константы с временами жизни словарей.
            lifetime_default: 3600,
            lifetime_short: 300,
            lifetime_supershort: 60,
            lifetime_long: 86400,
            _DATA_TYPES: { /* Список словарей и их параметры. См. в конце файла `config_constants.php`. */ },
        },
        // Параметры приложения
        appdata: {
            defaultPage: 'app:tcm', // Страница по умолчанию
            pages: { /* Описания страниц системы */ },
            menuRubrics: [ /* Рубрики меню верхнего уровня */ ],
            menu: { /* Иерархическое описание меню */ },
        },
        // Параметры времени жизни токена безопасности. Из `config_constants.php`.
        token: {
            life_time: 1800,
            save_time: 60,
            refresh_time: 30,
        },
        // Токен безопасности. Перевыпускается периодически в соотв. с параметром
        // конфигурации сервера `token->refresh_time` (задаётся в `config_constants.php`).
        nodeToken: '238139015338137265b6c23de202de3.15654825',
        // Путь к корню веб-сервера
        approot: 'http://youcomp.geyser.ru:5590/WEB_TINTS/release/',
    },
    // Информация о текущем пользователе
    user: {
        username: 'GEYSER//miheev',
        userID: 90,
        isAdmin: true,
        isOperator: true,
    },
}
```

Полученные данные обрабатываются в методе `_acceptAppParams` компонента `app`
(`WEB_TINTS/source/blocks/shared/app/app.js`) и сохраняются в свойстве
`app.config`.

Запрос основных данных
----------------------

Запрос основных данных не является обязательным (в отличие от параметров
приложения), но чаще всего (если страница работает со списком КО) он всё-таки
производится.

Адрес запроса:

- `{{approot}}application/KOData/getInitialData`.

Запрос обрабатывается методом `getInitialData` контроллера `KOData`
(`WEB_TINTS/release/core/scripts/php/app/controllers/KODataController.php`).

Возвращается набор данных от библиотечного модуля `KOData` (``):

```php
    $this->_responseData = array(
        'datasets' => $KOData->objects_list_datasets,
        'columns' => $KOData->objects_list_columns,
        'search_filter' => $KOData->objects_list_search,
        'used_dicts' => $KOData->objects_list_columns_dict,
    );
```

Полученные данные описывают структуру представления списка КО.

Сам список КО предоставляется другим запросом к тому же контроллеру:

- `{{approot}}application/KOData/getDataColumns`.

Параметры запроса:

- `userID` - Идентификатор пользователя.
- `columns` -- Список необходимых параметров списка КО (строка объединённых через запятую идентификаторов полей данных).

Для каждого запрошенного параметра возвращается список значений из базы данных:

```javascript
{
    '{keyId}' : [ /* Список значений... */ ],
    // ...
}
```

Запрос словарей
---------------

Адрес запроса:

- `{{approot}}application/CommonData/getDictsQueue`.

Параметры запроса:

- `userID` -- Идентификатор пользователя.
- `lifetime` -- Время кеширования ответа (по умолчанию не кешируется).
- `idlist` -- Список словарей (строка объединённых через запятую идентификаторов полей данных).

Загрузка словарей производится через кеширующие методы `app` (`WEB_TINTS/source/blocks/shared/app/app.js`):

- `load_dicts` -- Метод низкого уровня (проверка загруженности, загрузка при необходимости). Используется всеми нижеперечисленными методами.
- `callback_dicts` -- Загрузка словарей с колбеками.
- `resolve_dicts` -- Получение данных/словарей с проверкой загруженности через промис.
- `resolve_dicts_spread` -- Распределение результатов загрузки словарей в обычный массив для принятия в spread. Возвращает промис.

Запрос данных/ресурсов
----------------------

Запросы произвольных данных и ресурсов (напр., ресурсов пакетов и прочих
зависимостей) производятся методами компонента `app`
(`WEB_TINTS/source/blocks/shared/app/app.js`):

- `load_assets` -- Загрузить ресурсы по списку. Метод низкого уровня. Используется всеми нижеперечисленными методами.
- `load_page_assets` -- Загрузка всех ресурсов (указанных в поле `assets`) для данной страницы.
- `callback_assets` -- Загрузка ресурсов по списку с обратными вызовами.
- `resolve_assets` -- Загрузка ресурсов через промисы.
- `resolve_assets_spread` -- Распределение результатов загрузки данных в обычный массив для принятия в spread. Возвращает промис.

