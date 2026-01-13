// @ts-nocheck
import Compressor from 'compressorjs'
import watermark from 'watermarkjs'

export const upload = {
  imgTypes: ['png', 'jpg', 'jpeg', 'gif'],
  videoTypes: ['mp4', 'avi', 'rmvb'],
  /**
   * desc: 是否图片
   * @param {File} file 图片文件
   */
  isImg(file) {
    let fileExtension = ''
    if (file.name.lastIndexOf('.') > -1) {
      fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
    }
    let r = false
    this.imgTypes.map((type) => {
      if (file.type.indexOf(type) > -1 || (fileExtension && fileExtension.indexOf(type) > -1)) {
        r = type
      }
    })
    return r
  },
  /**
   * desc: 是否视频
   * @param {File} file 视频文件
   */
  isVideo(file) {
    let fileExtension = ''
    if (file.name.lastIndexOf('.') > -1) {
      fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
    }
    let r = false
    this.videoTypes.map((type) => {
      if (file.type.indexOf(type) > -1 || (fileExtension && fileExtension.indexOf(type) > -1)) {
        r = type
      }
    })
    return r
  },
  /**
   * desc: 选择文件
   * @param {String} accept 文件类型
   * @param {Boolean} multiple 多选
   */
  choose(accept, multiple) {
    return new Promise((resolve, reject) => {
      let fileCancle = true
      let el = document.createElement('input')
      el.type = 'file'
      el.accept = accept || 'image/png, image/jpeg, image/jpg'
      el.multiple = !!multiple
      window.addEventListener(
        'focus',
        () => {
          setTimeout(() => {
            if (fileCancle) {
              reject('cancle')
            }
          }, 400)
        },
        { once: true }
      )
      el.onchange = (e) => {
        fileCancle = false
        el = null
        resolve(e.target.files)
      }
      el.onerror = (e) => {
        el = null
        reject(e)
      }
      el.click()
    })
  },
  /**
   * desc: 图片压缩
   * @param {File} file 图片文件
   */
  compressor(file) {
    return new Promise((resolve, reject) => {
      let blob = new Blob([file], { type: file.type })
      /* eslint-disable */
      new Compressor(blob, {
        quality: 1,
        maxWidth: 750,
        maxHeight: 1134,
        success(result) {
          resolve(result)
        },
        error(err) {
          reject(err)
        }
      })
    })
  },
  /**
   * desc: 图片水印
   * @param {File} file 图片文件
   * @param {String} text 水印内容
   */
  excuteWatermark(file, text) {
    if (!text) {
      return new Promise((resolve) => resolve(file))
    }
    return new Promise((resolve) => {
      let imgurl = URL.createObjectURL(file)
      watermark([imgurl], {
        type: file.type,
        encoderOptions: 1
      })
        .blob((orgin, logo) => {
          const context = orgin.getContext('2d')
          const w = orgin.width > orgin.height ? orgin.width / 2 : orgin.width
          const font_s = w * 0.027
          context.font = `${font_s}px SimHei`
          context.fillStyle = 'white'
          const font_l = orgin.width - orgin.width * 0.03 - context.measureText(text).width
          const font_t = orgin.height - orgin.height * 0.03 // 绘制文本原点在文本的左下角
          context.fillText(text, font_l, font_t)
          return orgin
        })
        .then((blob) => {
          URL.revokeObjectURL(imgurl)
          resolve(blob)
        })
    })
  },
  /**
   * desc: 上传文件到服务器
   * @param {File} file 文件
   * @param {String} module AVATAR "头像"
   * @param {String} fileType IMAGE 图片  VIDEO  视频  FILE 其它文件 GIF gif
   */
  async action({ file, module, fileType }) {
    // let {code,msg,data} = await getUploadInfo({
    //     module: module,
    //     fileType: fileType
    // })
    // if(code !== 200){
    //     return Promise.reject(msg || 'uploadToken fail');
    //     // return msg || 'getUploadInfo error';
    // }
    // let {uploadApi,urlPrefix,uploadToken,isSecret} = data;
    // let form = new FormData();
    // form.append('token', uploadToken);
    // form.append('file', file);
    // let res = await axios.post(uploadApi,form,{
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     }
    // });
    // if(res.data && res.data.key){
    //     res.data.mime = res.data.mimeType;
    //     res.data.sizeByte = res.data.fsize;
    //     res.data.url = res.data.key;
    //     res.data.urlPrefix = urlPrefix;
    //     res.data.fullUrl = urlPrefix+'/'+res.data.key;
    //     //七牛加密空间上传返回不可直接访问，调取获取加密图片接口，
    //     if(isSecret){
    //         let res2 = await getFileFullUrl({key:res.data.key,module:module}).catch(r=>0);
    //         if(res2){
    //             res.data.fullUrl = res2.data.fullUrl;
    //         }
    //     }
    //     return Promise.resolve({
    //         ...res.data,
    //         isSecret,
    //     })
    // }else{
    //     return Promise.reject(res.data.msg || 'upload error');
    // }
  }
}

export function base64ToBlob(base64) {
  let audioSrc = base64 // 拼接最终的base64

  let arr = audioSrc.split(',')
  let array = arr[0].match(/:(.*?);/)
  let mime = (array && array.length > 1 ? array[1] : type) || type
  // 去掉url的头，并转化为byte
  let bytes = window.atob(arr[1])
  // 处理异常,将ascii码小于0的转换为大于0
  let ab = new ArrayBuffer(bytes.length)
  // 生成视图（直接针对内存）：8位无符号整数，长度1个字节
  let ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], {
    type: mime
  })
}
