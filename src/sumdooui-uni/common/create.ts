const namespace = 'sd'

const camelize = (str: string) => {
    return str.replace(/-(\w)/g, (_, c) => c.toUpperCase())
}

export const createNamespace = (str: string) => {
    const name = `${ namespace }-${ str }`
    return {
        component_name: camelize(name),
        prefix_name   : name,
    }
}
