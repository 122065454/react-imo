import jwt from 'jsonwebtoken'
import { defaultAddress } from '@/assets/utils/comStatic'

// JWT加密方法
const jwtHandle = (param) => {
	// 加密参数
	const payload = Object.assign({ "user_addr": defaultAddress}, param)
	// 生成加密串
	const jwtHandle = jwt.sign(payload, 'DPU4J8N3jhXyAmCw1B7g3kf6ZIIM32o3', { expiresIn: 30 })
	return 'Bearer ' + jwtHandle
}

export {
	jwtHandle
}
