# ESGames

We build a hub for online games with your friends and family.

## Technologies

**BE:** Golang, WebSocket (Gorilla)

**FE:** TypeScript, Solid.js, Sass

## Build instructions

```sh
$ docker build -t esgames . 
$ docker run --rm -it -p 8000:8000 esgames
```