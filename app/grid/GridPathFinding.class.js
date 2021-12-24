import { generateQueryConstructor } from '../utils/object.utils.js'
import AStarFinder from '../lib/pathfinding/AStarFinder.js'
import PathFindingGrid from '../lib/pathfinding/Grid.js'

window.AStarFinder = AStarFinder
window.PathFindingGrid = PathFindingGrid

class GridPathFinding {
    constructor() {
        generateQueryConstructor.call( this, ...arguments )
    }
    generateHelperGrid() {
        const { grid: { gridcells, numRows, numCols } } = this
        const helperGrid = []

        for ( let row = 0; row < numRows; row++ ) {
            const helperRow = []

            for ( let col = 0; col < numCols; col++ ) {
                const position = `${ row }-${ col }`
                const cell = gridcells[ position ]

                helperRow.push( cell.isBlocked ? 1 : 0 )
            }
            helperGrid.push( helperRow )
        }

        return helperGrid
    }
    generateHelperPath() {
        const helperGrid = this.generateHelperGrid()
        const pathFindingGrid = new PathFindingGrid( helperGrid )

        const outColRow = this.generateColRow( this.outCell.position )
        const inColRow = this.generateColRow( this.inCell.position )

        const aStarFinderConfig = {
            weight: this.grid.settings.verticesWeight,
        }
        const aStarFinder = new AStarFinder( aStarFinderConfig )

        const helperPath = aStarFinder.findPath(
            ...outColRow,
            ...inColRow,
            pathFindingGrid
        )

        return helperPath
    }
    generateColRow( position ) {
        return position.split( '-' ).map( item => parseInt( item ) ).reverse()
    }
}

export default GridPathFinding

// https://github.com/qiao/PathFinding.js/
// https://qiao.github.io/PathFinding.js/visual/