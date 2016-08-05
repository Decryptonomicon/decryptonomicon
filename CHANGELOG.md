# Decryptonomicon
## Change Log

This change log should have most recent changes at the top. Just below this section.

### 2016-08-04 (getting a staic server)
```
docker-compose run --rm web npm install finalhandler serve-static --save
```

### 2016-08-04 (The Beginning)

Getting setup

#### Dockerfile
```
FROM instructure/node:6

ENV APP_HOME /usr/src/app/
ENV PATH /usr/src/app/node_modules/.bin:$PATH
WORKDIR $APP_HOME
```

#### docker-compose.yml
```
version: '2'

services:

  web: &web
    build: .
    environment:
      VIRTUAL_HOST: decryptonomicon.*
    volumes:
      - .:/usr/src/app
      - node_modules:/usr/src/app/node_modules

  # webpack:
  #   <<: *web
  #   command: npm run webpack-watch

volumes:
  node_modules:
    driver: local
```

#### Console love
```
sudo chown -R `whoami` .
chmod -R 777 ./
docker-compose run --rm web bash -c "npm init; npm install --save-dev babel-core babel-loader babel-plugin-rewire babel-plugin-transform-object-assign babel-plugin-transform-object-rest-spread babel-polyfill babel-preset-es2015 babel-preset-react babel-template babel-types chai eslint eslint-plugin-react mocha mocha-logger page react react-addons-test-utils react-dom webpack react-script-loader bootstrap bootstrap-webpack css-loader less-loader style-loader url-loader"
sudo chown -R `whoami`:9999 .
sudo find . -type f -exec chmod 664 {} \;
sudo find . -type d -exec chmod 775 {} \;
chmod +x bin/*
```
