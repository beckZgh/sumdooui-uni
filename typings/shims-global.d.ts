/// <reference types="@dcloudio/types" />
/// <reference types="vite/client" />

import type Utils from '../src/utils'
declare global {
    const $utils: typeof Utils
}
