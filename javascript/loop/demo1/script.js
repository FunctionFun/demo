let arr = [
  {
    name: 'cat',
    age: 4,
  },
  {
    name: 'bird',
    age: 2,
  },
  {
    name: 'dog',
    age: 10,
  },
  {
    name: 'peg',
    age: 6,
  },
  {
    name: 'fish',
    age: 1,
  },
]

let obj = {
  type: 'animal',
  magic: false,
  state: 1,
}

class animal {
  constructor() {
    this.type = 'animal'
    this.magic = false
    this.state = 1
  }
}

animal.prototype.getInfo = function () {
  return 'animal is friend'
}

let str = '这是一段文字，好好学习，天天向上'

/**
 * -----------------------------------------------
 */

// for 遍历数组
function doFor() {
  for (let i = 0; i < arr.length; i++) {
    console.log('for 遍历数组:', '\nindex =>', i, typeof i, '\nitem =>', arr[i])
  }
}

// for 遍历对象
// 注意 for 不能遍历对象，这里的取值是undefined
function doFor2() {
  for (let i = 0; i < Object.keys(obj).length; i++) {
    console.log('for 遍历对象:', '\nindex =>', i, '\nvalue =>', obj[i])
  }
}

// for 遍历字符串
function doFor3() {
  for (let i = 0; i < str.length; i++) {
    console.log('for 遍历字符串:', '\nindex =>', i, '\ntext =>', str[i])
  }
}

/**
 * -----------------------------------------------
 */

// for...in 遍历数组
function doForIn() {
  for (let index in arr) {
    // if (arr[index].age > 5) {
    //   // 1. 打断
    //   // break
    //   // 2. 返回
    //   // return
    //   // 3. 抛出错误
    //   // throw `${arr[index].name}, 超龄!`
    // }
    // 4. 跳过
    // if (arr[index].age === 2) {
    //   continue
    // }
    console.log(
      'for...in 遍历数组:',
      '\nindex =>',
      index,
      typeof index,
      '\nitem =>',
      arr[index]
    )
  }
}

// for...in 遍历对象
function doForIn2() {
  for (let key in obj) {
    console.log('for...in 遍历对象:', '\nkey =>', key, '\nvalue =>', obj[key])
  }
}

// for...in 遍历字符串
function doForIn3() {
  for (let index in str) {
    console.log(
      'for...in 遍历字符串:',
      '\nindex =>',
      index,
      '\ntext =>',
      str[index]
    )
  }
}

// for...in 遍历类
function doForIn4() {
  let Ani = new animal()
  for (let key in Ani) {
    console.log('for...in 遍历类:', '\nkey =>', key, '\nvalue =>', obj[key])
  }
}

/**
 * -----------------------------------------------
 */

// for...of 遍历数组
function doForOf() {
  for (let item of arr) {
    console.log('for...of 遍历数组:', '\nitem =>', item)
  }
}

// for...of 遍历对象
// 注意 for...of 不能遍历对象，这里会报错
function doForOf2() {
  for (let key of obj) {
    console.log('for...of 遍历对象:', '\nkey =>', key)
    // obj is not iterable
  }
}

// for...of 遍历字符串
function doForOf3() {
  for (let text of str) {
    console.log('for...of 遍历字符串:', '\ntext =>', text)
  }
}

// for...of 遍历类
function doForOf4() {
  let Ani = new animal()
  for (let item of Ani) {
    console.log('for...of 遍历类:', '\nitem =>', item)
  }
}

// for...of 遍历DOM元素集合
function doForOf5() {
  let dom = document.querySelectorAll('button')
  for (let item of dom) {
    console.log('for...of 遍历DOM元素集合:', '\nitem =>', item)
  }
}

// for...of 遍历 停止迭代
function doForOf6() {
  for (let item of arr) {
    // if (item.age > 5) {
    //   // 1. 打断
    //   // break
    //   // 2. 返回
    //   // return
    //   // 3. 抛出错误
    //   // throw `${item.name}, 超龄!`
    // }
    // 4. 跳过
    if (item.age === 2) {
      continue
    }
    console.log('for...of 遍历停止迭代:', '\nitem =>', item)
  }
}

// for...of 生成器 重复迭代
function doForOf7() {
  const gen = (function* () {
    yield 1
    yield 2
    yield 3
  })()

  for (let item of gen) {
    console.log('for...of 遍历生成器:', '\nitem =>', item)
    break
  }
  for (let item of gen) {
    console.log('for...of 遍历生成器222:', '\nitem =>', item)
  }
}

/**
 * -----------------------------------------------
 */

// do...while 遍历数组
function doDoWhile() {
  let i = 0
  do {
    console.log(
      'do...while 遍历数组:',
      '\nindex =>',
      i,
      typeof i,
      '\nitem =>',
      arr[i]
    )
    i += 1
  } while (i < arr.length)
}

// do...while 遍历对象
// 注意 do...while 不能遍历对象，这里的取值是undefined
function doDoWhile2() {
  let i = 0
  do {
    console.log(
      'do...while 遍历对象:',
      '\nindex =>',
      i,
      typeof i,
      '\nvalue =>',
      obj[i]
    )
    i += 1
  } while (i < Object.keys(obj).length)
}

// do...while 遍历字符串
function doDoWhile3() {
  let i = 0
  do {
    console.log(
      'do...while 遍历字符串:',
      '\nindex =>',
      i,
      typeof i,
      '\nvalue =>',
      str[i]
    )
    i += 1
  } while (i < str.length)
}

// do...while 死循环
// 注意，当条件一直为true时，会一直循环下去, 直至浏览器崩溃
function doDoWhile4() {
  do {
    console.log(new Date().getTime())
  } while (true)
}

/**
 * -----------------------------------------------
 */

function doSwitch() {
  let name = 'cat'
  switch (name) {
    case 'dog':
      console.log('Dag age is 10.')
      break
    case 'cat':
      console.log('Cat age is 4.')
      break
    case 'fish':
      console.log('fish age is 1.')
      break
    default:
      console.log('什么也没找到')
  }
}

function doSwitch2() {
  let name = 'bird'
  switch (name) {
    case 'dog':
      console.log('Dag age is 10.')
      break
    case 'bird':
    case 'cat':
      console.log(`${name} age is 4.`)
      break
    case 'fish':
      console.log('fish age is 1.')
      break
    default:
      console.log('什么也没找到')
  }
}

/**
 * ----------------------------------------------
 */

// 测试数组中的每一个元素是否都符合规则
function doEvery() {
  const res = arr.every((item) => item.age > 9)
  console.log(res)
}

// 替换素组中的每一个元素
function doFill() {
  arr.fill({ isPet: true })
  console.log(arr)
}

// 过滤出符合规则的数组元素
function doFilter() {
  const res = arr.filter((item) => item.age > 9)
  console.log(res)
}

// 找到第一个符合规则的数组元素
function doFind() {
  const res = arr.find((item) => item.age > 5)
  console.log(res)
}

// 找到第一个符合规则的数组元素的索引
function doFindIndex() {
  const res = arr.findIndex((item) => item.age > 5)
  console.log(res)
}

// 把多维数组整合成一维数组
function doFlatMap() {
  const strArr = str.split('，')
  const res = strArr.flatMap((item) => item.split(''))
  const res2 = strArr.map((item) => item.split(''))
  // 对比flatMap和map的区别
  console.log(res, res2)
}

// 遍历数组中的每一个元素，并执行一次指定的函数
function doForEach() {
  arr.forEach(item => {
    console.log(item)
  })
}

// 测试数组是否至少有一个元素符合规则
function doSome() {
  const res = arr.some((item) => item.age > 9)
  console.log(res)
}