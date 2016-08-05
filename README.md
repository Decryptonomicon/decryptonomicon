# Decryptonomicon
https://decryptonomicon.github.io

## Getting Started

We use submodules, so you should clone with `--recursive`

```
git clone --recursive git@github.com:Decryptonomicon/decryptonomicon.git
```

Already cloned without recursive?
```
git submodule update --init --recursive
```

## Preparing your env

Make sure you you have the following versions of docker installed by running
`docker --version; docker-compose --version`
You should have at least these versions installed.
```
Docker version 1.11.2, build b9f10c9
docker-compose version 1.7.1, build 6c29830
```

## Coding

run `docker-compose up`, then code.

This will start up a simple static server (see `server.js`), and webpack.

## Updating the site

```
docker-compose run --rm web npm run webpack
cd decryptonomicon.github.io
git commit -am "Update description"
git push
cd ../
git commit -am "Updating site submodule"
git push
```
