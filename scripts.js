import Grid from './app/grid/Grid.class.js'
import gridConfig from './app/config/grid.config.js'

const grid = new Grid( gridConfig )

grid.build()
grid.draw()

