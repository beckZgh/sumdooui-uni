const PREFIX_NAME = 'sd-'

export function createNameSpace(name: string): [string, ReturnType<typeof createBEM>] {
    const component_mame = `${ PREFIX_NAME }${ name }`
    return [
        component_mame,
        createBEM(component_mame),
    ]
}

export type Mod = string | { [key: string]: any }
export type Mods = Mod | Mod[]

/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
function createBEM(name: string) {
    return (el?: Mods, mods?: Mods) => {
        if (el && typeof el !== 'string') {
            mods = el
            el = ''
        }

        el = el ? `${ name }__${ el }` : name

        return `${ el }${ genBem(el, mods) }`
    }
}

function genBem(name: string, mods?: Mods): string {
    if (!mods) return ''

    if (typeof mods === 'string') {
        return ` ${ name }--${ mods }`
    }

    if (Array.isArray(mods)) {
        return (mods as Mod[]).reduce<string>((ret, item) => ret + genBem(name, item), '')
    }

    return Object.keys(mods).reduce<string>((ret, key) => ret + (mods[key] ? genBem(name, key) : ''), '')
}



