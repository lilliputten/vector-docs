
## TODO

2016.10.17, 13:09 -- Локальные расширения конфигурации gulp (eg. `gulpfile.config.local.yaml`)

2016.09.22, 21:10 -- Диапазонное выделение, выбор подветки.

2016.09.15, 17:31 -- Размер поля для даты -- Возможно, стоит хранить в `project_config` и устанавливать при создании блока? (box_actions__input.styl)

2016.09.12, 13:55 -- app: Устанавливать подписку на события каналов через обёртку, которая будет регистрировать события для автоматической отписки при закрытии страницы?

2016.09.08, 16:47 -- (!!!) app: для dict/data (в promise) не удалять-пересоздавать заново переменную-контейнер -- использовать и обнулять старую, если это массив или хеш. Цель -- сохранить работоспособность сохранённых ссылок.

2016.09.08, 14:33

-- Всплывающее окно `select_ko` (или общий переиспользуемый компонент множественного двухоконного выбора): с фильтрами, поиском, выбором представления (в том числе древовидного/иерархического) для выбираемых элементов.

-- Унифицировать работу со всплывающими окнами: модальные диалоги и всплывающие панели (для быстрого выбора элемента) должны использовать один механизм (доработать `popup_dialog`?), используя `popup_controller` (?).

-- Общий выделенный компонент для диалоговых окон (кажется, есть `popup_dialog` -- проверить).

-- Выделить (и доработать) компонент для показа табличных данных (в `objects_list` и в отчётах).

-- Дополнительные типы данных (м.б., сделать общую абстракцию `form_control`):

-- -- `input_date`: ввод даты, выбор из всплывающего календаря.

-- -- `select_tree`: показ и выбор элемента из иерархически организованного списка (в выпадающем меню).

-- -- `select_popup`: выбор элемента в модальном окне. М.б., указывать компонент для показа в окне, который должен иметь типовой интерфейс (`getVal`, `setVal`, `on_change_callback`?).

-- (`data_promise_controller`) Для полей ввода/показа данных и групп интерфейсов (панелей, высплывающих окон) иметь возможность указывать, куда обращаться за данными (dicts, data) -- для случаев переопределённых промисов (как в `object_details`).

2016.08.23, 20:28 -- Посмотреть, от каких событий надо ещё отписываться при закрытии экрана.

2016.08.23, 20:09 -- Перенести отписку от событий в метод `on_page_close` (событие?)

2016.08.23, 16:20 -- Сохранение состояний панелей раздельно для каждого экрана -- в соответствии со значением `panel_box_id` (или id блока-хозяина?)

2016.08.11, 20:00 -- scrolling/clipping for mobile devices (? - opera?)

2016.07.10, 22:03 -- https://github.com/bem-site/bem-lib-site

2016.07.08, 11:26 -- Загрузка и подключение стилей библиотек: возможность использовать fallback-urls (cdn/local etc). (А скрипты?)

2016.06.17, 14:27 -- Отслеживание таймаута при ajax-запросах

2016.05.08, 19:17 -- `panel_box/*` boxes offsets (`split_view` frame background?)

2016.05.08, 20:01 -- Is `objID` need to present in columns list???

2016.05.08, 21:30 -- Store or pack `control_objects_ids`

    - See bug (2016.05.08, 21:30): "414 Request-URI Too Large"

    - WEB_TINTS/release/core/scripts/php/app/controllers/TCMAdministrationController.php : 995
    - project/common.blocks/objects_list/objects_list.js : 427

