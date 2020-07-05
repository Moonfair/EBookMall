var curRowInTabel;
var employeeDeleting;

window.onload=function(){
    $.ajax({
    	type:"get",
    	url:"https://kuaidi.cy1999.cn/TestCxfHibernate/REST/Misc/getUserList",
    	dataType:"json",
    	success:function(data){
    		var table=document.getElementById("employeeTable");
    	    for(var i=0;i<data.length;i++){
                var row=table.insertRow(table.rows.length);
                var c1=row.insertCell(0);
                c1.innerHTML=data[i].UID;
                var c2=row.insertCell(1);
                c2.innerHTML=data[i].name;
                
                var c3=row.insertCell(2);                
                var tmp="";
                switch(data[i].URole){
                case 1:
                	tmp = "网点工作人员";
                	break;
                case 2:
                	tmp = "分拣中心工作人员";
                	break;
                case 3:
                	tmp = "司机";
                	break;
                case 4:
                	tmp = "快递员";
                	break;
                }
                c3.innerHTML=tmp;
                
                var c4=row.insertCell(3);
                if(data[i].workNode!=null)
                	c4.innerHTML=data[i].workNode.nodeName;
                else
                	c4.innerHTML="";
                var c5=row.insertCell(4);
                c5.innerHTML=
                    //"<button onclick=\"clickModifyEmployee("+data[i].UID+")\" class = \"btn btn-block btn-default btn-sm\">修改</button>"+
                    "<button onclick=\"clickDeleteEmployee("+data[i].UID+","+"&quot;"+data[i].name+
                "&quot;,this)\" class = \"btn btn-block btn-default btn-sm\" data-toggle=\"modal\" data-target=\"#modal-confirm\">删除</button>";
    	     }
    	},
    	error:function(errorThrow){
    		console.log(errorThrow);
    	}
    });
}

function clickDeleteEmployee(id,name,obj){
	var bodyText = document.getElementById("delete-employee-info");
	bodyText.innerHTML="是否确定删除员工 "+"<font color=\"blue\">"+name+"</font>";
	curRowInTabel = obj.parentNode.parentNode;
	employeeDeleting = id;
}

function clickModifyEmployee(item){
	window.location="./modifyEmployee.html?id="+item;
}

function confirmDeleteEmployee(){
	curRowInTabel.remove();
	
	$.ajax({
		type:"get",
		url:"https://kuaidi.cy1999.cn/TestCxfHibernate/REST/Misc/deleteUser/"+employeeDeleting,
		dataType:"text",
		success:function(datas){
			if(datas!="OK")
				alert(datas);
			else
				alert("删除成功！");
			console.log(datas);
		},
		error:function(errorThrow){
			console.log(errorThrow);
		}
	});
	
}

function searchEmployee() {
	  // 声明变量
	  var input, filter, table, tr, td, i;
	  input = document.getElementById("searchWord");
	  filter = input.value.toUpperCase();
	  table = document.getElementById("employeeTable");
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