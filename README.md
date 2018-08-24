

# Hipsbar JS

Hipsbar.js is a tiny dependency free javascript plugin for creating sliding drawers in web apps. You can easily use it as sidebar menus or option drawers.

[Demo](https://hamittokay.github.io/hipsbarjs)

### Usage
```html
<link rel="stylesheet" href="path/to/Hipsbar.css" />
<script src="path/to/Hipsbar.js"></script>
```

```javascript
// Store Your Data
const data = [
  { content: 'HOME', url: '#' },
  { content: 'PRODUCTS', url: '#' },
  { content: 'DEVELOPERS', url: '#' },
  { content: 'CONTACT', url: '#' },
  { content: 'API', url: '#' },
  { content: 'GITHUB', url: '#' },
];

new Hipsbar({
  activator: `#hipsbar-activator`, // required
  data, // default <Array empty>[]
  position: 'left', // default left
  overlay: true, // default false
  blur: true, // default false
  width: 300 // default 350
})
```

### Add Child Items
Your items can have child items as many as you want. Hipsbar will mount them to DOM recursively.
##### Usage
```javascript
const data = [
  ...
  {
    content: 'JS FRAMEWORKS',
    children: [
      {
        content: 'VUE',
        url: 'https://vuejs.org',
        children: [
          content: 'VUEX',
          url: 'https://vuex.vuejs.org/guide'
        ]
      },
      {
        content: 'REACT',
        url: 'http://reactjs.org/',
        children: [
          content: 'REDUX',
          url: 'https://redux.js.org/'
        ]
      }
    ]
  }
  ...
]
```
### Load Via Ajax Url
Load data from the newly set data source URL.
Avoid using data and dataURL together.
##### Usage
```javascript
new Hipsbar({
  ...
  dataURL: 'https://api.myjson.com/bins/191ibw'
  ...
})
```
### Installation
Install the dependencies and devDependencies and start the server.
```sh
$ npm i -g parcel # if you don't have already
$ npm install
$ npm start
```
### Build
```sh
$ npm run build
```
License
----

MIT

**Free Software, Hell Yeah!**
