/// <reference types="@dcloudio/types" />
/// <reference types="vite/client" />

import type Utils from '../src/utils/index'
declare global {
    const $utils: typeof Utils
}
