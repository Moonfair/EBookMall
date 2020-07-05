var map = new BMap.Map("baiduMap");          // 创建地图实例  
var point = new BMap.Point(113.664982,34.747556);  // 创建点坐标  
var nodeX = document.getElementById("nodeX");
var nodeY = document.getElementById("nodeY");
var x;
var y;
var regcode;
var DISTRICTS;
var provinceCode = '',
    cityCode = '',
    districtCode = '';
var province_val = "",
	city_val = "",
	district_val = "";
//筛选的地区
var province_selector = $('#province_selector'),
    city_selector = $('#city_selector'),
    district_selector = $('#district_selector');
var htm = '<option value="">请选择</option>';

//初始化地图
map.centerAndZoom(point, 12);
map.enableScrollWheelZoom(true);
map.addEventListener("click", updatePoint);

//初始化三级联动
$.ajax({
    type: 'GET',
    url: 'resources/districts.json',
    dataType: 'json'
}).done(function (res) {
    DISTRICTS = res;
    htm = '<option value="">请选择</option>';
    for(var key in DISTRICTS['100000']) {
        htm += '<option value="'+key+'">'+DISTRICTS['100000'][key]+'</option>';
    }
    province_selector.html(htm);
    city_selector.html('<option value="">请选择</option>');
    district_selector.html('<option value="">请选择</option>');
    
}).fail(function () {
    console.log('获取地区json数据失败');
});

province_selector.change(function () {
    provinceCode =province_selector.find('option:selected').val();
    console.log(provinceCode);
    province_val = province_selector.find('option:selected').text();
    map.centerAndZoom(province_val, 11)
    regcode = "";
    htm = '<option value="">请选择</option>';
    for(var key in DISTRICTS[provinceCode]) {
        htm += '<option value="'+key+'">'+DISTRICTS[provinceCode][key]+'</option>';
    }
    city_selector.html(htm);
    district_selector.html('<option value="">请选择</option>');
    
});
city_selector.change(function () {
    cityCode =city_selector.find('option:selected').val();
    console.log(cityCode);
    city_val = city_selector.find('option:selected').text();
    map.centerAndZoom(province_val+city_val, 12);
    regcode = "";
    htm = '<option value="">请选择</option>';
    for(var key in DISTRICTS[cityCode]) {
        htm += '<option value="'+key+'">'+DISTRICTS[cityCode][key]+'</option>';
        district_selector.html(htm);
    }
});
district_selector.change(function () {
    districtCode =district_selector.find('option:selected').val();
    console.log(districtCode);
    district_val = district_selector.find('option:selected').text();
    map.centerAndZoom(province_val+city_val+district_val, 13);
    regcode = districtCode;
});


function updatePoint(e){
	nodeY.value = e.point.lng.toFixed(6);
	nodeX.value = e.point.lat.toFixed(6);
	
}

function newNode(){
	var obj = document.getElementById("nodeType");
	var index = obj.selectedIndex+1;
	
	if(regcode==""){
   	 alert("请选择节点所属区域！");
        event.preventDefault();
        return false;
    }
	if(nodeX.value==""||nodeY.value==""){
	   	 alert("请在右侧地图上选择网点位置！");
	     event.preventDefault();
	     return false;
	}
	var TransNode = {
			"nodeName":$("#nodeName").val(),
			"nodeType":index,
			"regionCode":regcode,
			"telCode":$("#nodeTel").val(),
			"x":nodeX.value,
			"y":nodeY.value
	};
		
	$.ajax({
        type:"post",
        url:"https://kuaidi.cy1999.cn/TestCxfHibernate/REST/Misc/newNode/",
        contentType:"application/json",
        dataType:"text",
        data:JSON.stringify(TransNode),
        async:false,
        success:function(data){
            alert("添加成功！");
            console.log(data);
            if(data!="OK")
            {
            	alert(data);
                event.preventDefault();
            	return false;
            }
            event.preventDefault();
            window.location = "nodeManage.html";
	     },
        error: function (errorThrown) {
       	console.log(errorThrown);
       }
    });
    event.preventDefault();
}