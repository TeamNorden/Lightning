const matchTypes = (element: any, type: string) => {
    if (type === 'ARRAY' && Array.isArray(type)) return

    if (typeof element === type.toLowerCase()) return

    throw new TypeError(`'${element}' is supposed to be of type '${type.toUpperCase()}'`)
}