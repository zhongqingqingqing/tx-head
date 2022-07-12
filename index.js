//1.获得需要操作的DOM

//背景图容器
var imgs = document.querySelector(".imgs");
//左侧导航栏容器
var sideBar = document.querySelector(".side-bar");

var imgActive; //记录活跃的图片
var listActive; //记录活跃的列表
var imgArr = []; //记录所有的图片数据
var listArr = []; //记录所有的列表数据

//根据data数据，渲染图片和左侧导航栏列表数据
for (var i = 0; i < data.length; i++) {
  //生成图片元素(a)
  var imgDOM = document.createElement("a");
  //渲染图片数据
  imgDOM.href = "#"; //图片跳转地址
  imgDOM.style.backgroundImage = "url(" + data[i].img + ")"; //背景图片地址
  imgDOM.style.backgroundColor = data[i].bg; //背景颜色
  //加入背景图容器
  imgs.appendChild(imgDOM);
  //加入数组
  imgArr.push(imgDOM);

  //生成展示列表元素（a）
  var listDOM = document.createElement("a");
  //渲染列表数据
  listDOM.href = "#";
  listDOM.className = "nav"; //未激活状态
  listDOM.title = data[i].desc;
  listDOM.innerHTML = "<span>" + data[i].title + "</span>" + data[i].desc;
  //加入左侧导航栏容器
  sideBar.appendChild(listDOM);
  //加入数组
  listArr.push(listDOM);

  //默认显示第一张
  if (i === 0) {
    imgDOM.className = "active";
    listDOM.className = "active";
    //记录当前最新活跃的数据信息
    imgActive = imgDOM;
    listActive = listDOM;
  }

  //给左侧导航栏中所有渲染出的数据（a)添加鼠标事件
  (function (imgDOM, listDOM) {
    listDOM.addEventListener("mouseenter", listChange);
    function listChange() {
      //清除之前激活的样式
      imgActive.className = " ";
      listActive.className = "nav";

      //获取当前需要被渲染数据的下标(图片和列表下标一样)
      var index = imgArr.indexOf(imgDOM);

      //渲染对应的数据（active)
      imgArr[index].className = "active";
      listArr[index].className = "active";

      //记录最新的活跃信息
      imgActive = imgDOM;
      listActive = listDOM;

      //停止轮播
      clearInterval(timerId);
    }

    //注册鼠标移出事件（开始轮播）
    listDOM.addEventListener("mouseleave", start);
  })(imgDOM, listDOM);
}

//轮播
var duration = 2000; //时间间隔
var timerId;
//开始轮播
function start() {
  timerId = setInterval(carousel, duration);
  function carousel() {
    //清除当前活跃的样式
    imgActive.className = "";
    listActive.className = "nav";

    //获得当前活跃的下标
    var index = imgArr.indexOf(imgActive);

    //把记录下一项该激活的信息
    if (index === imgArr.length - 1) {
      imgActive = imgArr[0];
      listActive = listArr[0];
    } else {
      imgActive = imgArr[index + 1];
      listActive = listArr[index + 1];
    }

    //把记录的激活信息激活
    imgActive.className = "active";
    listActive.className = "active";
  }
}
start();
