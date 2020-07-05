var packageId = getQueryVariable("id");
var sts;
var wn;
var uid;

$.ajax({
	type:"get",
	url:"https://kuaidi.cy1999.cn/TestCxfHibernate/REST/Misc/getUserList",
	dataType:"json",
	success:function(data){
		var index;
		for(var i=0;i<data.length;i++){
			if(packageId==data[i].UID)
				index = i;
		}
		var uname=document.getElementById("employeeUname");
		var pwd=document.getElementById("employeePassword");
		var name=document.getElementById("emloyeeName");
		var tel=document.getElementById("employeeTelNumber");
		var role=document.getElementById("URole");
		
		uname.value = data[index].uname;
		pwd.value = data[index].PWD;
		name.value = data[index].name;
		tel.value = data[index].telCode;
		role.options[data[index].URole-1].selected = true;
		sts = data[index].status;
		wn = data[index].worknode;
		alert(wn.ID);
		uid = data[index].UID;	
	},
	error:function(errorThrow){
		console.log(errorThrow);
	}
});
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
function modEmployee(){
	var obj = document.getElementById("URole");
	var index = obj.selectedIndex+1;
	
	
	var UserInfo = {
		"UID":uid,
		"uname":$("#employeeUname").val(),
		"PWD":$("#employeePassword").val(),
		"name":$("#emloyeeName").val(),
		"telCode":$("#employeeTelNumber").val(),
		"URole":index,
		"status":sts,
		"worknode":JSON.stringify(wn)
    };
    
	//var UserInfo = {"UID":0,"workNode":null,"uname":"testAdd11","telCode":"12345677","name":"TEST","x":0,"y":0,"ORMID":0,"PWD":"12345678","URole":3,"status":null};
	
	$.ajax({
        type:"post",
        url:"https://kuaidi.cy1999.cn/TestCxfHibernate/REST/Misc/changeUser/",
        contentType:"application/json",
        dataType:"text",
        data:JSON.stringify(UserInfo),
        async:false,
        success:function(data){
            console.log(data);
            if(data!="OK")
            {
            	alert(data);
                event.preventDefault();
            	return false;
            }
            alert("修改成功！");
            event.preventDefault();
            window.location = "employeeManage.html";
	     },
        error: function (errorThrown) {
       	console.log(errorThrown);
       }
    });
    event.preventDefault();
}
