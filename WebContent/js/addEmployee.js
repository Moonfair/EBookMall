var data;
$.ajax({
	type:"get",
	url:"https://kuaidi.cy1999.cn/TestCxfHibernate/REST/Misc/getNodesList",
	dataType:"json",
	success:function(data1){
		data = data1;
		var selector=document.getElementById("worknode");
	    for(var i=0;i<data.length;i++){
	    	selector.add(new Option(data[i].nodeName,data[i].ID));
	    }
	},
	error:function(errorThrow){
		console.log(errorThrow);
	}
});

function newEmployee(){
	var obj = document.getElementById("URole");
	var index = obj.selectedIndex+1;
	
	
	var UserInfo = {
		"uname":$("#employeeUname").val(),
		"PWD":$("#employeePassword").val(),
		"name":$("#emloyeeName").val(),
		"telCode":$("#employeeTelNumber").val(),
		"URole":index
    };
	
	var selector=document.getElementById("worknode");
	var idx = selector.selectedIndex;
    
	//var UserInfo = {"UID":0,"workNode":null,"uname":"testAdd11","telCode":"12345677","name":"TEST","x":0,"y":0,"ORMID":0,"PWD":"12345678","URole":3,"status":null};
	
	$.ajax({
        type:"post",
        url:"https://kuaidi.cy1999.cn/TestCxfHibernate/REST/Misc/newUser/nodeid/"+selector.options[idx].value,
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
            alert("添加成功！");
            event.preventDefault();
            window.location = "employeeManage.html";
	     },
        error: function (errorThrown) {
       	console.log(errorThrown);
       }
    });
    event.preventDefault();
}