var citylocation, map, marker = null;

var geolocation = new qq.maps.Geolocation("OTOBZ-LWEKI-MMFG5-5VIAW-P4PHS-NLFWZ", "cityStar2");

var options = { timeout: 2000 };

/**
 * 初始化地图
 */
function init(lat, lng, zoom) {
  let myLatlng = new qq.maps.LatLng(lat, lng);
  //console.log(myLatlng);



  var myOptions = {
    zoom: 16,
    center: myLatlng,
    mapTypeId: qq.maps.MapTypeId.ROADMAP,
    mapTypeControl: false,
    zoomControl: false,
    panControl: false
  }

  //console.log(window.outerHeight);
  map = new qq.maps.Map(document.getElementById("map"), myOptions);

  let icon = new qq.maps.MarkerImage(
    'resource/others/images/ui/ui_comn_info_button_loc.png'
  );
  marker = new qq.maps.Marker({
    icon: icon,
    map: map,
    position: myLatlng
  });


  qq.maps.event.addListener(map, 'zoom_changed', function () {
    //console.log("地图缩放：" + map.getCenter());
    let centerLatlng = map.getCenter();
    if (actionCallBackFun != null) {
      actionCallBackFun('zoom_changed', {
        zoom: map.getZoom(),
        lat: centerLatlng.getLat(), lng: centerLatlng.getLng()
      });
    }
  });
  qq.maps.event.addListener(map, 'dragstart', function () {
    //console.log("地图开始拖动：" + map.getCenter());
    let centerLatlng = map.getCenter();
    if (actionCallBackFun != null) {
      //actionCallBackFun('dragstart',{lat:centerLatlng.getLat(),lng:centerLatlng.getLng()});
    }
  });
  qq.maps.event.addListener(map, 'dragend', function () {
    //console.log("地图结束拖动：" + map.getCenter());
    let centerLatlng = map.getCenter();
    //getCityName(centerLatlng);
    if (actionCallBackFun != null) {
      actionCallBackFun('dragend', { zoom: map.getZoom(), lat: centerLatlng.getLat(), lng: centerLatlng.getLng() });
    }
  });
}

/**
 * 初始化地图
 */
function moveMap(lat, lng) {
  let myLatlng = new qq.maps.LatLng(lat, lng);
  if (map) {
    map.panTo(myLatlng);
    if (actionCallBackFun != null) {
      actionCallBackFun('dragend', { zoom: map.getZoom(), lat: myLatlng.getLat(), lng: myLatlng.getLng() });
    }
  }
}

var actionCallBackFun = null;
var actionCallBackBody = null;
function setActionCallBackFun(fun, body) {
  actionCallBackFun = fun;
  actionCallBackBody = body;
}

/**
 * 屏蔽egret事件
 */
function setEgretEventsReply(bool) {
  //console.log('onmouseup:' + bool);
  document.getElementsByClassName("egret-player")[0].style.pointerEvents = bool ? 'auto' : 'none';
}

/**
 * 获取定位
 */
function showPosition(position) {

  var position_str = JSON.stringify(position, null, 4);
  var realobj = eval('(' + position_str + ')');
  return realobj;
};

function showErr() {
  alert("获取位置失败");
  return;
};

function getPoSition(fun, error) {
  geolocation.getLocation(fun, error, options);
  //geolocation.getIpLocation(fun, error);
}
///////////////////////////////
///////////////////////////////
///////////////////////////////

var buildingArray = [];
var bCallBackFun = null;
var bCallBackBody = null;
function setBuildCallBackFun(fun, body) {
  bCallBackFun = fun;
  bCallBackBody = body;
}
/**
 * 添加探索范围圆
 */
var exploreCircle;
function addCircle(data) {
  if (data != null) {
    exploreCircle = new qq.maps.Circle({
      //圆形的中心点坐标。
      center: new qq.maps.LatLng(data.lat, data.lng),
      //圆形是否可点击。
      clickable: false,
      //圆形的填充色，可通过Color对象的alpha属性设置透明度。
      //fillColor: "#00f",
      fillColor: new qq.maps.Color(133, 195, 65, 0.5),
      //要显示圆形的地图。
      map: map,
      //圆形的半径。
      radius: data.radius * 1000,
      //圆形的边框线宽。
      strokeWeight: 0,
      //圆形是否可见。
      visible: true,
      //圆形的zIndex值。
    });
  }
}
function removeCircle() {
  if(exploreCircle){
    exploreCircle.setMap(null);
    exploreCircle=null;
  }
}

/**
 * 添加地图建筑
 */
function addBuilding(data) {
  if (data != null) {
    //console.log(data);
    let icon = new qq.maps.MarkerImage(
      data.imageUrl
      /*null, null, null,
      new qq.maps.Size(data.scaleSize[0], data.scaleSize[1])*/
    );

    let marker = new qq.maps.Marker({
      icon: icon,
      map: map,
      position: new qq.maps.LatLng(data.position[0], data.position[1])
    });

    let titleIcon = new bTitleIcon({
      map: map,
      position: new qq.maps.LatLng(data.position[0], data.position[1]),
      info: { isHas: data.isHas, count: data.bName }
    });

    qq.maps.event.addListener(marker, 'click', function (e) {
      //console.log(e);
      if (bCallBackFun != null) {
        bCallBackFun('click', data);
      }
    });
    buildingArray.push({ marker: marker, title: titleIcon, data: data });
  }
}
function removeBuilding(data) {
  if (data && buildingArray && buildingArray.length > 0) {
    let index = -1;
    for (i in buildingArray) {
      if (buildingArray[i]['data'].bId == data.bId) {
        buildingArray[i]['marker'].setMap(null);
        buildingArray[i]['title'].destroy();
        index = i;
        break;
      }
    }
    if (index > -1) {
      buildingArray.splice(index, 1);
    }
  }
}
function emptyBuilding() {
  if (buildingArray && buildingArray.length > 0) {
    for (i in buildingArray) {
      buildingArray[i]['marker'].setMap(null);
      buildingArray[i]['title'].destroy();
    }
    buildingArray.length = 0;
  }
}
function showOrHideBuilding(bool) {
  if (buildingArray && buildingArray.length > 0) {
    for (i in buildingArray) {
      if (bool) {
        buildingArray[i]['marker'].setMap(map);
        buildingArray[i]['title'].draw();
      } else {
        buildingArray[i]['marker'].setMap(null);
        buildingArray[i]['title'].destroy();
      }
    }
  }
}


var playerArray = [];
var pCallBackFun = null;
var pCallBackBody = null;
function setPlayerCallBackFun(fun, body) {
  pCallBackFun = fun;
  pCallBackBody = body;
}
/**
 * 添加地图玩家
 */
function addPlayerIcon(data) {
  if (data != null) {
    //console.log(data);
    let pIcon = new playerIcon({
      map: map,
      position: new qq.maps.LatLng(data.position[0], data.position[1]),
      info: data.info
    });

    playerArray.push({ marker: pIcon, data: data.info });
  }
}
function removePlayerIcon(data) {
  if (data && playerArray && playerArray.length > 0) {
    let index = -1;
    for (let i in playerArray) {
      if (playerArray[i]['data'].pId == data.pId) {
        playerArray[i]['marker'].destroy();
        index = i;
        break;
      }
    }
    if (index > -1) {
      playerArray.splice(index, 1);
    }
  }
}
function emptyPlayerIcon() {
  if (playerArray && playerArray.length > 0) {
    for (let i in playerArray) {
      playerArray[i]['marker'].destroy();
    }
    playerArray.length = 0;
  }
}
function playerArrayFun(bool) {
  if (playerArray && playerArray.length > 0) {
    for (let i in playerArray) {
      if (bool) {
        playerArray[i]['marker'].draw();

      } else {
        playerArray[i]['marker'].destroy();
      }
    }
  }
}

//------------------------------//

/**
 * 添加折线
 */
var polylines = [];
function addPolyline(data) {
  if (data) {
    let polyline = new qq.maps.Polyline({
          path: [
              new qq.maps.LatLng(data.start.lat,data.start.lng),
              new qq.maps.LatLng(data.end.lat,data.end.lng),
          ],
          strokeColor: '#F42727',
          strokeWeight: 5,
          strokeDashStyle : 'dash',
          map : map,
    });
    if(!polylines.some(line=>{return line==polyline;})){
        polylines.push({id:data.id,polyline:polyline});
    }
  }
}
/**
 * 移除折线
 */
function removePolyline() {
  if(polylines.length>0){
    for(let polyline of polylines){
      if(polyline && polyline.polyline)
      {
        polyline.polyline.setMap(null);
        polyline.polyline=null;
        polyline  = null;
      }
    }
    polylines = [];
  }
}

function removePolylineByCar(id) {
  if(polylines.length>0){
    for (let index = 0; index < polylines.length; index++) {
      let polyline = polylines[index];
      if(polyline && polyline.id)
      {
        if(polyline.id==id)
        {
          polylines.splice(index,1);
          if(polyline.polyline)
          {
            polyline.polyline.setMap(null);
            polyline.polyline=null;
            polyline  = null;
          }
          break;
        }
      }
    }
  }
}


var expeditionCarArray = [];

/**
 * 添加地图出征路线上车辆图标
 */
function addExpeditionCarMarker(data) {
  if (data != null) {
    console.log(data);
    let icon = new qq.maps.MarkerImage(
      data.imageUrl,
      new qq.maps.Size(150, 73),
    );
    
    let marker = new qq.maps.Marker({
      icon: icon,
      map: map,
      position: new qq.maps.LatLng(data.lat, data.lng),
      zIndex:10,
    });

    if(!expeditionCarArray.some(markerData=>{return markerData==marker})){
      expeditionCarArray.push({id:data.id,marker:marker});
    }

    marker.setMap(map);
  } 
}

function removeExpeditionCarMarkerById(id)
{
  if(expeditionCarArray.length>0){
    for (let index = 0; index < expeditionCarArray.length; index++) {
      let data = expeditionCarArray[index];
      if(data && data.id)
      {
        if(data.id==id)
        {
          expeditionCarArray.splice(index,1);
          if(data.marker)
          {
            data.marker.setMap(null);
            data.marker = null;
            data = null;
          }
          break;
        }
      }
    }
  }
}

function removeExpeditionCarMarker()
{
  if(expeditionCarArray.length > 0){
    for (let data of expeditionCarArray) {
      if(data && data.marker){
        data.marker.setMap(null);
        data.marker = null;
        data = null;
      }
    }
    expeditionCarArray = [];
  }
}
/**
 * 获取矩形范围的起始点
 */
function getRectRangePoint(center, radius) {
  let pointStr = "0";
  if (center && center.length >= 2 && radius > 0) {
    let centerLatlng = new qq.maps.LatLng(center[0], center[1]);
    let top = qq.maps.geometry.spherical.computeOffset(centerLatlng, radius, 0).getLat();
    let down = qq.maps.geometry.spherical.computeOffset(centerLatlng, radius, 180).getLat();
    let left = qq.maps.geometry.spherical.computeOffset(centerLatlng, radius, -90).getLng();
    let right = qq.maps.geometry.spherical.computeOffset(centerLatlng, radius, 90).getLng();
    pointStr = top + "@" + down + "@" + left + "@" + right;
    //console.log(pointStr);
  }
  return pointStr;
}


/**
 * 获取两点距离
 */
function getDistance(start, end) {
  let distance = 0;
  let startLatlng = new qq.maps.LatLng(start['lat'], start['lng']);
  let endLatlng = new qq.maps.LatLng(end['lat'], end['lng']);
  distance = (Math.floor(qq.maps.geometry.spherical.
    computeDistanceBetween(startLatlng, endLatlng))) / 1000;
  return distance;
}
//31.122233153559492@31.104266846440506@121.37156747111179@121.39255252888822 

/**
 * 附近的人图标类
 */
var playerIcon = function (opts) {
  qq.maps.Overlay.call(this, opts);
}

//继承Overlay基类
playerIcon.prototype = new qq.maps.Overlay();
//定义construct,实现这个接口来初始化自定义的Dom元素
playerIcon.prototype.construct = function () {
  this.dom = document.createElement('div');
  //this.dom.setAttribute("class", "playerIcon");
  let dateInfo = this.get('info');
  if (dateInfo.sex == 1) {
    this.dom.setAttribute("class", "mPlayerIcon");
  } else {
    this.dom.setAttribute("class", "wPlayerIcon");
  }

  let img = document.createElement("img");
  img.setAttribute("class", "playerHead");
  img.src = "resource/others/images/ui/userHeadImg1.png";
  this.dom.appendChild(img);

  let span = document.createElement("label");
  span.setAttribute("class", "playerName");
  span.innerHTML = dateInfo.name;
  this.dom.appendChild(span);

  //将dom添加到覆盖物层，overlayMouseTarget的顺序容器 5，此容器包含透明的鼠标相应元素，用于接收Marker的鼠标事件
  this.getPanes().overlayMouseTarget.appendChild(this.dom);
  //设置自定义覆盖物点击事件
  this.dom.onclick = function () {
    if (pCallBackFun != null) {
      pCallBackFun('click', dateInfo);
    }
  }

}
//自定义的方法，用于设置myOverlay的html
playerIcon.prototype.html = function (html) {
  this.dom.innerHTML = html;
}
//绘制和更新自定义的dom元素
playerIcon.prototype.draw = function () {
  //获取地理经纬度坐标
  var position = this.get('position');
  if (position) {
    var pixel = this.getProjection().fromLatLngToDivPixel(position);
    this.dom.style.left = pixel.getX() - 25 + 'px';
    this.dom.style.top = pixel.getY() - 26 + 'px';
  }
}

playerIcon.prototype.destroy = function () {
  //移除dom
  this.dom.parentNode.removeChild(this.dom);
}

/**
 * 获取城市名称
 */
function getCityName(lat, lng, fun) {
  let cityLatlng = new qq.maps.LatLng(lat, lng);
  let citylocation = new qq.maps.CityService();
  citylocation.setComplete(function (results) {
    //console.log(results.detail.detail);
    let detail = results.detail.detail;
    let detailArry = detail.split(',');
    detailArry.reverse();
    detailArry.shift();
    //detail = detailArry.join('');
    fun(detailArry);
  });
  citylocation.setError(function () {
    //alert("出错了，请输入正确的城市区号！！！");
  });
  citylocation.searchCityByLatLng(cityLatlng);
}




/**
 * 添加地图区域图标
 */
var areaArray = [];
function addAreaIcon(data) {
  if (data != null) {
    //console.log(data);
    let aIcon = new areaIcon({
      map: map,
      position: new qq.maps.LatLng(data.position[0], data.position[1]),
      info: data
    });

    areaArray.push({ marker: aIcon, data: data });
  }
}

function emptyAreaIcon() {
  if (areaArray && areaArray.length > 0) {
    for (let i in areaArray) {
      areaArray[i]['marker'].destroy();
    }
    areaArray.length = 0;
  }
}
function areaArrayFun(bool) {
  if (areaArray && areaArray.length > 0) {
    for (let i in areaArray) {
      if (bool) {
        areaArray[i]['marker'].draw();

      } else {
        areaArray[i]['marker'].destroy();
      }
    }
  }
}

/**
 * 区域图标类
 */
var areaIcon = function (opts) {
  qq.maps.Overlay.call(this, opts);
}

areaIcon.prototype = new qq.maps.Overlay();

areaIcon.prototype.construct = function () {
  this.dom = document.createElement('div');
  this.dom.setAttribute("class", "areaIcon");
  let dateInfo = this.get('info');
  this.dom.innerHTML = dateInfo.count;
  this.getPanes().overlayLayer.appendChild(this.dom);
}

areaIcon.prototype.html = function (html) {
  this.dom.innerHTML = html;
}

areaIcon.prototype.draw = function () {
  var position = this.get('position');
  if (position) {
    var pixel = this.getProjection().fromLatLngToDivPixel(position);
    this.dom.style.left = pixel.getX() - 50 + 'px';
    this.dom.style.top = pixel.getY() - 50 + 'px';
  }
}

areaIcon.prototype.destroy = function () {
  if (this.dom != null && this.dom.parentNode != null) {
    this.dom.parentNode.removeChild(this.dom);
  }
}



/**
 * 建筑title类
 */
var bTitleIcon = function (opts) {
  qq.maps.Overlay.call(this, opts);
}

bTitleIcon.prototype = new qq.maps.Overlay();

bTitleIcon.prototype.construct = function () {
  let dateInfo = this.get('info');
  this.dom = document.createElement('div');
  if (!dateInfo.isHas) {
    this.dom.setAttribute("class", "bTitleIcon");
  } else {
    this.dom.setAttribute("class", "haveBTitleIcon");
  }
  this.dom.innerHTML = dateInfo.count;
  this.getPanes().overlayLayer.appendChild(this.dom);
}

bTitleIcon.prototype.html = function (html) {
  this.dom.innerHTML = html;
}

bTitleIcon.prototype.draw = function () {
  var position = this.get('position');
  if (position) {
    var pixel = this.getProjection().fromLatLngToDivPixel(position);
    this.dom.style.left = pixel.getX() - 60 + 'px';
    this.dom.style.top = pixel.getY() - 160 + 'px';
  }
}

bTitleIcon.prototype.destroy = function () {
  if (this.dom != null && this.dom.parentNode != null) {
    this.dom.parentNode.removeChild(this.dom);
  }
}

var eventsIconArray = [];
var eventsIconCallBackFun = null;
var eventsIconCallTarget = null;
function setEventsIconCallBackFun(fun, target) {
  eventsIconCallBackFun = fun;
  eventsIconCallTarget = target;
}
/**
 * 添加地图事件ICON
 */
function addEventsIcon(data) {
  if (data != null && map) {
    let isExist = isExistEventsIcon(data.id);
    if (!isExist) {
      let icon = new qq.maps.MarkerImage(
        data.imageUrl
        /*null, null, null,
        new qq.maps.Size(data.scaleSize[0], data.scaleSize[1])*/
      );

      let marker = new qq.maps.Marker({
        icon: icon,
        map: map,
        position: new qq.maps.LatLng(data.latitude, data.longitude)
      });
      //  let titleIcon = new bTitleIcon({
      //               map: map,
      //     position: new qq.maps.LatLng(data.position[0], data.position[1]),
      //     info:{isHas:data.isHas,count:data.bName}
      //           });
      let listener = qq.maps.event.addListener(marker, 'click', function (e) {
        if (eventsIconCallBackFun != null && eventsIconCallTarget) {
          eventsIconCallBackFun.call(eventsIconCallTarget, 'click', data);
        }
      });
      eventsIconArray.push({ marker: marker, data: data, listener: listener });
    }
  }
  else {
    console.log("重复添加事件图标 id：", data.id);
  }
}
/**
 * 是否已经存在事件ICON
 */
function isExistEventsIcon(id) {
  if (eventsIconArray) {
    for (let data of eventsIconArray) {
      if (data.id == id) {
        return true;
      }
    }
  }
  return false;
}
function removeEventsIcon(id) {
  if (eventsIconArray) {
    for (let data of eventsIconArray) {
      if (data.data.id == id) {
        data['marker'].setMap(null);
        qq.maps.event.removeListener(data.listener);
        //data['title'].destroy();
        eventsIconArray.splice(i, 1);
        break;
      }
    }
  }
}
function emptyEventsIcon() {
  if (eventsIconArray) {
    for (let data of eventsIconArray) {
      data['marker'].setMap(null);
      qq.maps.event.removeListener(data.listener);
      // data['title'].destroy();
    }
    eventsIconArray.length = 0;
  }
}
function showOrHideEventsIcon(bool) {
  if (eventsIconArray) {
    for (let data of eventsIconArray) {
      if (bool) {
        data['marker'].setMap(map);
        // eventsIconArray[i]['title'].draw();
      } else {
        data['marker'].setMap(null);
        // eventsIconArray[i]['title'].destroy();
      }
    }
  }
}
