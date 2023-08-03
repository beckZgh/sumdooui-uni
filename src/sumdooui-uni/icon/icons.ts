const ICONS: Record<string, string> = {
    // 基础图标
    "plus"                : '\uE8FE',
    'plus-circle'         : '\uE783',
    'plus-circle-fill'    : '\uE845',
    "minus"               : '\uE7FE',
    'minus-circle'        : '\uE780',
    'minus-circle-fill'   : '\uE844',
    'up'                  : '\uE7ED',
    'up-circle'           : '\uE786',
    'up-circle-fil'       : '\uE84A',
    'down'                : '\uE7EE',
    'down-circle'         : '\uE781',
    'down-circle-fil'     : '\uE846',
    'left'                : '\uE7EC',
    'left-circle'         : '\uE780',
    'left-circle-fill'    : '\uE845',
    'right'               : '\uE7EB',
    'right-circle'        : '\uE785',
    'right-circle-fill'   : '\uE84B',
    'caret-up'            : '\uE8ED',
    'caret-down'          : '\uE8EC',
    'caret-left'          : '\uE8EF',
    'caret-right'         : '\uE8EE',
    'double-left'         : '\uE7EF',
    'double-right'        : '\uE7F0',
    'check'               : '\uE7FC',
    'circle-solid'        : '\uE61A',
    'circle'              : '\uE6D7',
    'check-circle'        : '\uE77D',
    'check-circle-fill'   : '\uE844',
    'close'               : '\uE7FD',
    'close-circle'        : '\uE77E',
    'close-circle-fill'   : '\uE848',
    'square'              : '\uE6D5',
    'check-square'        : '\uE6D6',
    'check-square-fill'   : '\uE6D4',
    'question'            : '\uE7FF',
    'question-circle'     : '\uE784',
    'question-circle-fill': '\uE84D',
    'warning'             : '\uE7F7',
    'warning-circle'      : '\uE787',
    'warning-circle-fill' : '\uE84E',
    'info'                : '\uE7F8',
    'info-circle'         : '\uE77F',
    'info-circle-fill'    : '\uE849',
    // -----------------------------
    'pull'                : '\uE600',
    'more'                : '\uE68A',
    'edit'                : '\uE7E1',
    'edit-fill'           : '\uE86D',
    'delete'              : '\uE7C3',
    'delete-fill'         : '\uE863',
    'filter'              : '\uE7C7',
    'filter-fill'         : '\uE866',
    'calendar'            : '\uE603',
    'calendar-check'      : '\uE7D3',
    'time-circle'         : '\uE788',
    'time-circle-fill'    : '\uE84C',
    'search'              : '\uE8F0',
    'darg'                : '\uE842',
    "link"                : '\uE7E2',
    'notification'        : '\uE7DA',
    'sound'               : '\uE7DB',
    'sound-fill'          : '\uE865',

    // 交互图标
    'sync'              : '\uE789',
    'reload'            : '\uE78A',
    'setting'           : '\uE78E',
    'setting-fill'      : '\uE877',
    'no-eye'            : '\uE6AD',
    'eye'               : '\uE78F',
    'eye-fill'          : '\uE86A',
    'eye-close'         : '\uE900',
    'eye-close-fill'    : '\uE8FF',
    'location'          : '\uE790',
    'location-fill'     : '\uE869',
    'like'              : '\uE7C8',
    'like-fill'         : '\uE86B',
    'unlike'            : '\uE7C9',
    'unlike-fill'       : '\uE86E',
    'heart'             : '\uE7E4',
    'heart-fill'        : '\uE84F',
    'star'              : '\uE7E5',
    'star-fill'         : '\uE86F',
    'camera'            : '\uE7D8',
    'camera-fill'       : '\uE874',
    'image'             : '\uE7DE',
    'image-fill'        : '\uE860',
    'id-card'           : '\uE7E0',
    'id-card-fill'      : '\uE861',
    'credit-card'       : '\uE7E3',
    'credit-card-fill'  : '\uE862',
    'gift'              : '\uE843',
    'gift-fill'         : '\uE867',
    'phone'             : '\uE7E8',
    'phone-fill'        : '\uE872',
    'shop'              : '\uE7CE',
    'shop-fill'         : '\uE876',
    'printer'           : '\uE7D9',
    'printer-fill'      : '\uE875',
    'rocket'            : '\uE7CF',
    'rocket-fill'       : '\uE873',
    'alert'             : '\uE7C4',
    'alert-fill'        : '\uE871',
    'lock'              : '\uE7CB',
    'lock-fill'         : '\uE86C',
    'unlock'            : '\uE7CA',
    'unlock-fill'       : '\uE870',
    'key'               : '\uE7E6',
    'scan'              : '\uE7D5',
    'qrcode'            : '\uE7DD',
    'barcode'           : '\uE7D7',
    'woman'             : '\uE8F1',
    'man'               : '\uE7E7',
    'mobile'            : '\uE7B4',
    'mobile-fill'       : '\uE854',
    'home'              : '\uE7C6',
    'home-fill'         : '\uE868',
    'swap'              : '\uE7F2',
    'user'              : '\uE7B2',
    'user-add'          : '\uE7AE',
    'user-delete'       : '\uE7B0',
    'user-switch'       : '\uE8EA',
    'team'              : '\uE7B3',
    'team-add'          : '\uE7B1',
    'team-delete'       : '\uE7AF',
    'colud-upload'      : '\uE7DC',
    'colud-download'    : '\uE7DF',
    'share'             : '\uE7E9',
    'share-square'      : '\uE841',
    'cart'              : '\uE826',
    'cart-fill'         : '\uE827',
    'order'             : '\uE834',
    'order-fill'        : '\uE833',
    'loading'           : '\uE83D',
    'qq'                : '\uE882',
    'wechat-fill'       : '\uE883',
    'alipay-circle-fill': '\uE884',
    'github-fill'       : '\uE885',
    // // 空元素
    // 'not-data'          : '\uE61A',
    // 'not-wifi'          : '\uE600',
    // 'not-auth'          : '\uE66B',
    // 'not-history'       : '\uE6DD',
    // 'not-address'       : '\uE6CE',
    // 'not-cart'          : '\uE63F',
    // 'not-wifi-1'        : '\uE65B',
    // 'not-history-1'     : '\uE632',
}

export default ICONS
