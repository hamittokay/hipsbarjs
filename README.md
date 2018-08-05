
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
  activator: `#activator-from-left`,
  data,
  position: 'left'
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
