# flashcards
## Developer setup
  for Ubuntu and Windows
## IMPORTANT
**Development runs on Ubuntu or Ubuntu Subsystem on Windows**


### Install Node.js

[Node.js Latest 11.7.0] (https://nodejs.org)

### Install Git

[Git Download](https://git-scm.com/downloads)


### Install VueCli & Firebase CLI

```
npm install -g @vue/cli
npm install -g firebase-tools
```

### Install VS Code & Vetur Plugin

[Vetur Plugin](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

### Clone Project into development folder

```
 git clone https://github.com/FaastStudio/flashcards.git
```

## Github Structure

- master branch (for deploy)
  -- development branch (child of master)(latest version in development/pre deploy)
  -- hotfix branch (child of master) (for hotfixes of public version)
    --- feature branch (child of development) (development of single feature, merged into development and deleted after feature is finished)

## Documentation

[Vue.js **Best documentation worldwide** ](https://vuejs.org/v2/guide/)
[Firebase Docs](https://firebase.google.com/docs/)
[Vuetify Docs **Component Framework**](https://vuetifyjs.com/en/getting-started/quick-start)

## Project setup inside Flashcards Folder
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
