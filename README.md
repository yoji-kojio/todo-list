# todo-list

## Project setup

### Docker Setup
```
$ docker-compose up
```
App will be available on  `http://localhost:8080`.

### Local setup
```
npm install
```

#### Runs `json-server`
This command will run `json-server` to simulate our endpoint.
`json-server` needs to run on port `3000` and will read/write `db/database.json`.
```
npm run db:serve
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Run your unit tests
```
npm run test:unit
```

#### Lints and fixes files
```
npm run lint
```
