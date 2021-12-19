import Grid from './app/grid/Grid.class.js'

const grid = new Grid({ settings: {
    svgSelector: '#gridSvg',
    gridSelector: '#grid',
    cellSize: 25,
    borderSize: 1,
    borderColor: 'gray',
    verticesWeight: 1,
}})

grid.build()
grid.draw()