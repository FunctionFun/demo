function inpClear(e) {
  e.value = ''
}

// 单个图片上传
let inp1 = document.getElementById('inp1');
inp1.addEventListener('click', function() {
  inpClear(inp1)
}, false);
inp1.addEventListener('change', function() {
  let file = inp1.files[0];
  console.log(file)
}, false);

// 多个图片提交
let inp2 = document.getElementById('inp2');
inp2.addEventListener('click', function() {
  inpClear(inp2)
}, false);
inp2.addEventListener('change', function() {
  let files = inp2.files;
  console.log(files)
}, false);

// 打开前置摄像头
let inp3 = document.getElementById('inp3');
inp3.addEventListener('click', function() {
  inpClear(inp3)
}, false);
inp3.addEventListener('change', function() {
  let file = inp3.files[0];
  console.log(file)
}, false);

// 打开后置摄像头
let inp4 = document.getElementById('inp4');
inp4.addEventListener('click', function() {
  inpClear(inp4)
}, false);
inp4.addEventListener('change', function() {
  let file = inp4.files[0];
  console.log(file)
}, false);
