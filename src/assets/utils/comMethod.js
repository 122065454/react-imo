/**
 * 每三位隔一逗号
 * @param {String/Number} str  //需要格式化得数字
 * @param {Number}  index   保留小数位数
 */
 const _numComma = (num, decimal) => {
	const index = decimal ? decimal : 2
	if (Number(num) >= 0) {
		let a = 0
		a = a.toFixed(index).split('.')[1]
		let str = num.toString()
		let newStr = ""
		let count = 0
		// 当数字是整数
		if (str.indexOf(".") === -1) {
			for (let i = str.length - 1; i >= 0; i--) {
				if (count % 3 === 0 && count !== 0) {
					newStr = str.charAt(i) + "," + newStr;
				} else {
					newStr = str.charAt(i) + newStr;
				}
				count++;
			}
			str = newStr ; //自动补小数点后两位
			return str;
		}
		// 当数字带有小数
		else {
			for (let i = str.indexOf(".") - 1; i >= 0; i--) {
				if (count % 3 === 0 && count !== 0) {
					newStr = str.charAt(i) + "," + newStr;
				} else {
					newStr = str.charAt(i) + newStr; //逐个字符相接起来
				}
				count++;
			}
			str = newStr + (str + a).substr((str + a).indexOf("."), index + 1);
			return str
		}
	}
}

//获取url中"?"符后的字串
const _getParamByUrl = (url) => {
	let theRequest = {};
	let index = url.indexOf("?");
	if (index !== -1) {
	   let str = url.substr(index + 1);
	   let strs = str.split("&");
	   for(let i = 0; i < strs.length; i ++) {
		   theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
	   }
	}
	return theRequest
}

/**
 * 时间转换
 * @param {String} data   //毫秒时间戳
 * @param {Number} type   //展示方式
 */
 const _formatDate = (data, type) => {
	var date = new Date(+data)
	var y = date.getFullYear()
	var m = date.getMonth() + 1
	m = m < 10 ? ('0' + m) : m
	var d = date.getDate()
	d = d < 10 ? ('0' + d) : d
	var h = date.getHours()
	h = h < 10 ? ('0' + h) : h
	var minute = date.getMinutes()
	minute = minute < 10 ? ('0' + minute) : minute
	var second = date.getSeconds()
	second = second < 10 ? ('0' + second) : second
	if (type === 1) {
	  	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
	} else if (type === 2) {
	  	return y + '-' + m + '-' + d + ' ' + h + ':' + minute
	} else if (type === 3) {
	  	return m + '-' + d + ' ' + h + ':' + minute + ':' + second
	}else if (type === 4) {
		return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
	}else if (type === 5) {
		return m + '月' + d + '日'
	}else if (type === 6) {
		return y + '/' + m + '/' + d 
	}else if (type === 7) {
		return y + '/' + m + '/' + d + ' ' + h + ':' + minute 
	}else if (type === 8) {
		return  m + '/' + d + ' ' + h + ':' + minute
	}else if (type === 9) {
		return h + ':' + minute + ' ' + m + '/' + y
	}else if (type === 10) {
		return y + '-' + m + '-' + d 
	}else if (type === 11) {
		return m + '-' + d 
	}else if (type === 12) {
		return m + '/' + d + ' ' + h + ':' + minute
	}else if (type === 13) {
		return m + '.' + d + ' ' + h + ':' + minute
	}else if (type === 14) {
		return h + ':' + minute + ':' + second + ' ' + d + '/' + m + '/' + y
	}else {
	  return h + ':' + minute + ':' + second
	}
}

// 倒计时处理(s)
const _timeContent = (millisecond) => {
    const second = millisecond
    let d = Math.floor(second / 86400)
    d = d < 10 ? `0${d}` : d
    let h = Math.floor((second % 86400) / 3600)
    h = h < 10 ? `0${h}` : h
    let m = Math.floor(((second % 86400) % 3600) / 60)
    m = m < 10 ? `0${m}` : m
    let s = Math.floor(((second % 86400) % 3600) % 60)
    s = s < 10 ? `0${s}` : s
    let countDownDOM
	if(d < 1000) {
		if (d > 0) {
		  countDownDOM = ` ${d}d: ${h}h: ${m}m: ${s}s`
		} else {
		  if(h > 0) {
			countDownDOM = ` ${h}h : ${m}m : ${s}s`
		  } else {
			countDownDOM = `${m}m : ${s}s`
		  }
		}
	} else {
		countDownDOM = ` 999d: 00h: 00m: 00s`
	}
    return countDownDOM
}

/**
 * 截取2位数据
 * @param {Number/String} num //待处理数据
 * @param {Number} accuracy   //精度
 * @param {Bool} status 	  //是否保持原数据
 */
 const _sliceData = (num, accuracy, status) => {
	if(num) {
		const size = accuracy ? accuracy : 2
		const arr = num.toString().split('.')
		if (arr.length > 1) {
			if (arr[1].length >= size) {
				let data = `${arr[0]}.${arr[1].slice(0, size)}`
				if(status) data = Number(data)
				return data
			} else {
				let lastData = arr[1]
				if(!status) {
					for(let i=0; i < size - arr[1].length; i++){
						lastData += '0'
					}
					return `${arr[0]}.${lastData}`
				} else {
					return Number(`${arr[0]}.${lastData}`)
				}
			}
		} else {
			if(!status) {
				return `${num}.00`
			} else {
				return Number(num)
			}
		}
	} else {
		return '0.00'
	}
}

/**
 * 获取图标地址
 * @param {String} chain  //BSC,HECO,ETH链名称
 * @param {String} addr   //图标hash地址
 * @param {Number} type   //投注类型
 */

const _coinAddress = (chain, addr, type) => {
	if (chain && addr && type) return `https://mdex.co/token-icons/${chain.toLowerCase()}/${type === 1 ? 'lp/' : ''}${addr.toLowerCase()}.png`
}

/**
 * 地址截取
 * @param {String} str  //地址
 */
const _substrAddress = (str) => {
	return str ? (str.substring(0,6)+'...'+str.substring(str.length-6)) : ''
}

/**
 * hash查詢地址
 * @param {String} address  //地址
 * @param {String} chain    //鏈
 * @param {String} state    //查询类型 tk、token
 */
 const _hashQueryAddress= (address, chain, state) => {
	let kind = state ? state : 'tx'
	return `https://${chain === 'HECO' ? 'hecoinfo' : 'bscscan'}.com/${kind}/${address}`
 }

/**
 * 转义参数
 * @param {String} param  // 数据对象
 * @param {String} la     // 语言 en/zh
 * @param {String} val    // 转义参数
 */
const _transferParam = (param, la, val) => {
	return param[`${val}_${la}`] ? param[`${val}_${la}`] : param[val]
}

/**
 * LP删除交易对
 * @param {String} str    // 需要处理的字符串
 */
const _deleteSymble = (str) => {
	if(str.includes('LP')) return 'LP'
	return str
}

/**
 * 截取2位数据
 * @param {Number/String} num //待处理数据
 * @param {Number} accuracy   //精度
 */
const _intercept = (num, accuracy) => {
	if(num && num.indexOf('.')) {
		return num.substring(0, num.indexOf('.')+accuracy+1)
	} else {
		return num
	}
}

export {
	_hashQueryAddress,
	_transferParam,
	_getParamByUrl,
	_substrAddress,
	_deleteSymble,
	_timeContent,
	_coinAddress,
  	_formatDate,
  	_sliceData,
	_intercept,
	_numComma,
}
