$(function(){
       var data={
         name:"ctf",
         ms:'测试比赛描述长度！测试比赛描述长度！测试比赛描述长度！测试比赛描述长度！测试比赛描述长度！测试比赛描述长度！测试比赛描述长度！',
         starttime:'2017/3/21 12：21',
         overtime:'2017/3/21 16：21'
       }
      //比赛队伍头部数据
      $("#team").append(`
           <div class="col-md-6">
              <p>比赛名称：<span>${data.name}</span></p>
              <p>比赛描述：<span>${data.ms}</span></p>
            </div>
            <div class="col-md-6" align="right">
              <p>开始时间：<span>${data.starttime}</span></p>
              <p>结束时间：<span>${data.overtime}</span></p>
            </div>
        `)

     //比赛详情页面table
     $("#example").dataTable({
     	"lengthChange": false,
     	ajax: {
        //指定数据源
        url: "testdata/viewdetailsdata.txt"  //json 数据格式传送
       },
        language: {
        "sProcessing": "处理中...",
        "sLengthMenu": "显示 _MENU_ 项结果",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
        "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix": "",
        "sSearch": "搜索:",
        "sUrl": "",
        "sEmptyTable": "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
            "sFirst": "首页",
            "sPrevious": "上页",
            "sNext": "下页",
            "sLast": "末页"
        },
        "oAria": {
            "sSortAscending": ": 以升序排列此列",
            "sSortDescending": ": 以降序排列此列"
        }
       },
       columns:[
          {
          	 "data": "teamname"
          }, {
          	 "data": "score"
          }, {
          	 "data": "players"
          }, {
          	 "data": "scoreDetails"
          }, {
          	 "data": "playersDetails"
          }
       ],
        "columnDefs": [{
	        // "visible": false,
	        //"targets": 0
	    },
	    {
	        "render": function(data, type, row, meta) {
	            //渲染 把数据源中的标题和url组成超链接
	            return '<a href="#" id='+row.id+'>' + row.scoreDetails + '</a>';
	        },
	        //指定是第三列
	        "targets": 3
	    },{
	        "render": function(data, type, row, meta) {
	            //渲染 把数据源中的标题和url组成超链接
	            return '<a href="#" id='+row.id+'>' + row.scoreDetails + '</a>';
	        },
	        //指定是第三列
	        "targets": 4
	    }]
     });
    
    //答案得分详情
    $(document).on('click','#example >tbody>tr>td:nth-child(4)>a',function(){
    	var $id=$(this).attr('id');
    	if ($id.substring(0,4) =='test') {
    		$("#content").load('scoringDetails.html');
        $('.pageheader h2 span').text('答案得分详情');
    	}
    });

    //队员个人得分
    $(document).on('click','#example >tbody>tr>td:nth-child(5)>a',function(){
    	var $id=$(this).attr('id');
    	if ($id.substring(0,4) =='test') {
        $("#content").load('playersScoring.html');
         $('.pageheader h2 span').text('队员个人得分');
    	}
    });
   
});