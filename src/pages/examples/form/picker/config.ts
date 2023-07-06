
export const citys = [
    [
        { label: '北京市', value: '北京市' },
        { label: '上海市', value: '上海市' },
        { label: '广州市', value: '广州市' },
        { label: '深圳市', value: '深圳市' },
        { label: '成都市', value: '成都市' },
    ],
]

export const years = [
    { label: '2021年', value: '2021' },
    { label: '2020年', value: '2020' },
    { label: '2019年', value: '2019' },
]

export const seasons = [
    { label: '春', value: '春' },
    { label: '夏', value: '夏' },
    { label: '秋', value: '秋' },
    { label: '冬', value: '冬' },
]


export const area_list = [
    {
        label   : '中国',
        value   : 'ZH',
        children: [
            {
                label   : '广西',
                value   : '100',
                children: [
                    { label: '南宁', value: '1001' },
                    { label: '梧州', value: '1002' },
                    { label: '柳州', value: '1003' },
                ],
            },
            {
                label   : '广东',
                value   : '200',
                children: [
                    { label: '深圳', value: '2001' },
                    { label: '惠州', value: '2002' },
                    { label: '清远', value: '2003' },
                ],
            },
        ],
    },
    {
        label   : '美国',
        value   : 'UK',
        children: [
            { label: '纽约', value: 'u100', children: [ { label: '皇后街道', value: 'u1001' }] },
        ],
    },
]
