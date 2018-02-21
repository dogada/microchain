# MicroChain — simple blockchain prototype with API

Universal React starter kit (Work In Progress).

Main goal is to use best available technologies to create fast and stable web-sites for reasonable time.

## Features
- Swagger/OpenAPI 2.0 is used for API
- Interactive API docs is built with swagger-ui
- Docker is used for development, staging and production
- Separate docker images are used for API server and frontend, communication via CORS
- Next.js and React are used for frontend
- Enabled server-side rendering of universal React components (great for SEO)
- Enabled code-splitting (for every web page is loaded only javascript and css code used on this page)
- For state management is used [fast-redux](https://github.com/dogada/fast-redux) — an improved version of Redux but still compatible with Redux DevTools
- UI is done with [Material-UI](https://material-ui-next.com/) and JSS
- Web application uses Flow static type checking (WIP)
- Shared javascript code and settings are stored in parent `shared` Docker image
- During development are used node_modules from Docker images, nothing is need to be installed on host system (greatly unifies development, staging and production environments and speedups development if different operation systems are used by team)
- Blocks with transactions are stored in MongoDB

## Installation and usage

Checkout the repository and then either build Docker images locally or pull them from Docker hub.

To build Docker images locally:
```
npm run build
```

Then to start servers in development mode:
```
npm run dev
```
Please use http://localhost:3000 to access development server.

To pull images from hub.docker.com and start servers in production mode:
```
npm run start
```
Then you should be able to open QA server on http://localhost:3001.

Different ports are used to allow running of both production and development servers on same machine without reverse proxy. In development mode data is stored in `./data/` directory inside project. In production mode `/data/microchain/{qa,staging,prod}/` is used.

To run unit tests, rebuild Docker images and restart servers in production mode:
```
npm run qa
```

To bump package and build version and tag repo with new npm package version:
```
npm run version x.y.z
```

Execute `npm run` to see more commands.

## Based on Tiniest Blockchain idea
https://medium.com/crypto-currently/lets-build-the-tiniest-blockchain-e70965a248b

https://medium.com/crypto-currently/lets-make-the-tiniest-blockchain-bigger-ac360a328f4d

## License

MIT

## Disclaimer

Please don't tell about MicroChain to non-developers. We don't have enough MicroChain coins to satisfy current demand on the market ;)
