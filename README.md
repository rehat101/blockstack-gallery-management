# blockstack-gallery-management

A tool to manage artworks in your gallery. Built on top of blockstack.org

## How to run
`npm install` - install all dependecies

`npm run dev` - runs server in development mode

`npm run prod` - runs server in production mode with optimizations

`npm run build`


## Custom manifest loader

I have built a custom manifest loader via webpack which takes url options and creates a production-ready manifest file for you. 

_Please note: Use this loader only on your production config_

```javascript 
const manifestLoader = {
  test: /manifest.json$/,
  loader: path.resolve('./manifest-loader/index'),
  options: {
    production: {
      start_url: 'production-url.com',
      icon_src: 'https://produciton-url.com/icon.png'
    }
  }
};
```

## Tech
- React
- MobX
- Styled Components

## Features TODO
- [x] Add artwork
- [x] Artwork page with info
- [ ] Bidding platform
- [ ] Inventory management
- [ ] Gallery profile
- [ ] Edit artwork
- [ ] Delete artwork
- [ ] Share artwork

## Optimizations
- [x] lazy load components using dynamic imports 🔥
- [x] split blockstack, react, mobx, bluebird into chunks using webpack
- [x] lazy load images
- [x] add protected routes
- [x] add 404 if routes aren't found
- [ ] set file headers
- [ ] create index.json for first time users
