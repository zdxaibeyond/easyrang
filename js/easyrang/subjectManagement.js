$(function(){
    //table 表格
     var table = $("#subject-example").dataTable({
     	"lengthChange": false,
     	ajax: {
        //指定数据源
        url: "testdata/subjectdata.txt"  //json 数据格式传送
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
          	 "data": "number"
          }, {
          	 "data": "name"
          }, {
          	 "data": "scenario"
          }, {
          	 "data": "classification"
          }, {
          	 "data": "team"
          }, {
          	 "data": "score"
          }, {
          	 "data": "attachment"
          }, {
          	 "data": "id"
          }
          
       ],
       "columnDefs": [{
           'orderable' : false,
	       'targets' :[0,1,2,4,6,7] 
	    },{
	        "render": function(data, type, row, meta) {
	            return ' <a href="#" id='+row.id+'>管理</a>'+' <a href="#" id='+row.id+' class="text-danger" >删除</a>';
	        },
	        "targets": 7
	    },{
            "width":"15%",
	        "targets": 6
        },{
            "width":"10%",
	        "targets": 5
        },{
            "width":"15%",
	        "targets": 4
        },{
            "width":"10%",
	        "targets": 3
        },{
            "width":"15%",
	        "targets": 2
        },{
            "width":"15%",
	        "targets": 1
        },{
            "width":"10%",
	        "targets": 0
        }]
     });

newsubject(); //新增题目
//上传脚本
function newsubject(){
   //点击进入新增题目
   $("#addSubject").click(function(){
           $("#content").load('addSubject.html');
           $('.pageheader h2 span').text("新增题目");
   })
  
   //管理题目
    var $team=$("#subject-example");
     $team.on("click","tbody>tr td:nth-child(8) a:nth-child(1)",function(){
           $("#content").load('addSubject.html');
           $('.pageheader h2 span').text("题目管理");
      
     })

   //删除
    $team.on("click","tbody>tr td:nth-child(8) a:nth-child(2)",function(){
         var _self=$(this).attr("id");
         layer.confirm('确定要删除题目？', {
            btn: ['确定','取消'] //按钮
            }, function(){
            layer.msg('删除成功! ID:'+_self, {icon: 1});
            });
     })

}

});