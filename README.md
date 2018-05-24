# Cube of life

POC

Conway's Game of life on a cube

![gif](/doc/cube.gif)

## Install

Clone the project and run

```bash
$ npm install
```

## Browse / develop

```bash
$ npm run start
```

## TODO
- Currently, only the first face is applied on the cube, and so is repeated
on all the cube faces even if the five other are correctly computed. I have
to find a way to apply the six computed textures on the six cube faces.
- Create a UI to change the speed, the density and the number of cells by
faces.
- Add a gif on the README
