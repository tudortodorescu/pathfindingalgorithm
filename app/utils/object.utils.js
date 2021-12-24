
export function generateQueryConstructor( query ) {
    for ( const key in query ) {
        this[ key ] = query[ key ]
    }
}