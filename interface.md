> $Id: interface.md 10471 2018-08-06 14:35:05Z miheev $
> $Date: 2018-08-06 17:35:05 +0300 (Пн, 06 авг 2018) $

Интерфейс системы
=================

Структура разметки основной страницы (контейнер SPA)
----------------------------------------------------

Статическая структура (не изменяемая в процессе переключения страниц):

- `body.page` -- Страница.
    - `.box_id_layoutBox.box_root` -- Секция (box) верхнего уровня.
        - `.NavHeader.box_id_NavHeaderBox` -- Секция с шапкой страницы (меню, заголовок, пр.).
        - `.progressbar_main.box_id_progressbarBox` -- Системная полоса индикации занятости системы (progressbar).
        - `.app.box_id_appBox` -- Секция-контейнер страниц приложения и сам компонент приложения. См. ниже.

Компонент `app`
---------------

Ключевой компонент системы. (TODO: Требуется декомпозиция. См. раздел
"Реализация" в [Одностраничная архитектура приложения](single-page-app.md#Реализация).)

Модификаторы `app_*` подключают дополнительный функционал:

- `NavMenu` -- Средства работы с меню/шапкой/навигацией.
- `controllers` -- Средства работы со связанными контроллерами.

Содержимое страниц разворачивается во вложенном элементе `container`.

Ссылка на инстанс текущего блока `app` системы (он всегда один) доступен на
глобальном уровне как `window.app` (или просто `app`).

В списке зависимостей блока `WEB_TINTS/source/blocks/shared/app/app.deps.js`
содержится список всех используемых в системе блоков.

Блоки, используемые только в custom-пакетах (не `App`; напр., в `MapView` Или
`Report`) указываться в общих зависимостях не должны, но должны быть указаны
или подключены в соответствующем пакете
(`WEB_TINTS/source/pages/MapView/MapView.bemjson` или
`WEB_TINTS/source/pages/Report/Report.bemjson` соотв.)

Конфигурация проекта -- блок `project`
--------------------------------------

Конфигурация проекта задаётся в модуле `project`, делящемся на следующие
элементы (в порядке подключения зависимостей):

- `root` -- Базовые определения и характеристики окружения (позже доопределяется в `config`).
- `polyfills` -- "Пустой" элемент. Определяет на глобальном уровне отсутствующие "замазки" (`Object.values`, `Object.keys`, `Object.entries`, `Object.assign`, `Date.now`, `String.includes`, `String.startsWith`, `String.endsWith` и т.д.)
- `config` -- Конфигурация системы (основывается на определениях из `root`).
- `helpers` -- Вспомогательные утилиты.

Модуль `project` доступен на глобальном уровне (`window.project`).

Рекомендуется подключать как зависимость. Можно использовать отдельные
элементы, напр.: `project__config` позволит использовать только подмодуль
конфигурации проекта. Аналогично для `project__helpers`.

Основные компоненты построения интерфейса
-----------------------------------------

Основа для построения интерфейса: стандартные компоненты из библиотеки `bem-components`:

- `WEB_TINTS/source/libs/bem-components` (устанавливается через bower; см. [Используемые библиотеки](used-libs.md))
- [6.0.0 / bem-components / Библиотеки / Платформа / БЭМ](https://ru.bem.info/platform/libs/bem-components/6.0.0/)
- [bem/bem-components: Set of components for sites development](https://github.com/bem/bem-components)

Модификации для стандартных компонент расположены в уровне переопределения
`root` (`WEB_TINTS/source/blocks/root`).

Основные элементы интерфейса:

- `input` -- Текстовый ввод. См. [bem-components / input](https://ru.bem.info/platform/libs/bem-components/6.0.0/desktop/input/)
- `textarea` -- Ввод относительно большого фрагмента текста. См. [bem-components / textarea](https://ru.bem.info/platform/libs/bem-components/6.0.0/desktop/textarea/)
- `select` -- Раскрывающийся список с выбором из нескольких вариантов. См. [bem-components / select](https://ru.bem.info/platform/libs/bem-components/6.0.0/desktop/select/)
- `menu` -- Выбор из списка вариантов. См. [bem-components / menu](https://ru.bem.info/platform/libs/bem-components/6.0.0/desktop/menu/)
- `button` -- Кнопка. См. [bem-components / button](https://ru.bem.info/platform/libs/bem-components/6.0.0/desktop/button/)
- `checkbox` -- Элемент выбора состояний да/нет. См. [bem-components / checkbox](https://ru.bem.info/platform/libs/bem-components/6.0.0/desktop/checkbox/)
- `radio` -- Элемент радиопереключателя. См. [bem-components / radio](https://ru.bem.info/platform/libs/bem-components/6.0.0/desktop/radio/)
- `checkbox-group` -- Группа чекбоксов. См. [bem-components / checkbox-group](https://ru.bem.info/platform/libs/bem-components/6.0.0/desktop/checkbox-group/)
- `radio-group` -- Группа радио-переключателей. См. [bem-components / radio-group](https://ru.bem.info/platform/libs/bem-components/6.0.0/desktop/radio-group/)
- `control-group` -- Визуальная группировка элементов в один элемент. См. [bem-components / control-group](https://ru.bem.info/platform/libs/bem-components/6.0.0/desktop/control-group/)
- `attach` -- Выбор файла в файловой системе (для загрузки или использования в js-коде). См. [bem-components / attach](https://ru.bem.info/platform/libs/bem-components/6.0.0/desktop/attach/)

Организация разметки
--------------------

Для организации пространственной разметки интерфейса служат секции `box`. См.
[Секции box -- основной структурный элемент построения
интерфейса](interface-box-sections.md).

Для объединения второстепенных управляющих компонент служат панели `boxActions`
(примешиваем к секциям `box`).

Добавлением модификатора `filters` к панели `boxActions` примешивается
функционал контроллера фильтров.

Группировка управляющих компонент
---------------------------------

Отдельные управляющие компоненты группируются блоками `actions` (с элементами
различных типов: `selector_group`, `selector`, `date`, `select`, `action`,
`button`, `buttonNav`, `input`, `text`). Блок `ShowInfo` предназначен для вывода
статической или динамически обновляемой информации.

Блоки `actions` предполагаются как основной компонент для организации взаимодействия с пользователем.

Могут использоваться:

- В управляющих плавающих панелях на картах (`MapView`). В этом случае применяется следующая структура: `.MapView__actionsGroup > .KOActions.MapView__actions .KOActions__actions.actions > *`.
