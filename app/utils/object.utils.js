
export function generateQueryConstructor( query ) {
    for ( const key in query ) {
        this[ key ] = query[ key ]
    }
}

export function generateArray( length, callbackFn ) {
    return [ ...(new Array( length )) ].map( callbackFn )
}
