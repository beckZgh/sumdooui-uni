// 计算两个坐标之间的直线距离
function transformDistance(lng1:number, lat1:number, lng2:number, lat2:number) {
    const R    = 6378.137 // 地球半径
    const PI   = Math.PI // 圆周率
    const ASIN = Math.asin // 反正弦函数
    const SQRT = Math.sqrt // 开平方函数

    // const POW = Math.pow // 得到x的y次方
    const SIN = Math.sin // 正弦函数
    const COS = Math.cos // 余弦函数

    function _rad(d:number) { return (d * PI) / 180.0 }

    // 计算两个经纬度之间的距离 （单位为米）
    const radLat1 = _rad(lat1)
    const radLat2 = _rad(lat2)

    const a = radLat1 - radLat2
    const b = _rad(lng1) - _rad(lng2)
    const s = 2 * ASIN(SQRT(SIN(a / 2) ** 2 + COS(radLat1) * COS(radLat2) * SIN(b / 2) ** 2))

    const distance = (s * R * 1000).toFixed()

    return parseFloat(distance) // 单位米
}

// 距离 米 公里转换
function foramtDistance(val:number) {
    return (val >= 1000 && `${ (val / 1000).toFixed(1)  } km`) || `${ val  } m`
}

export { transformDistance, foramtDistance }
