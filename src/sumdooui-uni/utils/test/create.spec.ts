import { createNameSpace } from '../create'
import { it, expect } from 'vitest'

const res = createNameSpace('button')
const b = res[1]

it('create', () => {
    expect(b()).toBe('sd-button')
    expect(b('text')).toBe('sd-button__text')
    expect(b({ round: true })).toBe('sd-button sd-button--round')
    expect(b({ round: true, plain: true })).toBe('sd-button sd-button--round sd-button--plain')
    expect(b(['round', 'plain'])).toBe('sd-button sd-button--round sd-button--plain')

    expect(b('icon', 'primary')).toBe('sd-button__icon sd-button__icon--primary')
    expect(b('icon', { primary: true })).toBe('sd-button__icon sd-button__icon--primary')
    expect(b('icon', ['round', 'plain'])).toBe('sd-button__icon sd-button__icon--round sd-button__icon--plain')
})
