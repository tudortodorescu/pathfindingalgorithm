import { generateQueryConstructor } from '../utils/object.utils.js'

export default class GridCell {
    constructor() {
        generateQueryConstructor.call( this, ...arguments )
    }
    get position() {
        return `${ this.row }-${ this.col }`
    }
    get gridcellElement() {
        return document.querySelector( `.gridcell[position="${ this.position }"]` )
    }
    render() {
        this.#renderElement()
        this.#renderGridcell()
        this.#renderHtml()
        this.renderOutInCells()
        this.#renderEvents()
    }
    #renderElement() {
        const { grid: { gridElement } } = this

        const gridcellElement = document.createElement( 'div' )

        gridcellElement.classList.add( 'gridcell' )
        gridcellElement.setAttribute( 'position', this.position )

        gridElement.append( gridcellElement )
    }
    #renderGridcell() {
        const { grid: { numCols, numRows } } = this

        this.isBlocked = false
        this.isOutCell = this.position === '0-0'
        this.isInCell = this.position === `${ numRows - 1 }-${ numCols - 1 }`
    }   
    #renderHtml() {
        const { gridcellElement, grid: { settings: { cellSize, borderSize, borderColor } }} = this

        Object.assign( gridcellElement.style, {
            width: `${ cellSize }px`,
            height: `${  cellSize }px`,
            border: `${ borderSize }px solid ${ borderColor }`
        })

        gridcellElement.setAttribute( 'draggable', true )
    }
    renderOutInCells() {
        this.gridcellElement.classList[ this.isOutCell ? 'add' : 'remove' ]( 'out-cell' )
        this.gridcellElement.classList[ this.isInCell ? 'add' : 'remove' ]( 'in-cell' )
    }
    renderBlockedCells() {
        this.gridcellElement.classList[ this.isBlocked ? 'add' : 'remove' ]( 'blocked' )
    }

    ////

    #renderEvents() {
        this.#renderClickEvent()
        this.#renderHoverEvent()
        this.#renderDragDropEvents()

        // https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event
    }
    #renderClickEvent() {
        const { gridcellElement } = this

        gridcellElement.addEventListener( 'click', _ => {
            if ( this.isOutCell || this.isInCell ) return

            this.isBlocked = !this.isBlocked
            this.renderBlockedCells()
        })
    }
    #renderHoverEvent() {
        const { gridcellElement } = this
        
        gridcellElement.addEventListener( 'mouseover', _ => {
            if ( this.isOutCell || this.isInCell ) {
                gridcellElement.style.cursor = 'grab'
            }
            else if ( !this.isBlocked ) {
                gridcellElement.style.cursor = 'pointer'
            }
            else {
                gridcellElement.style.cursor = 'crosshair'
            }
        })
    }
    #renderDragDropEvents() {
        const { gridcellElement, grid } = this
        
        gridcellElement.addEventListener( 'dragover', event => {
            if ( dontAllowDrop.call( this ) ) return

            event.preventDefault()
        })

        gridcellElement.addEventListener( 'dragstart', event => {
            if ( dontAllowDrag.call( this ) ) {
                event.preventDefault()
                return
            }

            grid.draggedGridcell = this
        })

        gridcellElement.addEventListener( 'drop', _ => {
            this.resetCell()

            this.isOutCell = grid.draggedGridcell.isOutCell
            this.isInCell = grid.draggedGridcell.isInCell

            this.renderOutInCells()

            grid.draggedGridcell.resetCell()
        })

        function dontAllowDrag() {
            if ( !this.isOutCell && !this.isInCell ) return true

            return false
        }
        function dontAllowDrop() {
            const { gridcellElement, grid } = this

            if ( grid.draggedGridcell.gridcellElement === gridcellElement ) return true
            if ( grid.draggedGridcell.isOutCell && this.isInCell ) return true
            if ( grid.draggedGridcell.isInCell && this.isOutCell ) return true

            return false
        }
    }

    ////

    resetCell() {
        this.isInCell = false
        this.isOutCell = false
        this.isBlocked = false

        this.renderOutInCells()
        this.renderBlockedCells()
    }
}