const xlsx = require('node-xlsx');
const path = require('path');
const fs = require('fs');
const _ = require('lodash')

const logger = require('./logger')

const fromXlsx = './output.csv'

const data = xlsx.parse(path.join(fromXlsx))

const data1 = data[0].data[3]
const title = data1[0]

const MAINKEY = '小猪佩奇手机壳'
// const PHONE = [{   name: 'iphone',   value: ['6', '6plus', '6s', '6p', '7',
// '8', '5s', 'x', '7plus', '7p'] }, {   name: '苹果',   value: ['6', '6plus',
// '6s', '6p', '7', '8', '5s', 'x', '7plus', '7p'] }, {   name: 'oppo',   value:
// ['r15', 'r9s', 'a59s', 'a77', '73', '79', '83m', 'r11s', 'r11plus',
// 'r9plus', 'p10']   }, {     name: 'vivo',     value: ['x21', 'x21plus',
// 'x20', 'x9s', 'x9plus', 'x7', 'x7plus', 'y85'] }, {   name: '小米',   value:
// ['note4x', '5x', 'note5', 'note3', 'max2', '5', '6', '4x', '3s', '5s',
// '5splus'] }, {   name: '红米',   value: ['note4x', '5x', 'note5', 'note3',
// 'max2', '5', '6', '4x', '3s', '5s', '5splus'] }]
const TYPE = ['iphone/6/7/8/x/plus', 'vivo/20/x/9/s/y/5/6', 'oppo/r/11/s/9/a/7', '小米/5/6/note/4/x', '华为荣耀/mate/10/9/p']
const KEYWORDS = [
  '联名',
  '恶搞',
  '个性',
  '创意',
  '社会',
  '男女',
  '礼物',
  '生日礼物',
  '软壳',
  '磨砂',
  '苹果',
  '朋友',
  '小仙女',
  '情侣',
  '闺蜜',
  '潮款',
  '抖音',
  '火爆',
  '创意',
  '原创',
  '卡通',
  '动漫周边',
  '乔治',
  '配件',
  '保护壳',
  '热门',
  '包邮',
  '新款',
  '硅胶',
  '硬壳',
  '透明'
]
const MAXLENGTH = 29

function getTitle() {
  let result = MAINKEY
  const typeNum = getRandomNum(TYPE.length)
  const keyNum = getRandomNum(KEYWORDS.length)
  const typeWord = TYPE[typeNum]
  const leftWordLength = MAXLENGTH - typeWord.length
  let keyHasGet = {}
  _.set(keyHasGet, `$${keyNum}`, true)

  function getkeyWords(words) {
    const leftLength = leftWordLength - words.length
    if (leftLength > 0) {
      words = words + getNoRepeatKeyWords()
      return getkeyWords(words)
    } else {
      return words
    }
  }
  function getNoRepeatKeyWords() {
    let _keynum = getRandomNum(KEYWORDS.length)
    if (_.get(keyHasGet, `$${_keynum}`)) {
      return getNoRepeatKeyWords()
    } else {
      _.set(keyHasGet, `$${_keynum}`, true)
      return KEYWORDS[_keynum]
    }
  }
  function getRandomNum(length) {
    return parseInt(Math.random() * length)
  }

  result = getkeyWords(result) + typeWord
  // console.log(JSON.stringify(keyHasGet))
  // console.log(result)
  // console.log(result.length)
  return result
}



function getResultList() {
  let resultList = []
  for (let i=0; i< 50 ;i++) {
    resultList.push(getTitle())
  }
  return resultList
}

function getNewCSV () {
  const resultList = getResultList()
  const finalData = Array.from(data)
  resultList.forEach(it => {
    const dataTemp = JSON.parse(JSON.stringify(data1))
    
    // logger.log({
    //   level: 'info',
    //   message: dataTemp
    // })
    dataTemp[0] = it
    finalData[0].data.push(dataTemp)
  })
  logger.log({
    level: 'info',
    message: JSON.stringify(finalData)
  })
  const buffer = xlsx.build(finalData)
  fs.writeFileSync('./abc.csv', buffer)
  
}
getNewCSV()