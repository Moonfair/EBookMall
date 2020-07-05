var map = new BMap.Map("map");          // 创建地图实例  
var point = new BMap.Point(113.664982,34.747556);  // 创建点坐标  
var data;
var curRowInTabel;
var nodeDeleting;
map.centerAndZoom(point, 12);
map.enableScrollWheelZoom(true);
var opts = {
		width : 250,     // 信息窗口宽度
		height: 80,     // 信息窗口高度
		enableMessage:true//设置允许信息窗发送短息
	   };

$.ajax({
	type:"get",
	url:"https://kuaidi.cy1999.cn/TestCxfHibernate/REST/Misc/getNodesList",
	dataType:"json",
	success:function(data1){
		data = data1;
		var table=document.getElementById("nodeTable");
	    for(var i=0;i<data.length;i++){
            var row=table.insertRow(table.rows.length);
            var c1=row.insertCell(0);
            c1.innerHTML=data[i].ID;
            var c2=row.insertCell(1);
            c2.innerHTML="<p onclick=\"dragMap("+data[i].x+","+data[i].y+","+"&quot;"+data[i].nodeName+"&quot;"+")\">"+data[i].nodeName+"</p>";
            var c3=row.insertCell(2);
            c3.innerHTML=//"<button onclick=\"clickModifyNode("+data[i].ID+")\" class = \"btn btn-block btn-default btn-sm\">修改</button>"+
            	"<button onclick=\"clickDeleteNode("+data[i].ID+","+"&quot;"+data[i].nodeName+"&quot;,this)\" class = \"btn btn-block btn-default btn-sm\" data-toggle=\"modal\" data-target=\"#modal-confirm\">删除</button>";
	     }
		renderMap();
	},
	error:function(errorThrow){
		console.log(errorThrow);
	}
});
function renderMap(){
	for(var i=0;i<data.length;i++){
		var tmpPoint = new BMap.Point(data[i].y,data[i].x);
		var marker = new BMap.Marker(tmpPoint);
		var content = data[i].nodeName;
		map.addOverlay(marker);               
		addClickHandler(content,marker);
	}
}
function addClickHandler(content,marker){
	marker.addEventListener("click",function(e){
		openInfo(content,e)}
	);
}
function openInfo(content,e){
	var p = e.target;
	var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
	var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
	map.openInfoWindow(infoWindow,point); //开启信息窗口
}
function clickDeleteNode(id,name,obj){
	var bodyText = document.getElementById("delete-employee-info");
	bodyText.innerHTML="是否确定删除节点 "+"<font color=\"blue\">"+name+"</font>";
	curRowInTabel = obj.parentNode.parentNode;
	nodeDeleting = id;
}
function clickModifyNode(id){
	window.location="./modifyNode.html?id="+id;
}
function confirmDeleteNode(){
	curRowInTabel.remove();
	$.ajax({
		type:"get",
		url:"https://kuaidi.cy1999.cn/TestCxfHibernate/REST/Misc/deleteNode/"+nodeDeleting,
		dataType:"text",
		success:function(datas){
			if(datas!="OK")
				alert(datas);
			else
				alert("删除成功！");
		},
		error:function(errorThrow){
			console.log(errorThrow);
		}
	});
}
function searchNode() {
  // 声明变量
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchWord");
  filter = input.value.toUpperCase();
  table = document.getElementById("nodeTable");
  tr = table.getElementsByTagName("tr");

  // 循环表格每一行，查找匹配项
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}
function dragMap(tx,ty,content){
    var tPt = new BMap.Point(ty,tx);
    var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象 
	map.openInfoWindow(infoWindow,tPt); //开启信息窗口
}
