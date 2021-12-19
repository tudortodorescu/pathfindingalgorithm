import { generateQueryConstructor } from '../utils/object.utils.js'
import GridPathFinding from './GridPathFinding.class.js'

export default class GridDraw {
    constructor() {
        generateQueryConstructor.call( this, ...arguments )
    }
    get outCell() {
        const gridcells = Object.values( this.grid.gridcells )
        return gridcells.find( gridcell => gridcell.isOutCell )
    }
    get inCell() {
        const gridcells = Object.values( this.grid.gridcells )
        return gridcells.find( gridcell => gridcell.isInCell )
    }
    draw() {
        const { grid, outCell, inCell } = this


        const gridPathFinding = new GridPathFinding({ grid, outCell, inCell })
        const helperPath = gridPathFinding.generateHelperPath()
    
        console.log( 'helperPath', helperPath )
    }
}
