> $Id: bem-controllers.md 10501 2018-08-08 13:44:10Z miheev $
> $Date: 2018-08-08 16:44:10 +0300 (Ср, 08 авг 2018) $

Контроллеры
===========

Контроллеры используются для загрузки и показа данных пользователю. Можно
выделить основные назначения контроллеров: загрузка, показ, сортировка,
фильтрация данных, постраничный вывод.

Используемые в системе контроллеры
----------------------------------

(Расположены в уровнях переопределения `controllers` или `interface`.)

- `dataloader` -- Загрузка данных (с сервера, модификатор `src:servercolumns`, локально -- `src:local`).
- `pagerCtx` -- Постраничный вывод данных.
- `sortCtx` -- Сортировка данных.
- `viewCtxMixin` -- Базовое api контроллера вывода данных (миксин).
- `tableview` -- Табличный вывод данных (viewCtx).
- `ObjectsSelector` -- Вывод списка элементов (объектов) с возможностью выбора (viewCtx).
- `boxActions:filters` -- Контроллер фильтрации данных для вывода и управление фильтрами.

См. вспомогательные методы (асинронный запуск и инициализация) в `app_controllers`:

- `WEB_TINTS/source/blocks/shared/app/_controllers/app_controllers.js`.

Примеры использования
---------------------

Демонстрационный (упрощённый) пример из метода `initDemoControllers` демо-блока
`WEB_TINTS\source\blocks\test\demo\_tableview\demo_tableview_sort.js` -- работа
с локальными данными и сортировкой.

См. соответствующую демо-страницу локально --
`http://localhost:8080/pages/Demo/Demo.htm?demo=tableview-sort` или на сервере --
`http://youcomp.geyser.ru:5590/WEB_TINTS/release/core/app.debug.html?demo=tableview-sort#Demo`.

В общем виде сначала формируем список стандартных для связывания контроллеров
общих параметров (переменная `commonOptions`). Затем создаётся список связанных
контроллеров (`ctxToPoll`). После этого инициализируем последовательно все
контроллеры (в любом порядке), передавая дополнительные к общим параметрам
данные, требуемые для конкретного контроллера (вызовы методов `initialize`). В
заключение вызов `app.startControllers` запускает все связанные контроллеры
(возвращается промис).

```javascript
    var
        /**
         * Описание данных, вида:
         * [
         *     {
         *         hidden : true,
         *         id : 'objID',
         *         key : true,
         *         show : true,
         *     },
         *     {
         *         id : 'name',
         *         required : true,
         *         show : true,
         *         title : 'Наименование',
         *         filter : true,
         *     },
         *     {
         *         id : 'test',
         *         required : true,
         *         show : true,
         *         title : 'Тестовое значение',
         *         filter : true,
         *     },
         * ],
         */
        tableColumns = this.getDemoTableColumns(),

        /**
         * Отладочные данные, вида:
         * [
         *     {
         *         objID : 2,
         *         name : 'x101xx180',
         *         test : 777,
         *     },
         *     // ...
         * ],
         */
        tableData = this.getDemoTableData(),

        // Общие настройки контроллеров
        commonOptions = {
            id : 'demoTableviewSort',
            columns : tableColumns,
            viewCtx : this._tableview,
            sortCtx : this._sortCtx,
            dataloader : this._dataloader,
            // screenholder: this.params.viewCtx.screenholder,
        },

        // Связанные контроллеры
        ctxToPoll = [
            this._dataloader,
            this._tableview,
            this._sortCtx,
        ]
    ;

    // Установить тестовые данные таблицы
    this._dataloader.setLocalData(tableData);

    // Контроллер сортировки -- `sortCtx`
    this._sortCtx.initialize(
        Object.assign({}, commonOptions, {
            sortKey : 'name',
            // sortMode : 'alphabetical',
        })
    );
    // Контроллер данных -- `dataloader`
    this._dataloader.initialize(
        Object.assign({}, commonOptions, {
            // request_url : '{{approot}}element-tcm/TCMAdministration/get_ControlObjects_DataColumns_',
        })
    );

    // Контроллер взаимодействия с пользователем (показа данных)
    this._tableview.initialize(
        Object.assign({}, commonOptions, {
            // infoCtx : this._box_actions_actions, // ???
            // page_size : Report.params.objectsSelectorPageSize,
        })
    );

    // Запускаем все контроллеры...
    return this._app.startControllers(ctxToPoll);

```

Реальный пример -- метод `startControllers` из модуля
`WEB_TINTS/source/blocks/interface/MapList/__loader/MapList__loader.js`
(загрузка данных для списка объектов в блоке `MapList`).

См. любую страницу с пакетом `MapView`, напр. `tcm_Monitoring_KO`.

```javascript
    var
        params = this.params,

        // Контроллеры
        dataloader = this._dataloader,
        viewCtx = this._viewCtx,
        pagerCtx = this._pagerCtx,
        filterCtx = this._filterCtx,

        infoCtx = filterCtx && filterCtx.domElem,

        // Список описаний колонок данных
        columns = this.prepareColumns(params.columns),

        // Список идентификаторов колонок
        columnIds = columns.map(function(data){ return data.id; }),

        // Общие настройки контроллеров
        commonOptions = {
            columns : columns,
            dataloader : dataloader,
            viewCtx : viewCtx,
            pagerCtx : pagerCtx,
            filterCtx : filterCtx,
            infoContainer : this._infoContainer,
            screenholder : this._screenholder,
        },

        // Связанные контроллеры
        ctxToPoll = [
            dataloader,
            viewCtx,
            pagerCtx,
            filterCtx,
        ]

    ;

    // Контроллер данных -- `dataloader` на собственном dom-узле
    this._dataloader && this._dataloader.initialize(
        Object.assign({}, commonOptions, {
            request_url : params.dataloaderRequestUrl, // Необязательный параметр?
        })
    );

    // Фильтры...
    filterCtx && filterCtx.initialize(
        Object.assign({}, commonOptions, {
            id : 'MapFilters',
            show_filters : this.params.filterUsedColumns, // Показываемые фильтры; если не указано, то все колонки с фильтрами
            search : this.params.initial.searchFilter, // Поле поиска
        }, this.getFilterProps && this.getFilterProps())
    );

    // Контроллер взаимодействия с пользователем (показа данных) -- ObjectsSelector
    viewCtx && viewCtx.initialize(
        Object.assign({}, commonOptions, {
            infoCtx : infoCtx,
        })
    );

    // Пагинатор
    pagerCtx && pagerCtx.initialize(
        Object.assign({}, commonOptions, {
            container : this._pagerContainer,
            default_objects_per_page : 10,
            // Варианты для выбора кол-ва эл-тов на страницу
            // Необязательно: Значения по умолчанию должны
            // быть определены в `pagerCtx`
            objects_per_page_options : [
                // { val : 0, text : 'Все объекты' },
                { val : 1, text : '1 / стр' },
                { val : 3, text : '3 / стр' },
                { val : 5, text : '5 / стр' },
                { val : 10, text : '10 / стр' },
                { val : 20, text : '20 / стр' },
                { val : 50, text : '50 / стр' },
                { val : 100, text : '100 / стр' },
            ],
        })
    );

    // Запускаем все контроллеры...
    return this._app.startControllers(ctxToPoll)
        .then(function(result){
            dataloader._events().on('after_fetch_data', this.onDataLoaded, this);
            this._emit('controllersStarted',result);
            return result;
        }, this)
    ;
```
