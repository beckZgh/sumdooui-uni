
const $api: any = {}

$api.event = {
    gen_key: ['event', 'gen_key'],
    pull   : ['event', 'pull'],
    push   : ['event', 'push'],
}

$api.mb = {}

$api.mb.address = {
    add        : ['mb.address', 'add'],
    del        : ['mb.address', 'del'],
    get        : ['mb.address', 'get'],
    list       : ['mb.address', 'list'],
    set        : ['mb.address', 'set'],
    set_default: ['mb.address', 'set_default'],
}

$api.mb.data = {
    load        : ['mb.data', 'load'],
    loadBranches: ['mb.data', 'loadBranches'],
    sync        : ['mb.data', 'sync'],
}

$api.mb.deposit = {
    close : ['mb.deposit', 'close'],
    create: ['mb.deposit', 'create'],
    query : ['mb.deposit', 'query'],
}

$api.mb.market = {
    close  : ['mb.market', 'close'],
    create : ['mb.market', 'create'],
    load   : ['mb.market', 'load'],
    query  : ['mb.market', 'query'],
    receive: ['mb.market', 'receive'],
}

$api.mb.member = {
    getBills      : ['mb.member', 'getBills'],
    getCard       : ['mb.member', 'getCard'],
    getCoupons    : ['mb.member', 'getCoupons'],
    loginByCard   : ['mb.member', 'loginByCard'],
    loginByCode   : ['mb.member', 'loginByCode'],
    loginByWxApp  : ['mb.member', 'loginByWxApp'],
    loginOrRegCard: ['mb.member', 'loginOrRegCard'],
    qrcode        : ['mb.member', 'qrcode'],
    reg           : ['mb.member', 'reg'],
    resetPsw      : ['mb.member', 'resetPsw'],
    sendCode      : ['mb.member', 'sendCode'],
    unbind        : ['mb.member', 'unbind'],
    update        : ['mb.member', 'update'],
}

$api.mn = {}

$api.mn.cart = {
    add  : ['mn.cart', 'add'],
    clear: ['mn.cart', 'clear'],
    load : ['mn.cart', 'load'],
    sync : ['mn.cart', 'sync'],
}

$api.mn.data = {
    load                : ['mn.data', 'load'],
    load_pos_bill       : ['mn.data', 'load_pos_bill'],
    load_table_by_qrcode: ['mn.data', 'load_table_by_qrcode'],
    sync                : ['mn.data', 'sync'],
}

$api.mn.order = {
    close : ['mn.order', 'close'],
    create: ['mn.order', 'create'],
    get   : ['mn.order', 'get'],
    list  : ['mn.order', 'list'],
    pay   : ['mn.order', 'pay'],
    query : ['mn.order', 'query'],
    sync  : ['mn.order', 'sync'],
}

$api.mn.order_ws = {
    add_menu   : ['mn.order_ws', 'add_menu'],
    join_user  : ['mn.order_ws', 'join_user'],
    load_order : ['mn.order_ws', 'load_order'],
    watch_order: ['mn.order_ws', 'watch_order'],
}

$api.pay = {}

$api.pay.order = {
    close   : ['pay.order', 'close'],
    create  : ['pay.order', 'create'],
    get_bill: ['pay.order', 'get_bill'],
    pay     : ['pay.order', 'pay'],
    query   : ['pay.order', 'query'],
    sync    : ['pay.order', 'sync'],
}

$api.wxa = {
    code2session    : ['wxa', 'code2session'],
    get_phone_number: ['wxa', 'get_phone_number'],
}

export default $api
