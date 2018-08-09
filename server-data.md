> $Id: server-data.md 10521 2018-08-09 12:44:56Z miheev $
> $Date: 2018-08-09 15:44:56 +0300 (Чт, 09 авг 2018) $

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
`appllication` (запрос `{releasePath}/application/Layout/get_AppParams_` см.
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
    // Токен безопасности. Перевыпускается периодически в соотв. с параметром конфигурации сервера `token->refresh_time` (задаётся в `config_constants.php`).
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
