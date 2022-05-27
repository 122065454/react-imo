// input框输入校验
const check_proving = (ele) => {
    let status = ele?.replace(/[^\d.]/g, '')
      .replace(/^\./g, '')
      .replace(/\.{8,}/g, '.')
      .replace('.', '$#$')
      .replace(/\./g, '')
      .replace('$#$', '.')
    if (status.split('.')[1] && status.split('.')[1].length > 8) {
      status = status.slice(0, status.length - 1)
    }
    return status
}

export {
	check_proving
}
