var packageId = getQueryVariable("id");
$.ajax({
	type:"get",
	url:"https://kuaidi.cy1999.cn/TestCxfHibernate/REST/Misc/getNodesList",
	dataType:"json",
	success:function(data){
		var index;
	    for(var i=0;i<data.length;i++){
	    	if(packageId==data[i].ID)
	    		index = i;
	     }

		var name=document.getElementById("nodeName");
		var tel=document.getElementById("nodeTel");
		
		name.value = data[index].nodeName;
		tel.value = data[index].telCode;
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