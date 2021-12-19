import Grid from './app/grid/Grid.class.js'

const grid = new Grid({ settings: {
    gridSelector: '#grid',
    cellSize: 50,
    borderSize: 1,
    borderColor: 'gray',
}})

grid.build()
