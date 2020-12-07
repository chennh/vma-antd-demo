/**
 * base64转blob
 * @param {*} base64Code
 */
const base64ToBlob = (base64Code: string) => {
  const parts = base64Code.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length

  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], {
    type: contentType
  })
}

/**
 * 下载blob文件
 * @param {*} blob
 * @param {*} fileName
 * @param {*} clearTime
 */
const downloadFile = (blob: any, fileName = '下载', clearTime = 10000) => {
  if (!blob || !(blob instanceof Blob)) {
    return
  }
  const url = window.URL.createObjectURL(new Blob([blob]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()

  setTimeout(() => {
    document.body.removeChild(link)
  }, clearTime)
}

/**
 * 根据url下载(同源 访问的网站域名与服务器域名一致)
 * @param {*} dataUrl
 * @param {*} fileName
 * @param {*} clearTime
 */
const downloadFileUrl = (dataUrl: string, fileName: string, clearTime = 10000) => {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = dataUrl
  // @ts-ignore
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  setTimeout(() => {
    document.body.removeChild(link)
  }, clearTime)
}

/**
 * 根据url下载(不同源)
 * @param {*} dataUrl
 * @param {*} fileName
 * @param {*} clearTime
 */
const downloadUrl = (dataUrl: string, fileName: string, clearTime = 10000) => {
  const image = new Image()
  // 解决跨域 Canvas 污染问题
  image.setAttribute('crossOrigin', 'anonymous')
  image.onload = () => {
    const canvas = document.createElement('canvas')
    canvas.width = image.width
    canvas.height = image.height
    const context = canvas.getContext('2d')
    // @ts-ignore
    context.drawImage(image, 0, 0, image.width, image.height)
    // 得到图片的base64编码数据
    const url = canvas.toDataURL('image/png')
    // 生成一个a元素
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    // @ts-ignore
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    // var event = new MouseEvent("click"); // 创建一个单击事件
    // a.download = name || "photo"; // 设置图片名称
    // a.href = url; // 将生成的URL设置为a.href属性
    // a.dispatchEvent(event); // 触发a的单击事件
  }
  image.src = dataUrl
}

/**
 * 下载base64图片
 * @param {*} base64Code
 * @param {*} fileName
 * @param {*} clearTime
 */
const downloadBase64Img = (base64Code: string, fileName: string, clearTime = 10000) => {
  downloadFile(base64ToBlob(base64Code), fileName, clearTime)
}

export {
  base64ToBlob,
  downloadBase64Img,
  downloadFileUrl,
  downloadUrl
}
