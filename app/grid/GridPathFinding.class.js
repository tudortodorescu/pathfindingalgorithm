import { generateQueryConstructor } from '../utils/object.utils.js'
import AStarFinder from '../lib/pathfinding/AStarFinder.js'
import PathFindingGrid from '../lib/pathfinding/Grid.js'

export default class GridPathFinding {
    constructor() {
        generateQueryConstructor.call( this, ...arguments )
    }
    get outPosition() {
        return this.outCell.position
    }
    get inPosition() {
        return this.inCell.position
    }
    generateColRow( position ) {
        return position.split( '-' ).map( item => parseInt( item ) ).reverse()
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
        
        const outColRow = this.generateColRow( this.outPosition ) 
        const inColRow = this.generateColRow( this.inPosition ) 
        
        const helperPath = (new AStarFinder()).findPath(
            ...outColRow,
            ...inColRow,
            pathFindingGrid 
        )
        
        return helperPath
    }
}
