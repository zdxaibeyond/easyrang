$(function(){
    //table 表格
     var table = $("#IT-example").dataTable({
     	"lengthChange": false,
     	ajax: {
        //指定数据源
        url: "testdata/ITdata.txt"  //json 数据格式传送
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
          	 "data": "name"
          }, {
          	 "data": "node"
          }, {
          	 "data": "run"
          }, {
          	 "data": "mirrorName"
          }, {
          	 "data": "vnc"
          } , {
          	 "data": "id"
          }
          
       ],
       "columnDefs": [{
           'orderable' : false,
	       'targets' :[0,4,5] 
	    },{
	        "render": function(data, type, row, meta) {
	            return '<a href='+row.vnc+' target="_blank">创建</a>';
	        },
	        "targets": 4
	    },{
	        "render": function(data, type, row, meta) {
	            return '<a href="#" id='+row.id+'>管理</a> '+' <a href="#" id='+row.id+'>启动</a>'+' <a href="#" id='+row.id+'>关闭</a>'+' <a href="#" id='+row.id+'>销毁</a>';
	        },
	        "targets": 5
	    }]
     });



});