function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function (target) {
        for (let i = 1; i < arguments.length; i++) {
            const source = arguments[i]

            for (const key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }

        return target
    }
    return _extends.apply(this, arguments)
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype)
    subClass.prototype.constructor = subClass

    _setPrototypeOf(subClass, superClass)
}

function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
    }
    return _getPrototypeOf(o)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
        o.__proto__ = p
        return o
    }
    return _setPrototypeOf(o, p)
}

function _isNativeReflectConstruct() {
    if (typeof Reflect === 'undefined' || !Reflect.construct) return false
    if (Reflect.construct.sham) return false
    if (typeof Proxy === 'function') return true

    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}))
        return true
    } catch (e) {
        return false
    }
}

function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
        _construct = Reflect.construct.bind()
    } else {
        _construct = function _construct(Parent, args, Class) {
            const a = [null]
            a.push.apply(a, args)
            const Constructor = Function.bind.apply(Parent, a)
            const instance = new Constructor()
            if (Class) _setPrototypeOf(instance, Class.prototype)
            return instance
        }
    }

    return _construct.apply(null, arguments)
}

function _isNativeFunction(fn) {
    return Function.toString.call(fn).includes('[native code]')
}

function _wrapNativeSuper(Class) {
    const _cache = typeof Map === 'function' ? new Map() : undefined

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (Class === null || !_isNativeFunction(Class)) return Class

        if (typeof Class !== 'function') {
            throw new TypeError('Super expression must either be null or a function')
        }

        if (typeof _cache !== 'undefined') {
            if (_cache.has(Class)) return _cache.get(Class)

            _cache.set(Class, Wrapper)
        }

        function Wrapper() {
            return _construct(Class, arguments, _getPrototypeOf(this).constructor)
        }

        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value       : Wrapper,
                enumerable  : false,
                writable    : true,
                configurable: true,
            },
        })
        return _setPrototypeOf(Wrapper, Class)
    }

    return _wrapNativeSuper(Class)
}

/* eslint no-console:0 */
const formatRegExp = /%[sdj%]/g
let warning = function warning() {} // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && typeof document !== 'undefined') {
    warning = function warning(type, errors) {
        if (typeof console !== 'undefined' && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING === 'undefined') {
            if (errors.every((e) => {
                return typeof e === 'string'
            })) {
                console.warn(type, errors)
            }
        }
    }
}

function convertFieldsError(errors) {
    if (!errors || !errors.length) return null
    const fields = {}
    errors.forEach((error) => {
        const field = error.field
        fields[field] = fields[field] || []
        fields[field].push(error)
    })
    return fields
}
function format(template) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key]
    }

    let i = 0
    const len = args.length

    if (typeof template === 'function') {
        return template.apply(null, args)
    }

    if (typeof template === 'string') {
        const str = template.replace(formatRegExp, (x) => {
            if (x === '%%') {
                return '%'
            }

            if (i >= len) {
                return x
            }

            switch (x) {
                case '%s':
                    return String(args[i++])

                case '%d':
                    return Number(args[i++])

                case '%j':
                    try {
                        return JSON.stringify(args[i++])
                    } catch (_) {
                        return '[Circular]'
                    }

                    break

                default:
                    return x
            }
        })
        return str
    }

    return template
}

function isNativeStringType(type) {
    return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'date' || type === 'pattern'
}

function isEmptyValue(value, type) {
    if (value === undefined || value === null) {
        return true
    }

    if (type === 'array' && Array.isArray(value) && !value.length) {
        return true
    }

    if (isNativeStringType(type) && typeof value === 'string' && !value) {
        return true
    }

    return false
}

function asyncParallelArray(arr, func, callback) {
    const results = []
    let total = 0
    const arrLength = arr.length

    function count(errors) {
        results.push.apply(results, errors || [])
        total++

        if (total === arrLength) {
            callback(results)
        }
    }

    arr.forEach((a) => {
        func(a, count)
    })
}

function asyncSerialArray(arr, func, callback) {
    let index = 0
    const arrLength = arr.length

    function next(errors) {
        if (errors && errors.length) {
            callback(errors)
            return
        }

        const original = index
        index = index + 1

        if (original < arrLength) {
            func(arr[original], next)
        } else {
            callback([])
        }
    }

    next([])
}

function flattenObjArr(objArr) {
    const ret = []
    Object.keys(objArr).forEach((k) => {
        ret.push.apply(ret, objArr[k] || [])
    })
    return ret
}

const AsyncValidationError = /* #__PURE__ */(function (_Error) {
    _inheritsLoose(AsyncValidationError, _Error)

    function AsyncValidationError(errors, fields) {
        let _this

        _this = _Error.call(this, 'Async Validation Error') || this
        _this.errors = errors
        _this.fields = fields
        return _this
    }

    return AsyncValidationError
}( /* #__PURE__ */_wrapNativeSuper(Error)))
function asyncMap(objArr, option, func, callback, source) {
    if (option.first) {
        const _pending = new Promise((resolve, reject) => {
            const next = function next(errors) {
                callback(errors)
                return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source)
            }

            const flattenArr = flattenObjArr(objArr)
            asyncSerialArray(flattenArr, func, next)
        })

        _pending['catch']((e) => {
            return e
        })

        return _pending
    }

    const firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || []
    const objArrKeys = Object.keys(objArr)
    const objArrLength = objArrKeys.length
    let total = 0
    const results = []
    const pending = new Promise((resolve, reject) => {
        const next = function next(errors) {
            results.push.apply(results, errors)
            total++

            if (total === objArrLength) {
                callback(results)
                return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source)
            }
        }

        if (!objArrKeys.length) {
            callback(results)
            resolve(source)
        }

        objArrKeys.forEach((key) => {
            const arr = objArr[key]

            if (firstFields.includes(key)) {
                asyncSerialArray(arr, func, next)
            } else {
                asyncParallelArray(arr, func, next)
            }
        })
    })
    pending['catch']((e) => {
        return e
    })
    return pending
}

function isErrorObj(obj) {
    return !!(obj && obj.message !== undefined)
}

function getValue(value, path) {
    let v = value

    for (let i = 0; i < path.length; i++) {
        if (v == undefined) {
            return v
        }

        v = v[path[i]]
    }

    return v
}

function complementError(rule, source) {
    return function (oe) {
        let fieldValue

        if (rule.fullFields) {
            fieldValue = getValue(source, rule.fullFields)
        } else {
            fieldValue = source[oe.field || rule.fullField]
        }

        if (isErrorObj(oe)) {
            oe.field = oe.field || rule.fullField
            oe.fieldValue = fieldValue
            return oe
        }

        return {
            message: typeof oe === 'function' ? oe() : oe,
            fieldValue,
            field  : oe.field || rule.fullField,
        }
    }
}
function deepMerge(target, source) {
    if (source) {
        for (const s in source) {
            if (source.hasOwnProperty(s)) {
                const value = source[s]

                if (typeof value === 'object' && typeof target[s] === 'object') {
                    target[s] = _extends({}, target[s], value)
                } else {
                    target[s] = value
                }
            }
        }
    }

    return target
}

const required$1 = function required(rule, value, source, errors, options, type) {
    if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
        errors.push(format(options.messages.required, rule.fullField))
    }
}

/**
 *  Rule for validating whitespace.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

const whitespace = function whitespace(rule, value, source, errors, options) {
    if (/^\s+$/.test(value) || value === '') {
        errors.push(format(options.messages.whitespace, rule.fullField))
    }
}

// https://github.com/kevva/url-regex/blob/master/index.js
let urlReg
const getUrlRegex = function () {
    if (urlReg) {
        return urlReg
    }

    const word = '[a-fA-F\\d:]'

    const b = function b(options) {
        return options && options.includeBoundaries ? `(?:(?<=\\s|^)(?=${  word  })|(?<=${  word  })(?=\\s|$))` : ''
    }

    const v4 = '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}'
    const v6seg = '[a-fA-F\\d]{1,4}'
    const v6 = (`\n(?:\n(?:${  v6seg  }:){7}(?:${  v6seg  }|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:${  v6seg  }:){6}(?:${  v4  }|:${  v6seg  }|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:${  v6seg  }:){5}(?::${  v4  }|(?::${  v6seg  }){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:${  v6seg  }:){4}(?:(?::${  v6seg  }){0,1}:${  v4  }|(?::${  v6seg  }){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:${  v6seg  }:){3}(?:(?::${  v6seg  }){0,2}:${  v4  }|(?::${  v6seg  }){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:${  v6seg  }:){2}(?:(?::${  v6seg  }){0,3}:${  v4  }|(?::${  v6seg  }){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:${  v6seg  }:){1}(?:(?::${  v6seg  }){0,4}:${  v4  }|(?::${  v6seg  }){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::(?:(?::${  v6seg  }){0,5}:${  v4  }|(?::${  v6seg  }){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1\n`).replace(/\s*\/\/.*$/gm, '').replace(/\n/g, '').trim() // Pre-compile only the exact regexes because adding a global flag make regexes stateful

    const v46Exact = new RegExp(`(?:^${  v4  }$)|(?:^${  v6  }$)`)
    const v4exact = new RegExp(`^${  v4  }$`)
    const v6exact = new RegExp(`^${  v6  }$`)

    const ip = function ip(options) {
        return options && options.exact ? v46Exact : new RegExp(`(?:${  b(options)  }${ v4  }${ b(options)  })|(?:${  b(options)  }${ v6  }${ b(options)  })`, 'g')
    }

    ip.v4 = function (options) {
        return options && options.exact ? v4exact : new RegExp(`${  b(options)  }${ v4  }${ b(options) }`, 'g')
    }

    ip.v6 = function (options) {
        return options && options.exact ? v6exact : new RegExp(`${  b(options)  }${ v6  }${ b(options) }`, 'g')
    }

    const protocol = '(?:(?:[a-z]+:)?//)'
    const auth = '(?:\\S+(?::\\S*)?@)?'
    const ipv4 = ip.v4().source
    const ipv6 = ip.v6().source
    const host = '(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)'
    const domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*'
    const tld = '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))'
    const port = '(?::\\d{2,5})?'
    const path = '(?:[/?#][^\\s"]*)?'
    const regex = `(?:${  protocol  }|www\\.)${  auth  }(?:localhost|${  ipv4  }|${  ipv6  }|${  host  }${ domain  }${ tld  })${  port  }${ path }`
    urlReg = new RegExp(`(?:^${  regex  }$)`, 'i')
    return urlReg
}

/* eslint max-len:0 */

const pattern$2 = {
    // http://emailregex.com/
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
    // url: new RegExp(
    //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
    //   'i',
    // ),
    hex  : /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
}
var types = {
    integer: function integer(value) {
        return types.number(value) && parseInt(value, 10) === value
    },
    float: function float(value) {
        return types.number(value) && !types.integer(value)
    },
    array: function array(value) {
        return Array.isArray(value)
    },
    regexp: function regexp(value) {
        if (value instanceof RegExp) {
            return true
        }

        try {
            return !!new RegExp(value)
        } catch (e) {
            return false
        }
    },
    date: function date(value) {
        return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function' && !isNaN(value.getTime())
    },
    number: function number(value) {
        if (isNaN(value)) {
            return false
        }

        return typeof value === 'number'
    },
    object: function object(value) {
        return typeof value === 'object' && !types.array(value)
    },
    method: function method(value) {
        return typeof value === 'function'
    },
    email: function email(value) {
        return typeof value === 'string' && value.length <= 320 && !!value.match(pattern$2.email)
    },
    url: function url(value) {
        return typeof value === 'string' && value.length <= 2048 && !!value.match(getUrlRegex())
    },
    hex: function hex(value) {
        return typeof value === 'string' && !!value.match(pattern$2.hex)
    },
}

const type$1 = function type(rule, value, source, errors, options) {
    if (rule.required && value === undefined) {
        required$1(rule, value, source, errors, options)
        return
    }

    const custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex']
    const ruleType = rule.type

    if (custom.includes(ruleType)) {
        if (!types[ruleType](value)) {
            errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type))
        } // straight typeof check

    } else if (ruleType && typeof value !== rule.type) {
        errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type))
    }
}

const range = function range(rule, value, source, errors, options) {
    const len = typeof rule.len === 'number'
    const min = typeof rule.min === 'number'
    const max = typeof rule.max === 'number' // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

    const spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
    let val = value
    let key = null
    const num = typeof value === 'number'
    const str = typeof value === 'string'
    const arr = Array.isArray(value)

    if (num) {
        key = 'number'
    } else if (str) {
        key = 'string'
    } else if (arr) {
        key = 'array'
    } // if the value is not of a supported type for range validation
    // the validation rule rule should use the
    // type property to also test for a particular type


    if (!key) {
        return false
    }

    if (arr) {
        val = value.length
    }

    if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
        val = value.replace(spRegexp, '_').length
    }

    if (len) {
        if (val !== rule.len) {
            errors.push(format(options.messages[key].len, rule.fullField, rule.len))
        }
    } else if (min && !max && val < rule.min) {
        errors.push(format(options.messages[key].min, rule.fullField, rule.min))
    } else if (max && !min && val > rule.max) {
        errors.push(format(options.messages[key].max, rule.fullField, rule.max))
    } else if (min && max && (val < rule.min || val > rule.max)) {
        errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max))
    }
}

const ENUM$1 = 'enum'

const enumerable$1 = function enumerable(rule, value, source, errors, options) {
    rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : []

    if (!rule[ENUM$1].includes(value)) {
        errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(', ')))
    }
}

const pattern$1 = function pattern(rule, value, source, errors, options) {
    if (rule.pattern) {
        if (rule.pattern instanceof RegExp) {
            // if a RegExp instance is passed, reset `lastIndex` in case its `global`
            // flag is accidentally set to `true`, which in a validation scenario
            // is not necessary and the result might be misleading
            rule.pattern.lastIndex = 0

            if (!rule.pattern.test(value)) {
                errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern))
            }
        } else if (typeof rule.pattern === 'string') {
            const _pattern = new RegExp(rule.pattern)

            if (!_pattern.test(value)) {
                errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern))
            }
        }
    }
}

const rules = {
    required: required$1,
    whitespace,
    type    : type$1,
    range,
    enum    : enumerable$1,
    pattern : pattern$1,
}

const string = function string(rule, value, callback, source, options) {
    const errors = []
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field)

    if (validate) {
        if (isEmptyValue(value, 'string') && !rule.required) {
            return callback()
        }

        rules.required(rule, value, source, errors, options, 'string')

        if (!isEmptyValue(value, 'string')) {
            rules.type(rule, value, source, errors, options)
            rules.range(rule, value, source, errors, options)
            rules.pattern(rule, value, source, errors, options)

            if (rule.whitespace === true) {
                rules.whitespace(rule, value, source, errors, options)
            }
        }
    }

    callback(errors)
}

const method = function method(rule, value, callback, source, options) {
    const errors = []
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field)

    if (validate) {
        if (isEmptyValue(value) && !rule.required) {
            return callback()
        }

        rules.required(rule, value, source, errors, options)

        if (value !== undefined) {
            rules.type(rule, value, source, errors, options)
        }
    }

    callback(errors)
}

const number = function number(rule, value, callback, source, options) {
    const errors = []
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field)

    if (validate) {
        if (value === '') {
            value = undefined
        }

        if (isEmptyValue(value) && !rule.required) {
            return callback()
        }

        rules.required(rule, value, source, errors, options)

        if (value !== undefined) {
            rules.type(rule, value, source, errors, options)
            rules.range(rule, value, source, errors, options)
        }
    }

    callback(errors)
}

const _boolean = function _boolean(rule, value, callback, source, options) {
    const errors = []
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field)

    if (validate) {
        if (isEmptyValue(value) && !rule.required) {
            return callback()
        }

        rules.required(rule, value, source, errors, options)

        if (value !== undefined) {
            rules.type(rule, value, source, errors, options)
        }
    }

    callback(errors)
}

const regexp = function regexp(rule, value, callback, source, options) {
    const errors = []
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field)

    if (validate) {
        if (isEmptyValue(value) && !rule.required) {
            return callback()
        }

        rules.required(rule, value, source, errors, options)

        if (!isEmptyValue(value)) {
            rules.type(rule, value, source, errors, options)
        }
    }

    callback(errors)
}

const integer = function integer(rule, value, callback, source, options) {
    const errors = []
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field)

    if (validate) {
        if (isEmptyValue(value) && !rule.required) {
            return callback()
        }

        rules.required(rule, value, source, errors, options)

        if (value !== undefined) {
            rules.type(rule, value, source, errors, options)
            rules.range(rule, value, source, errors, options)
        }
    }

    callback(errors)
}

const floatFn = function floatFn(rule, value, callback, source, options) {
    const errors = []
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field)

    if (validate) {
        if (isEmptyValue(value) && !rule.required) {
            return callback()
        }

        rules.required(rule, value, source, errors, options)

        if (value !== undefined) {
            rules.type(rule, value, source, errors, options)
            rules.range(rule, value, source, errors, options)
        }
    }

    callback(errors)
}

const array = function array(rule, value, callback, source, options) {
    const errors = []
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field)

    if (validate) {
        if ((value === undefined || value === null) && !rule.required) {
            return callback()
        }

        rules.required(rule, value, source, errors, options, 'array')

        if (value !== undefined && value !== null) {
            rules.type(rule, value, source, errors, options)
            rules.range(rule, value, source, errors, options)
        }
    }

    callback(errors)
}

const object = function object(rule, value, callback, source, options) {
    const errors = []
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field)

    if (validate) {
        if (isEmptyValue(value) && !rule.required) {
            return callback()
        }

        rules.required(rule, value, source, errors, options)

        if (value !== undefined) {
            rules.type(rule, value, source, errors, options)
        }
    }

    callback(errors)
}

const ENUM = 'enum'

const enumerable = function enumerable(rule, value, callback, source, options) {
    const errors = []
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field)

    if (validate) {
        if (isEmptyValue(value) && !rule.required) {
            return callback()
        }

        rules.required(rule, value, source, errors, options)

        if (value !== undefined) {
            rules[ENUM](rule, value, source, errors, options)
        }
    }

    callback(errors)
}

const pattern = function pattern(rule, value, callback, source, options) {
    const errors = []
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field)

    if (validate) {
        if (isEmptyValue(value, 'string') && !rule.required) {
            return callback()
        }

        rules.required(rule, value, source, errors, options)

        if (!isEmptyValue(value, 'string')) {
            rules.pattern(rule, value, source, errors, options)
        }
    }

    callback(errors)
}

const date = function date(rule, value, callback, source, options) {
    // console.log('integer rule called %j', rule);
    const errors = []
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field) // console.log('validate on %s value', value);

    if (validate) {
        if (isEmptyValue(value, 'date') && !rule.required) {
            return callback()
        }

        rules.required(rule, value, source, errors, options)

        if (!isEmptyValue(value, 'date')) {
            let dateObject

            if (value instanceof Date) {
                dateObject = value
            } else {
                dateObject = new Date(value)
            }

            rules.type(rule, dateObject, source, errors, options)

            if (dateObject) {
                rules.range(rule, dateObject.getTime(), source, errors, options)
            }
        }
    }

    callback(errors)
}

const required = function required(rule, value, callback, source, options) {
    const errors = []
    const type = Array.isArray(value) ? 'array' : typeof value
    rules.required(rule, value, source, errors, options, type)
    callback(errors)
}

const type = function type(rule, value, callback, source, options) {
    const ruleType = rule.type
    const errors = []
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field)

    if (validate) {
        if (isEmptyValue(value, ruleType) && !rule.required) {
            return callback()
        }

        rules.required(rule, value, source, errors, options, ruleType)

        if (!isEmptyValue(value, ruleType)) {
            rules.type(rule, value, source, errors, options)
        }
    }

    callback(errors)
}

const any = function any(rule, value, callback, source, options) {
    const errors = []
    const validate = rule.required || !rule.required && source.hasOwnProperty(rule.field)

    if (validate) {
        if (isEmptyValue(value) && !rule.required) {
            return callback()
        }

        rules.required(rule, value, source, errors, options)
    }

    callback(errors)
}

const validators = {
    string,
    method,
    number,
    boolean: _boolean,
    regexp,
    integer,
    float  : floatFn,
    array,
    object,
    enum   : enumerable,
    pattern,
    date,
    url    : type,
    hex    : type,
    email  : type,
    required,
    any,
}

function newMessages() {
    return {
        default   : 'Validation error on field %s',
        required  : '%s is required',
        enum      : '%s must be one of %s',
        whitespace: '%s cannot be empty',
        date      : {
            format : '%s date %s is invalid for format %s',
            parse  : '%s date could not be parsed, %s is invalid ',
            invalid: '%s date %s is invalid',
        },
        types: {
            string : '%s is not a %s',
            method : '%s is not a %s (function)',
            array  : '%s is not an %s',
            object : '%s is not an %s',
            number : '%s is not a %s',
            date   : '%s is not a %s',
            boolean: '%s is not a %s',
            integer: '%s is not an %s',
            float  : '%s is not a %s',
            regexp : '%s is not a valid %s',
            email  : '%s is not a valid %s',
            url    : '%s is not a valid %s',
            hex    : '%s is not a valid %s',
        },
        string: {
            len  : '%s must be exactly %s characters',
            min  : '%s must be at least %s characters',
            max  : '%s cannot be longer than %s characters',
            range: '%s must be between %s and %s characters',
        },
        number: {
            len  : '%s must equal %s',
            min  : '%s cannot be less than %s',
            max  : '%s cannot be greater than %s',
            range: '%s must be between %s and %s',
        },
        array: {
            len  : '%s must be exactly %s in length',
            min  : '%s cannot be less than %s in length',
            max  : '%s cannot be greater than %s in length',
            range: '%s must be between %s and %s in length',
        },
        pattern: {
            mismatch: '%s value %s does not match pattern %s',
        },
        clone: function clone() {
            const cloned = JSON.parse(JSON.stringify(this))
            cloned.clone = this.clone
            return cloned
        },
    }
}
const messages = newMessages()

/**
 *  Encapsulates a validation schema.
 *
 *  @param descriptor An object declaring validation rules
 *  for this schema.
 */

const Schema = /* #__PURE__ */(function () {
    // ========================= Static =========================
    // ======================== Instance ========================
    function Schema(descriptor) {
        this.rules = null
        this._messages = messages
        this.define(descriptor)
    }

    const _proto = Schema.prototype

    _proto.define = function define(rules) {
        const _this = this

        if (!rules) {
            throw new Error('Cannot configure a schema with no rules')
        }

        if (typeof rules !== 'object' || Array.isArray(rules)) {
            throw new TypeError('Rules must be an object')
        }

        this.rules = {}
        Object.keys(rules).forEach((name) => {
            const item = rules[name]
            _this.rules[name] = Array.isArray(item) ? item : [item]
        })
    }

    _proto.messages = function messages(_messages) {
        if (_messages) {
            this._messages = deepMerge(newMessages(), _messages)
        }

        return this._messages
    }

    _proto.validate = function validate(source_, o, oc) {
        const _this2 = this

        if (o === void 0) {
            o = {}
        }

        if (oc === void 0) {
            oc = function oc() {}
        }

        let source = source_
        let options = o
        let callback = oc

        if (typeof options === 'function') {
            callback = options
            options = {}
        }

        if (!this.rules || Object.keys(this.rules).length === 0) {
            if (callback) {
                callback(null, source)
            }

            return Promise.resolve(source)
        }

        function complete(results) {
            let errors = []
            let fields = {}

            function add(e) {
                if (Array.isArray(e)) {
                    let _errors

                    errors = (_errors = errors).concat.apply(_errors, e)
                } else {
                    errors.push(e)
                }
            }

            for (let i = 0; i < results.length; i++) {
                add(results[i])
            }

            if (!errors.length) {
                callback(null, source)
            } else {
                fields = convertFieldsError(errors)
                callback(errors, fields)
            }
        }

        if (options.messages) {
            let messages$1 = this.messages()

            if (messages$1 === messages) {
                messages$1 = newMessages()
            }

            deepMerge(messages$1, options.messages)
            options.messages = messages$1
        } else {
            options.messages = this.messages()
        }

        const series = {}
        const keys = options.keys || Object.keys(this.rules)
        keys.forEach((z) => {
            const arr = _this2.rules[z]
            let value = source[z]
            arr.forEach((r) => {
                let rule = r

                if (typeof rule.transform === 'function') {
                    if (source === source_) {
                        source = _extends({}, source)
                    }

                    value = source[z] = rule.transform(value)
                }

                if (typeof rule === 'function') {
                    rule = {
                        validator: rule,
                    }
                } else {
                    rule = _extends({}, rule)
                } // Fill validator. Skip if nothing need to validate


                rule.validator = _this2.getValidationMethod(rule)

                if (!rule.validator) {
                    return
                }

                rule.field = z
                rule.fullField = rule.fullField || z
                rule.type = _this2.getType(rule)
                series[z] = series[z] || []
                series[z].push({
                    rule,
                    value,
                    source,
                    field: z,
                })
            })
        })
        const errorFields = {}
        return asyncMap(series, options, (data, doIt) => {
            const rule = data.rule
            let deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField === 'object')
            deep = deep && (rule.required || !rule.required && data.value)
            rule.field = data.field

            function addFullField(key, schema) {
                return _extends({}, schema, {
                    fullField : `${ rule.fullField  }.${  key }`,
                    fullFields: rule.fullFields ? [].concat(rule.fullFields, [key]) : [key],
                })
            }

            function cb(e) {
                if (e === void 0) {
                    e = []
                }

                let errorList = Array.isArray(e) ? e : [e]

                if (!options.suppressWarning && errorList.length) {
                    Schema.warning('async-validator:', errorList)
                }

                if (errorList.length && rule.message !== undefined) {
                    errorList = [].concat(rule.message)
                } // Fill error info


                let filledErrors = errorList.map(complementError(rule, source))

                if (options.first && filledErrors.length) {
                    errorFields[rule.field] = 1
                    return doIt(filledErrors)
                }

                if (!deep) {
                    doIt(filledErrors)
                } else {
                    // if rule is required but the target object
                    // does not exist fail at the rule level and don't
                    // go deeper
                    if (rule.required && !data.value) {
                        if (rule.message !== undefined) {
                            filledErrors = [].concat(rule.message).map(complementError(rule, source))
                        } else if (options.error) {
                            filledErrors = [options.error(rule, format(options.messages.required, rule.field))]
                        }

                        return doIt(filledErrors)
                    }

                    let fieldsSchema = {}

                    if (rule.defaultField) {
                        Object.keys(data.value).map((key) => {
                            fieldsSchema[key] = rule.defaultField
                        })
                    }

                    fieldsSchema = _extends({}, fieldsSchema, data.rule.fields)
                    const paredFieldsSchema = {}
                    Object.keys(fieldsSchema).forEach((field) => {
                        const fieldSchema = fieldsSchema[field]
                        const fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema]
                        paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field))
                    })
                    const schema = new Schema(paredFieldsSchema)
                    schema.messages(options.messages)

                    if (data.rule.options) {
                        data.rule.options.messages = options.messages
                        data.rule.options.error = options.error
                    }

                    schema.validate(data.value, data.rule.options || options, (errs) => {
                        const finalErrors = []

                        if (filledErrors && filledErrors.length) {
                            finalErrors.push.apply(finalErrors, filledErrors)
                        }

                        if (errs && errs.length) {
                            finalErrors.push.apply(finalErrors, errs)
                        }

                        doIt(finalErrors.length ? finalErrors : null)
                    })
                }
            }

            let res

            if (rule.asyncValidator) {
                res = rule.asyncValidator(rule, data.value, cb, data.source, options)
            } else if (rule.validator) {
                try {
                    res = rule.validator(rule, data.value, cb, data.source, options)
                } catch (error) {
                    console.error == null ? void 0 : console.error(error) // rethrow to report error

                    if (!options.suppressValidatorError) {
                        setTimeout(() => {
                            throw error
                        }, 0)
                    }

                    cb(error.message)
                }

                if (res === true) {
                    cb()
                } else if (res === false) {
                    cb(typeof rule.message === 'function' ? rule.message(rule.fullField || rule.field) : rule.message || `${ rule.fullField || rule.field  } fails`)
                } else if (Array.isArray(res)) {
                    cb(res)
                } else if (res instanceof Error) {
                    cb(res.message)
                }
            }

            if (res && res.then) {
                res.then(() => {
                    return cb()
                }, (e) => {
                    return cb(e)
                })
            }
        }, (results) => {
            complete(results)
        }, source)
    }

    _proto.getType = function getType(rule) {
        if (rule.type === undefined && rule.pattern instanceof RegExp) {
            rule.type = 'pattern'
        }

        if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
            throw new Error(format('Unknown rule type %s', rule.type))
        }

        return rule.type || 'string'
    }

    _proto.getValidationMethod = function getValidationMethod(rule) {
        if (typeof rule.validator === 'function') {
            return rule.validator
        }

        const keys = Object.keys(rule)
        const messageIndex = keys.indexOf('message')

        if (messageIndex !== -1) {
            keys.splice(messageIndex, 1)
        }

        if (keys.length === 1 && keys[0] === 'required') {
            return validators.required
        }

        return validators[this.getType(rule)] || undefined
    }

    return Schema
}())

Schema.register = function register(type, validator) {
    if (typeof validator !== 'function') {
        throw new TypeError('Cannot register a validator by type, validator is not a function')
    }

    validators[type] = validator
}

Schema.warning = warning
Schema.messages = messages
Schema.validators = validators

export { Schema as default }
// # sourceMappingURL=index.js.map
