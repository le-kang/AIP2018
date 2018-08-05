# Get started with Angular or React

This week, two simple Todo List apps ([angular-example](./angular-example) and [react-example](./react-example)) are provided, written in Angular and React respectively. The apps look and function exactly in a same way compared with last week's express Todo List app (server request counter is removed as both apps are pure client-side Single Page App).

`create-react-app` and `@angular/cli (ng new)` are used to scaffold the apps. Both apps have `Todo` and `TodoList` components. 

To run the Angular example app:
```bash
cd angular-example
npm start # or using ng serve --open
```
It is recommended to install `@angular/cli` globally in your own computer. You can use `ng` to generate components and services. It is a very handy tool for Angular development. Following are the commands I used while developing the Todo List app with Angular:
```bash
ng generate component todo
ng generate component todo-list
ng generate service todo
``` 

To run the React example app:
```bash
cd react-example
npm start
```
You can use `npx` to execute `create-react-app` without installing it globally. 