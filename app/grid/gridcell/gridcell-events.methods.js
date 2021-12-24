
export default function() {
    renderClickEvent.call( this )
    renderHoverEvent.call( this )
    renderDragDropEvents.call( this )
}

function renderClickEvent() {
    const { grid, gridcellElement } = this

    gridcellElement.addEventListener( 'click', _ => {
        if ( this.isOutCell || this.isInCell ) return

        this.isBlocked = !this.isBlocked
        this.renderGridcellDynamics()
        grid.draw()
    })
}

function renderHoverEvent() {
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

function renderDragDropEvents() {
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

        this.renderGridcellDynamics()

        grid.draggedGridcell.resetCell()
        grid.draw()
    })
}

function dontAllowDrag() {
    return ( !this.isOutCell && !this.isInCell )
}

function dontAllowDrop() {
    const { gridcellElement, grid } = this

    if ( grid.draggedGridcell.gridcellElement === gridcellElement ) return true
    if ( grid.draggedGridcell.isOutCell && this.isInCell ) return true
    if ( grid.draggedGridcell.isInCell && this.isOutCell ) return true

    return false
}
