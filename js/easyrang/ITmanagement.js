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
          	 "data": "describe"
          }, {
          	 "data": "CloudHosting"
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
	            return (row.node == 'node0')? '<a href="#" id='+row.id+'>创建</a>':'<a href="#" id='+row.id+'>创建</a>'+'<a href="#" id='+row.id+'>恢复</a>';
	        },
	        "targets": 4
	    },{
	        "render": function(data, type, row, meta) {
	            return '<a href="#" id='+row.id+'>管理</a> '+' <a href="#" id='+row.id+'>启动</a>'+' <a href="#" id='+row.id+'>关闭</a>'+' <a href="#" id='+row.id+' class="text-danger" >销毁</a>';
	        },
	        "targets": 5
	    },{
            "width":"14%",
	        "targets": 4
        },{
            "width":"30%",
	        "targets": 3
        },{
            "width":"15%",
	        "targets": 2
        },{
            "width":"10%",
	        "targets": 1
        },{
            "width":"10%",
	        "targets": 0
        }]
     });

          // id  , 数据URL地址
dataSwitch("#ctf","testdata/ITdata.txt"); //CTF数据
dataSwitch("#range","testdata/ITdata1.txt"); //靶场数据
dataSwitch("#against","testdata/ITdata2.txt"); //红蓝对抗数据
newScenario()// IT场景操作

//ctf 靶场 红蓝对抗数据切换
function dataSwitch(id,data){
     $(id).click(function() {
        var url = table.api().ajax.url(data);
        url.load();
    });
}
//IT场景操作
function newScenario(){
   //打开新建场景
   $("#createScene").click(function(){
       $('input').val(''); //清除input里面的内容
       $("#myModal").modal("show");
       $("#teamNumbers").hide();
       $("select[name=Node]").val("CTF");
   })
 
  //监听红蓝对抗选择
   $("select[name=Node]").change(function(){
         var selectValue= $(this).val()
        if(selectValue == "against"){
            $("#teamNumbers").show();
        }else{
            $("#teamNumbers").hide();
        }
   });
   //保存新建场景
   $("#osScenario").click(function(){
       var scenario=$("select[name=Node]").val();
       var name=$("#inputPassword3").val();
       var describe=$("#inputPassword4").val();
       var teamNumber=$("#inputPassword31").val(); //红蓝对抗队伍数量
       if(!name){
           layer.msg('场景名称不能为空')
       }else if($("#teamNumbers").css('display') == 'none'){
           alert(`
            场景：${scenario},名称：${name},描述：${describe};
           `);
           $("#myModal").modal("hide");
       }else if( teamNumber < 2 ||  teamNumber > 8 ){
          layer.msg("请填写正确队伍数量!")
       }else{
            alert(`
            场景：${scenario},名称：${name},描述：${describe}队伍数量：${teamNumber};
           `);
           $("#myModal").modal("hide");
       }
   })

   //创建场景快照
    var $ITScenario=$("#IT-example");
     $ITScenario.on("click","tbody>tr td:nth-child(5) a:nth-child(1)",function(){
         var _self=$(this).attr("id");
         layer.confirm('创建场景当前状态快照，将覆盖原有快照数据，是否继续？', {
            btn: ['确定','取消'] //按钮
            }, function(){
            layer.msg('创建成功! ID:'+_self, {icon: 1});
            });
     })
     //恢复场景快照
      $ITScenario.on("click","tbody>tr td:nth-child(5) a:nth-child(2)",function(){
         var _self=$(this).attr("id");
         layer.confirm('把场景状态恢复到上一次快照时的状态？', {
            btn: ['确定','取消'] //按钮
            }, function(){
            layer.msg('恢复成功! ID:'+_self, {icon: 1});
            });
     })

      //启动
      $ITScenario.on("click","tbody>tr td:nth-child(7) a:nth-child(2)",function(){
         var _self=$(this).attr("id");
         layer.confirm('开启场景中的所有设备？', {
            btn: ['确定','取消'] //按钮
            }, function(){
            layer.msg('启动成功! ID:'+_self, {icon: 1});
            });
     })

       //关闭
      $ITScenario.on("click","tbody>tr td:nth-child(7) a:nth-child(3)",function(){
         var _self=$(this).attr("id");
         layer.confirm('关闭场景中的所有设备？', {
            btn: ['确定','取消'] //按钮
            }, function(){
            layer.msg('关闭成功! ID:'+_self, {icon: 1});
            });
     })

      //销毁
      $ITScenario.on("click","tbody>tr td:nth-child(7) a:nth-child(4)",function(){
         var _self=$(this).attr("id");
         layer.confirm('销毁场景中的所有设备？', {
            btn: ['确定','取消'] //按钮
            }, function(){
            layer.msg('销毁成功! ID:'+_self, {icon: 1});
            });
     })

}

});