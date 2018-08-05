> $Date: 2018-08-05 17:28:07 +0300 (Вс, 05 авг 2018) $
> $Id: fake-pages.md 10453 2018-08-05 14:28:07Z miheev $

Демо-страницы (fake-pages)
==========================

Описания демо-страниц задаются вместе с описанием обычных страниц системы, содержатся в собственной папке `WEB_TINTS\release\core\scripts\php\app-config\fake-pages` и подключаются в меню обычным образом, напр.:
```php
    // ...
    [ 'title' => 'Задачи', 'id' => 'tcm_Planning_Tasks' ],
    [ 'title' => 'Задачи (вариант)', 'id' => 'tcm_Planning_Tasks_FAKE' ],
```

В описаниях используется особый хелпер:
```php
$pageId = getPageId(__FILE__);
$pageTitle = 'ГДЦ: Планирование задач';
$pageHtml = '{{coreUrl}}fake-pages/tcm/' . $pageId . '.html';
createFakePage($pageId, $pageTitle, $pageHtml);
```

`$pageHtml` -- путь к raw-html контенту демо-страницы, напр., в данном случае:

- `WEB_TINTS\release\core\scripts\php\app-config\fake-pages\tcm\tcm_Planning_Tasks_FAKE.php`

