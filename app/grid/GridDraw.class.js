import { generateQueryConstructor } from '../utils/object.utils.js'
import GridPathFinding from './GridPathFinding.class.js'

class GridDraw {
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
        const { outCell, inCell, grid, grid: { svgElement } } = this
        const gridPathFinding = new GridPathFinding({ grid, outCell, inCell })
        
        this.helperPath = gridPathFinding.generateHelperPath()

        const pathElement = svgElement.querySelector( 'path' )
        pathElement.setAttribute( 'd', this.buildPathD() )
    }
    buildPathD() {
        const { outCell, inCell, grid: { settings: { cellSize, borderSize } } } = this

        const [ rowOut, colOut ] = outCell.position.split( '-' )
        const [ rowIn, colIn ] = inCell.position.split( '-' )

        function generateM( startPos ) {
            return ( ( startPos * cellSize ) - ( cellSize / 2 ) ) + ( startPos * borderSize * 2 )
        }

        const m1 = generateM( parseInt( colOut ) + 1 )
        const m2 = generateM( parseInt( rowOut ) + 1 )

        let pathD = `M${ m1 } ${ m2 }`
        const distance = cellSize + borderSize * 2

        for ( let i = 0; i < this.helperPath.length - 1; i++ ) {
            const [ col, row ] = this.helperPath[ i ]
            const [ colNext, rowNext ] = this.helperPath[ i + 1 ]

                 if ( colNext < col ) pathD += ` h-${ distance }`
            else if ( colNext > col ) pathD += ` h${ distance }`
            else if ( rowNext < row ) pathD += ` v-${ distance }`
            else if ( rowNext > row ) pathD += ` v${ distance }`
        }

        return pathD
    }
}

export default GridDraw
