let robot = require('robotjs');
robot.setMouseDelay(20);
//可以在命令后面加分钟数，默认18分钟

let totalTime;
let num = 1;
if (Number(process.argv.slice(2)[0])) {
  totalTime = process.argv.slice(2)[0] * 60000
} else {
  totalTime = 18 * 60000;
}

let timeNext = new Date().valueOf() + totalTime;
let timeFiveAfter = new Date().valueOf() + 5 * 60000;
setInterval(() => {
  console.log("当下为第" + num + "把，下把剩余时间为" + (timeNext - new Date().valueOf())/1000 + "秒")
}, 20000);

//获取屏幕大小
let screenSize = robot.getScreenSize();
console.log('屏幕分辨率为', screenSize);

function autoSelectCard(){
  // console.log('取消点击开始游戏，每隔90s点击下方的123卡片');
  // function getCard123(){
  //   robot.moveMouse(...maintain.firstCard);
  //   robot.mouseToggle('down');
  //   robot.mouseToggle('up');
  //   setTimeout(() => {
  //     robot.moveMouse(...maintain.secondCard);
  //     robot.mouseToggle('down');
  //     robot.mouseToggle('up');
  //     setTimeout(() => {
  //       robot.moveMouse(...maintain.thirdCard);
  //       robot.mouseToggle('down');
  //       robot.mouseToggle('up');
  //       robot.keyTap('f');
  //     }, 500);
  //   }, 500);
  // }
  // getCard123()
  // let getCard = setInterval(() => {
  //   getCard123()
  // }, 90000);

  // setTimeout(() => {
  //   clearInterval(getCard)
  // }, 7 * 60000);
}

function getCoin(){
  //点击寻找对局
  robot.moveMouse(screenSize.width * 0.45, screenSize.height * 0.77);
  // robot.mouseClick();
  robot.mouseToggle('down');
  robot.mouseToggle('up');
  console.log("已经点击寻找对局");

  //游戏时间
  setTimeout(() => {
    //移动到开始游戏按钮位置
    robot.moveMouse(screenSize.width * 0.5, screenSize.height * 0.66);
    //每4秒点击一次开始游戏
    let startGame = setInterval(() => {
      // robot.mouseClick();
      robot.mouseToggle('down');
      robot.mouseToggle('up');
      console.log("已经点击开始游戏, 距离点击五分钟还剩" + (timeFiveAfter - new Date().valueOf())/1000 + "秒");
    }, 4000);
    //五分钟后取消点击开始游戏
    setTimeout(() => {
      clearInterval(startGame);
      robot.moveMouse(100, 100);
      console.log("已经取消点击开始游戏，鼠标移动到100， 100");
      // autoSelectCard()
    }, 5 * 60 * 1000);

  }, 1000);

  //totalTime - 40s 的时候发起投降, 并退出，重新运行脚本
  setTimeout(() => {
    robot.keyTap('escape');
    setTimeout(() => {
      //投降按钮
      robot.moveMouse(screenSize.width * 0.4, screenSize.height * 0.77);
      robot.mouseToggle('down');
      robot.mouseToggle('up');
      setTimeout(() => {
        //确认投降
        robot.moveMouse(screenSize.width * 0.43, screenSize.height * 0.45);
        robot.mouseToggle('down');
        robot.mouseToggle('up');
        setTimeout(() => {
          //再玩一次
          robot.moveMouse(screenSize.width * 0.45, screenSize.height * 0.77);
          setTimeout(() => {
            robot.mouseToggle('down');
            robot.mouseToggle('up');
          }, 1000);
        }, 20000);
      }, 1000);
    }, 1000);
  }, totalTime - 40000);
}

setTimeout(() => {
  getCoin();
  //每totalTime分钟执行一次
  setInterval(() => {
    //重置console计时器
    num++;
    timeNext = new Date().valueOf() + totalTime;
    timeFiveAfter = new Date().valueOf() + 5 * 60000;
    getCoin()
  }, totalTime);

}, 4000);
