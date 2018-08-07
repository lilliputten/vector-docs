> $Id: styling.md 10485 2018-08-07 15:47:02Z miheev $
> $Date: 2018-08-07 18:47:02 +0300 (Вт, 07 авг 2018) $

Стилизация и кастомизация внешнего вида
=======================================

Для генерации css стилей исполльзуется перпроцессор Stylus. См. [stylus-lang.com](http://stylus-lang.com/).

Основные параметры стилей отображения задаются в файлах .styl, расположенных в
папке `WEB_TINTS/source/blocks/.includes`. Подключение происходит в файле
конфигурации сборщика `enb` -- `WEB_TINTS/source/.enb/make.js`:

```javascript
    // ...
    stylusParams = {
        // ...
        use : function (style) {
            // ...
            style.import('../../blocks/.includes/all.styl');
            // ...
        },
    // ...
```

Все параметры и переменные для стилей задаются в самом файле
`WEB_TINTS/source/blocks/.includes/all.styl` и во включаемых файлах.

См. соответствующие модули в папке `WEB_TINTS/source/blocks/.includes`:

- `params.styl` -- Параметры.
- `named-colors.styl` -- Стандартные цвета html/css.
- `colors.styl` -- Цвета, используемые в системе.
- `fonts.styl` -- Шрифты.
- `dimensions.styl` -- Размерности.
- `inputs.styl` -- Параметры для элементов ввода.
- `buttons.styl` -- Кнопки.
- `mixins.styl` -- Примеси и утилиты для переиспользования.
- `tableview.styl` -- Параметры для tableview.
- `NavHeader.styl` -- Параметры для шапки страницы.
- `NavMenu.styl` -- Параметры главного меню.

Для смены цветового решения системы достаточно поменять основной ключевой цвет:

- Параметр `$accent-color` в файле `WEB_TINTS/source/blocks/.includes/colors.styl`.

Можно менять и второстепенный цвет (для альтернативных выделений):

- Параметр `$element-color` там же.

Файлы, используемые в шапке и на заставке системы, располагаются в папке `WEB_TINTS/release/core/i/NavHeader`.

Путь к файлу логотипа укзаывается в двух местах:

- Параметр `prjLogo` конфигурации системы (`config.prjLogo`, см. `WEB_TINTS/source/blocks/shared/project/__config/project__config.js`).
- Параметр `$NavHeader.Logo.image` в контексте препроцессора Stylus для подстановки в css для шапки (см. `WEB_TINTS/source/blocks/.includes/NavHeader.styl`). Задаётся в css-нотации: `url(...)`.

В последнем файле параметр `$NavHeader.Background.image` указывает url для фонового изображения шапки. Может быть опущен, если не используется. Задаётся в css-нотации: `url(...)`.

