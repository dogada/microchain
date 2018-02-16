# MicroChain — simple blockchain prototype with API

## Features
- Swagger/OpenAPI 2.0 is used for API (available on 10010 port)
- Interactive API docs is built with swagger-ui (available on 8080 port)
- Separate docker images are used for API server and frontend, communication via CORS
- Shared javascript code and settings are stored in parent `shared` Docker image
- During development are used node_modules from Docker images, nothing is need to be installed on host system
- Blocks with transactions are stored in MongoDB

## Based on Tiniest Blockchain
https://medium.com/crypto-currently/lets-build-the-tiniest-blockchain-e70965a248b
https://medium.com/crypto-currently/lets-make-the-tiniest-blockchain-bigger-ac360a328f4d


