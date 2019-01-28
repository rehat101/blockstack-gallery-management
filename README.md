# blockstack-gallery-management
A tool to manage artworks in your gallery. Built on top of blockstack.org

## How to run
`npm install`

`npm run dev` - runs server in development mode
`npm run prod` - runs server in production mode with optimizations
`npm run build`

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

## Tech Optimizations
- [x] lazy load components using dynamic imports 🔥
- [x] split blockstack, react, mobx, bluebird into chunks using webpack
- [x] lazy load images
- [x] add protected routes
- [x] add 404 if routes aren't found
- [ ] set file headers
- [ ] create index.json for first time users
