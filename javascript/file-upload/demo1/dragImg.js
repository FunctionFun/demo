let upload = document.querySelector('#upload')
let preview = document.querySelector('#preview')
let images = []

upload.ondragenter = function () {
  this.innerHTML = '可以释放了'
}
upload.ondragover = function (ev) {
  ev.preventDefault()
}
upload.ondragleave = function () {
  this.innerHTML = '请将文件拖拽到这里'
}
upload.ondrop = function (ev) {
  ev.preventDefault()
  let files = ev.dataTransfer.files
  for (let i = 0; i < files.length; i++) {
    if (files[i].type.indexOf('image') != -1) {
      let fr = new FileReader()
      fr.readAsDataURL(files[i])
      fr.onload = function () {
        let li = document.createElement('li')
        let img = document.createElement('img')
        img.src = this.result
        images.push(this.result)
        li.appendChild(img)
        preview.appendChild(li)
      }
    } else {
      alert('请选择图片格式')
    }
  }
  console.log('图片列表', images)
  setTimeout(() => {
    let lis = document.querySelectorAll('#preview li')
    for (let i = 0; i < lis.length; i++) {
      lis[i].onclick = function (e) {
        images.splice(i, 1)
        preview.removeChild(lis[i])
      }
    }
  }, 300)
}
