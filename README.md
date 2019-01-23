# blockstack-gallery-management
A tool to manage artworks in your gallery

## How to run
`npm install`

`npm run start` - runs webpack in development mode

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
- [ ] add protected routes
- [ ] inspect why network calls to blockstack are slow
- [ ] set file headers
- [ ] create index.json for first time users