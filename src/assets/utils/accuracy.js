/**
 * 精度处理
 */

/**
 * 乘法精度处理
 * @param {Number} arg1  乘数1
 *  @param {Number} arg2  乘数2
 */
const _accMul = (arg1,arg2) =>{ 
	let m = 0
	const s1 = arg1.toString()
	const s2 = arg2.toString() 
    try{m+=s1.split(".")[1].length}catch(e){} 
    try{m+=s2.split(".")[1].length}catch(e){} 
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m) 
} 

/**
 * 加法精度处理
 * @param {Number} arg1  加数1
 *  @param {Number} arg2  加数2
 */
const _accAdd = (arg1,arg2) => { 
    var r1,r2,m; 
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
    m=Math.pow(10,Math.max(r1,r2)) 
    return (arg1*m+arg2*m)/m 
} 

/**
 * 减法精度处理
 * @param {Number} arg1  减数1
 *  @param {Number} arg2  减数2
 */
const _accSub = (arg1,arg2) => { 
	var r1,r2,m,n; 
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
	m=Math.pow(10,Math.max(r1,r2)); 
	//last modify by deeka 
	//动态控制精度长度 
	n=(r1>=r2)?r1:r2; 
	return ((arg1*m-arg2*m)/m).toFixed(n); 
}

/**
 * 除法精度处理
 * @param {Number} arg1  除数1
 *  @param {Number} arg2  除数2
 */

const _accDiv = (arg1,arg2) => { 
    var t1=0,t2=0,r1,r2; 
    try{t1=arg1.toString().split(".")[1].length}catch(e){}   //--小数点后的长度
    try{t2=arg2.toString().split(".")[1].length}catch(e){}  //--小数点后的长度
    r1=Number(arg1.toString().replace(".",""))  //--去除小数点变整数
    r2=Number(arg2.toString().replace(".",""))  //--去除小数点变整数
    return (r1/r2)*Math.pow(10,t2-t1);   //---整数相除 在乘上10的平方  小数点的长度
}

export {
	_accMul,
	_accAdd,
	_accSub,
	_accDiv
}