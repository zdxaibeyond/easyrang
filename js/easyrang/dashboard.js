$(function(){
	 //数据写入控制台页面
     var data=[{
        gameName:'CTF大赛' ,
        gamedescription:'预选赛',
        startTime:'2017/3/2 10：30',
        overTime:'2017/3/2 12：30',
        id:'dash-1'
       },{
        gameName:'靶场大赛' ,
        gamedescription:'总决赛',
        startTime:'2017/3/3 10：30',
        overTime:'2017/3/3 12：30',
        id:'dash-2'
        },{
        gameName:'红蓝对抗大赛' ,
        gamedescription:'测试字体长度测试字体长度测试字体长度测试字体长度测试字体长度测试字体长度',
        startTime:'2017/3/4 14：30',
        overTime:'2017/3/4 16：30',
        id:'dash-3'
        },{
        gameName:'test' ,
        gamedescription:'测试字体长度测试字体长度测试字体长度测试字体长度测试字体长度测试字体长度',
        startTime:'2017/3/4 14：30',
        overTime:'2017/3/4 16：30',
        id:'dash-4'
        }
       ];
       for (var i = 0; i < data.length; i++) {
       	   $('#rdashboard').append(`
		     <div  class="row dashboard">
		    	<div class="col-md-7">
					<p>比赛名称：<span>${data[i].gameName}</span></p>
					<p>比赛描述：<span>${data[i].gamedescription}</span></p>
				</div>
				<div class="col-md-3">
					<p>开始时间：<span>${data[i].startTime}</span></p>
					<p>结束时间：<span>${data[i].overTime}</span></p>
				</div>
				<div class="col-md-2 details">
					<a href="#" id=${data[i].id}>查看详情</a>
				</div>
		  	</div>	
		  	`)
		       
       }

       //点击详情进入页面
       $('.details a').click(function(){
            $("#content").load('viewdetails.html');
            $('.pageheader h2 span').text('比赛详情');
       });
});