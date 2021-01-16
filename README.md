# i18n-editor
Editor for i18n JSON files

## Requirements

* Создание и сохранение проекта
* Создание локали, указание эталонной локали
* Импорт данных локали из JSON файла 
* Экспорт локали в JSON файл 
* Сравнение всех локалей и пометка о непереведенных значениях
* Поиск ключей
* UI
* Синхронизация проекта и файлов (git, drive, etc)
* Поддержка нескольких пользователей и совместное использование

## План

Backend - Golang
Frontend - Typescript + Angular
Database - Mongo

## Структура данных

project: 
```
{
  name: "i18n";
  locales: [{
   name: "en",
   data: { ... }
  }, {
   name: "ru'
   data: { ... }
  }]
}
```
