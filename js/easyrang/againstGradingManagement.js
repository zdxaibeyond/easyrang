$(function(){
     var datatableLanguage={
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
       };
    //队伍table 表格
     var table1 = $("#CTFteam-example").dataTable({
     	"lengthChange": false,
     	ajax: {
        //指定数据源
        url: "testdata/ITdata.txt"  //json 数据格式传送
       },
        language:datatableLanguage,
       columns:[
          {
          	 "data": "name"
          }, {
          	 "data": "port"
          }, {
          	 "data": "id"
          }
          
       ],
       "columnDefs": [{
           'orderable' : false,
	       'targets' :[0,2] 
	    },{
	        "render": function(data, type, row, meta) {
	            return '<a href="#" id='+row.id+'>详情</a> '+' <a href="#" id='+row.id+' >管理</a>';
	        },
	        "targets": 2
	    }]
     });
   
   //队伍加分table 表格
     var table2 = $("#CTFteamoperation-example").dataTable({
     	"lengthChange": false,
     	ajax: {
        //指定数据源
        url: "testdata/ITdata.txt"  //json 数据格式传送
       },
        language:datatableLanguage,
       columns:[
          {
          	 "data": "name"
          }, {
          	 "data": "port"
          }, {
          	 "data": "describe"
          }, {
          	 "data": "snapshotTime"
          }, {
          	 "data": "run"
          }
          
       ],
       "columnDefs": [{
           'orderable' : false,
	       'targets' :[0,2] 
	    },{
            "width":"15%",
            "targets":0
        },{
            "width":"10%",
            "targets":1
        },{
            "width":"30%",
            "targets":2
        },{
            "width":"15%",
            "targets":4
        }]
     });



teamCTF();//队伍详情 分数管理

  //队伍详情 分数管理
  function teamCTF(){
     //队伍加分管理
     var $cloud=$("#CTFteam-example");
     $cloud.on("click","tbody>tr td:nth-child(3) a:nth-child(2)",function(){
         var _self=$(this);
         var teamName=_self.parents('tr').children("td:first").text();
         console.log(teamName);
         $("#myModal").modal('show');
         $("#inputPassword3").val(teamName);   
     })

     // 保存队伍添加的分数
     $("#teamScore").click(function(){
         var teamName= $("#inputPassword3").val();
         var teamScore= $("#inputPassword4").val();
         var reason= $("#inputPassword6").val();
         if(!teamScore){
             layer.msg("请填写分数")
         }else{
             alert(teamName+teamScore+reason);
             $("#myModal").modal('hide');
         }
     });
       
     //返回红蓝对抗
     $("#returnCTF").click(function(){
           $("#content").load('againstManagement.html');
           $('.pageheader h2 span').text("CTF比赛管理");
     });

    //队伍得分详情   
     $cloud.on("click","tbody>tr td:nth-child(3) a:nth-child(1)",function(){
        var _self=$(this);
        $("#myModa2").modal('show');

       var table3 = $("#teamScoringDetails-example").dataTable({
     	"lengthChange": false,
        "destroy": true, //重新加载数据
     	ajax: {
        //指定数据源
        url: "testdata/ITdata.txt"  //json 数据格式传送
       },
        language:datatableLanguage,
       columns:[
          {
          	 "data": "describe"
          }, {
          	 "data": "port"
          }, {
          	 "data": "snapshotTime"
          },{
          	 "data": "run"
          }
          
       ],
      "columnDefs": [{
           'orderable' : false,
	       'targets' :[0,2] 
	    },{
            "width":"230px",
            "targets":0
        },{
            "width":"230px",
            "targets":1
        },{
            "width":"230px",
            "targets":2
        }]
     });
     })

  }
    

  //监听模态框关闭清除里面内容
     $("#myModal").on('hide.bs.modal',function(event){
         $('input ').val(''); //清除input 内容
        $('select').empty(); //清空select内容
     });

    
});