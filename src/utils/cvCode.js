// 生成验证码
const cvCodeList = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H' /**'I' */,
  ,
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z' /**'1' */,
  ,
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '0'
];
const cvCode = () => {
  // 时间戳
  const timestamp = Date.now();
  // 验证码
  let code = '';
  for (let i = 0; i < 4; i++) {
    let random = Math.floor(Math.random() * cvCodeList.length);
    if (cvCodeList[random] == undefined) {
      i--;
    } else {
      code += cvCodeList[random];
    }
  }
  return { code, timestamp };
};
module.exports = {
  cvCode
};
