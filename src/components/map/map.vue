<template >
  <div id="container" :style="style"></div>
</template>

<script>
  export default{
    data(){
      return{
        style:{
          width:'100%',
          height:'1000px'
        }
      }
    },
    props:['m'],
    watch: {
      m: {
        handler: function () {
         this.openlockList(this.m);
        },
        deep: true
      }
    },
    methods: {
      //时间戳怎么转成日期格式

      getStartTime:function (time) {
          if(time){
            var now=new Date(time);
            var year=now.getFullYear();
            var month=now.getMonth()+1;
            var date=now.getDate();
            var hour=now.getHours();
            var minute=now.getMinutes();
            var second=now.getSeconds();
            return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
          }

      },
      openlockList(locks) {
      var lock = locks;
        //console.log(lock);
        //初始化地图对象，加载地图
        var map = new AMap.Map("container", {resizeEnable: true});
       // console.log(lock[0].lockname);
       // console.log(lock[1].lockname);
        //console.log(lock[2].lockname);
        //console.log(lock[3].lockname);
        var infoWindow = new AMap.InfoWindow({isCustom: true, offset: new AMap.Pixel(0, -30)});
        var title = '锁具信息'
        for (var i = 0, marker; i < lock.length; i++) {
          var marker = new AMap.Marker({
            position:[lock[i].longitude,lock[i].latitude],
            map: map,
            icon : require("../../assets/images/lock.png")
          });
          marker.content = "<div style='line-height:20px;width: 300px'>" +
            "<img src=\"http://tpc.googlesyndication.com/simgad/5843493769827749134\" style=\"float:right;zoom:1;overflow:hidden;width:100px;height:100px;margin-left:3px;\"/>" +
            "锁具名称："+[lock[i].lockname] +
            "<br>安装位置："+[lock[i].lockaddress] + i +
            "<br>站点类型："+[lock[i].locktype] + i +
            "<br>详细地址："+[lock[i].lockaddress] + i +
            "<br>开锁时间："+[this.getStartTime(lock[i].opentime)] + "</div>";
          marker.on('click', markerClick);
          marker.emit('click', {target: marker});
        }
        function markerClick(e) {
          var aaa = createInfoWindow(title, e.target.content);
          infoWindow.setContent(aaa);
          infoWindow.open(map, e.target.getPosition());
        }

        //构建自定义信息窗体
        function createInfoWindow(title, content) {
          var info = document.createElement("div");
          info.className = "info";

          //可以通过下面的方式修改自定义窗体的宽高
          //info.style.width = "400px";
          // 定义顶部标题
          var top = document.createElement("div");
          var titleD = document.createElement("div");
          var closeX = document.createElement("img");
          top.className = "info-top";
          titleD.innerHTML = title;
          closeX.src = "http://webapi.amap.com/images/close2.gif";
          closeX.onclick = closeInfoWindow;

          top.appendChild(titleD);
          top.appendChild(closeX);
          info.appendChild(top);

          // 定义中部内容
          var middle = document.createElement("div");
          middle.className = "info-middle";
          middle.style.backgroundColor = 'white';
          middle.innerHTML = content;
          info.appendChild(middle);

          // 定义底部内容
          var bottom = document.createElement("div");
          bottom.className = "info-bottom";
          bottom.style.position = 'relative';
          bottom.style.top = '0px';
          bottom.style.margin = '0 auto';
          var sharp = document.createElement("img");
          sharp.src = "http://webapi.amap.com/images/sharp.png";
          bottom.appendChild(sharp);
          info.appendChild(bottom);
          return info;
        }

        //关闭信息窗体
        function closeInfoWindow() {
          map.clearInfoWindow();
        }

        map.setFitView();
      }
    }
  }
</script>

<style type="text/css">
.info {
  border: solid 1px silver;
}
div.info-top {
  position: relative;
  background: none repeat scroll 0 0 #F9F9F9;
  border-bottom: 1px solid #CCC;
  border-radius: 5px 5px 0 0;
}
div.info-top div {
  display: inline-block;
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  line-height: 31px;
  padding: 0 10px;
}
div.info-top img {
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s;
}
div.info-top img:hover {
  box-shadow: 0px 0px 5px #000;
}
div.info-middle {
  font-size: 12px;
  padding: 6px;
  line-height: 20px;
}
div.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
}
div.info-bottom img {
  position: relative;
  z-index: 104;
}
span {
  margin-left: 5px;
  font-size: 11px;
}
.info-middle img {
  float: left;
  margin-right: 6px;
}
</style>
