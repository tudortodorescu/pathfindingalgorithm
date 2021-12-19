import { generateQueryConstructor } from '../utils/object.utils.js'
import GridCell from './GridCell.class.js'

export default class Grid {
    constructor() {
        generateQueryConstructor.call( this, ...arguments )
    }
    get gridElement() {
        return document.querySelector( this.settings.gridSelector )
    }
    build() {
        this.#buildGridLayout()
        this.#buildGridCells()
    }
    #buildGridLayout() {
        const { settings, gridElement } = this
        const { cellSize, borderSize, borderColor } = settings
        const { innerWidth, innerHeight } = window

        const fullCellSize = cellSize + borderSize * 2 
        
        this.numCols = Math.floor( innerWidth / fullCellSize )
        this.numRows = Math.floor( innerHeight / fullCellSize )
        
        this.gridWidth = this.numCols * fullCellSize
        this.gridMarginX = ( innerWidth - this.gridWidth - borderSize * 2 ) / 2
        
        this.gridHeight = this.numRows * fullCellSize
        this.gridMarginY = ( innerHeight - this.gridHeight - borderSize * 2  ) / 2
        
        Object.assign( gridElement.style, {
            width: `${ this.gridWidth }px`,
            height: `${ this.gridHeight }px`,
            
            marginLeft: `${ this.gridMarginX }px`,
            marginRight: `${ this.gridMarginX }px`,
            marginTop: `${ this.gridMarginY }px`,
            marginBottom: `${ this.gridMarginY }px`,
        
            border: `${ borderSize }px solid ${ borderColor }`
        })
    }
    #buildGridCells() {
        const { numRows, numCols } = this
        this.gridcells = {}

        for ( let row = 0; row < numRows; row++ ) {
            for ( let col = 0; col < numCols; col++ ) {

                const gridcell = new GridCell({ grid: this, row, col })
                gridcell.render()

                this.gridcells[ gridcell.position ] = gridcell 
            }
        }
    }
}