import { generateQueryConstructor } from '../utils/object.utils.js'

export default class GridDraw {
    constructor() {
        generateQueryConstructor.call( this, ...arguments )
    }
}
