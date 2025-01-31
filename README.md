# Piano App (React + Mobx + Express). Plays for everyone at the same time 

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Комментарии  к проекту
План:
1. Сделать простое пианино на react - играет у всех одновременно (передача данных через web-сокеты)
2. Сделать возможность создания комнат (чтобы можно было играть в разных комнатах)

## Структура проекта
- client
  - components - компоненты
  - services - сервисы и одновременно сторы mobx (потом надо будет разделить)
- server
  - appServer.ts - серверное приложение (express) - пока очень простой вариант с зачатками разделения на множество комнат (в каждом должно быть свое пианино)

