

class Util {
    /**
     * @description 手机号码验证
     **/
    phoneReg(phone) {
        const reg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/
        return reg.test(phone)
    }
    //身份证校验
    validateIdentityNumber(el) {
        let reg = /^\d{6}(18|19|20)?\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (el && reg.test(el) === false) {
            return false
        } else {
            return true
        }
    }
    // 小数点保留位数
    ForDight(n, d) {
        var s = n + "";
        if (!d) d = 0;
        if (s.indexOf(".") == -1) s += ".";
        s += new Array(d + 1).join("0");
        if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (d + 1) + "})?)\\d*$").test(s)) {
            var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
            if (a == d + 2) {
                a = s.match(/\d/g);
                if (parseInt(a[a.length - 1]) > 4) {
                    for (var i = a.length - 2; i >= 0; i--) {
                        a[i] = parseInt(a[i]) + 1;
                        if (a[i] == 10) {
                            a[i] = 0;
                            b = i != 1;
                        } else break;
                    }
                }
                s = a.join("").replace(new RegExp("(\\d+)(\\d{" + d + "})\\d$"), "$1.$2");

            }
            if (b) s = s.substr(1);
            return (pm + s).replace(/\.$/, "");
        }
        return this + "";
    }

    // 带浮点乘法精度计算 args:[Number,Number,....]
    getMul(args) {
        let len = 0
        let mul = 1
        args.forEach((item, index) => {
            try {
                len += item.toString().split(".")[1].length
            } catch (e) { }
            mul *= Number(item.toString().replace(".", ""))
        })
        return mul / Math.pow(10, len)
    }
    // 带浮点加法精度计算 args:[Number,Number,....]
    getAdd(args) {
        let lens = []
        let sum = 0
        args.forEach((item, index) => {
            if (typeof item !== 'number') {
                return
            }
            try {
                lens.push(item.toString().split(".")[1]?.length || 0)
            } catch (e) { }
        })
        let maxLength = Math.max(...lens)
        let maxNum = Math.pow(10, maxLength)
        let newsArgs = []
        args.forEach((item, index) => {
            // 取小数点后长度，计算出最大
            let surplusDigit = maxLength - (item.toString().split(".")[1]?.length || 0)
            let zero = ''
            // 判断每个数小数点后的位数和最大小数点长度比较，少的补0
            if (surplusDigit > 0) {
                zero = new Array(surplusDigit).fill(0)
                item = item.toString() + zero.join('')
            }
            // 补0后，换算成字符串去掉小数点，准备以后整数相加
            newsArgs.push(item.toString().replace('.', ''))
        })
        newsArgs.forEach((item, index) => {
            sum += Number(item)
        })
        return sum / maxNum

    }
    // 带浮点减法精度计算 args:[Number,Number,....]
    getCut(args) {
        let lens = []
        let sum = 0
        if (args.length < 3) {
            args.forEach((item, index) => {
                if (typeof item !== 'number') {
                    return
                }
                try {
                    lens.push(item.toString().split(".")[1]?.length || 0)
                } catch (e) { }
            })
            let maxLength = Math.max(...lens)
            let maxNum = Math.pow(10, maxLength)
            let newsArgs = []
            args.forEach((item, index) => {
                // 取小数点后长度，计算出最大
                let surplusDigit = maxLength - (item.toString().split(".")[1]?.length || 0)
                let zero = ''
                // 判断每个数小数点后的位数和最大小数点长度比较，少的补0
                if (surplusDigit > 0) {
                    zero = new Array(surplusDigit).fill(0)
                    item = item.toString() + zero.join('')
                }
                // 补0后，换算成字符串去掉小数点，准备以后整数相加
                newsArgs.push(item.toString().replace('.', ''))
            })
            // if(newsArgs[0]>newsArgs[1]){
            sum = newsArgs[0] - newsArgs[1]
            // }else{
            // 	sum=newsArgs[1] - newsArgs[0]
            // }
            // newsArgs.forEach((item, index) => {
            // 	sum += Number(item)
            // })
            // console.log(sum, newsArgs, sum/maxNum, maxNum)
            return sum / maxNum

        } else {
            reject(new Error('只支持数组长度为2'))
        }

    }
    // 保留两位小数，四舍五入
    toFixedAndRound(value, num) {
        if (!value || (typeof value !== 'number')) return 0
        let decimalCarry = 0
        let resNum = 0
        // 整数部分
        let integral = value.toString().split(".")[0]
        // 小数部分
        let decimal = value.toString().split(".")[1]
        // 小数最后一位
        let lastStr = ''
        if (decimal?.length > num) {
            lastStr = decimal?.substr(num, 1)
        }
        // 需要保留小数部分，存储起来，如果需要进位，需要和整数拼接起来加上decimalCarry，不需要进位直接和整数拼接起来返回，
        let retainStr = decimal?.substr(0, num) || 0
        // 进位补0，如果最后一位小数大于4 需要进位 0.***1，*则为(num-1)个0
        let zero = new Array(num - 1).fill(0)
        if (Number(lastStr) > 4) {
            // 需要进位的小数位 +0.***1
            decimalCarry = Number('0.' + zero.join('') + '1')
            resNum = this.getAdd([Number(integral + '.' + retainStr), decimalCarry])
        } else {
            resNum = Number(integral + '.' + retainStr)
        }
        return resNum
    }
    	// 节流
	throttle (fn, wait) {
		let timer = null
		return function () {
			if (!!timer) return
			timer = setTimeout(() => {
				fn.apply(this, arguments)
				timer = null
			}, 1000)
		}
	}
	// 防抖
	debounce(fn, gapTime) {
		if (gapTime == null || gapTime == undefined) {
		  gapTime = 1500
		}
		let _lastTime = null
		// 返回新的函数
		return function () {
		  let _nowTime = + new Date()
		  if (_nowTime - _lastTime > gapTime || !_lastTime) {
			fn.apply(this, arguments)   //将this和参数传给原函数
			_lastTime = _nowTime
		  }
		}
	}
	/**
	 * 把base64转化为jpg本地图片
	 * @param {*} isEmpty Code
	 */
     getBaseLocalImg (data) {
		return new Promise((resolve, reject) => {
			// 读取base64数据的图片格式和body
			const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(data) || []
			if (format) {
				// 获取微信的文件工具
				const fsm = uni.getFileSystemManager();
				// 定义完整的临时文件路径，wx.env.USER_DATA_PATH是微信文件的根目录
				const filePath = `${wx.env.USER_DATA_PATH}/wxQRCode.${format}`
				// base64 数据转换为 ArrayBuffer 数据
				const buffer = uni.base64ToArrayBuffer(bodyData)
				// 写入系统空间
				fsm.writeFile({
					filePath: filePath,
					data: buffer,
					encoding: 'binary',
					success: (res) => {
						resolve({
							...res,
							filePath
						})
					},
					fail: err => {
						reject(err)
					}
				})
			}
		})
	}
    	/**
	 * @desc: 特殊字符校验 除了下划线
	 */
	containSpecial(str) {
		let containSpecial = RegExp(
			/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/
		);
		return containSpecial.test(str);
	}
}

export default new Util()