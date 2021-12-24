import { generateQueryConstructor } from '../utils/object.utils.js'
import renderEvents from './gridcell/gridcell-events.methods.js'

class GridCell {
    constructor() {
        generateQueryConstructor.call( this, ...arguments )
    }
    get position() { 
        return `${ this.row }-${ this.col }`
    }
    render() {
        this.#renderHtmlElement()
        this.#renderHtmlStyling()
        this.#renderAttributes()
        this.renderGridcellDynamics()

        renderEvents.call( this )
    }

    #renderHtmlElement() {
        const { grid: { gridElement } } = this

        const gridcellElement = document.createElement( 'div' )

        gridcellElement.classList.add( 'gridcell' )
        gridcellElement.setAttribute( 'position', this.position )

        gridElement.append( gridcellElement )
        this.gridcellElement = gridcellElement
    }
    #renderHtmlStyling() {
        const { gridcellElement, grid: { settings: { cellSize, borderSize, borderColor } }} = this

        Object.assign( gridcellElement.style, {
            width: `${ cellSize }px`,
            height: `${ cellSize }px`,
            border: `${ borderSize }px solid ${ borderColor }`
        })

        gridcellElement.setAttribute( 'draggable', true )
    }
    #renderAttributes() {
        const { grid: { numCols, numRows } } = this

        this.isBlocked = false
        this.isOutCell = this.position === '0-0'
        this.isInCell = this.position === `${ numRows - 1 }-${ numCols - 1 }`
    }
    renderGridcellDynamics() {
        this.gridcellElement.classList[ this.isBlocked ? 'add' : 'remove' ]( 'blocked' )
        this.gridcellElement.classList[ this.isOutCell ? 'add' : 'remove' ]( 'out-cell' )
        this.gridcellElement.classList[ this.isInCell ? 'add' : 'remove' ]( 'in-cell' )
    }

    resetCell() {
        this.isInCell = false
        this.isOutCell = false
        this.isBlocked = false

        this.renderGridcellDynamics()
    }
}

export default GridCell
