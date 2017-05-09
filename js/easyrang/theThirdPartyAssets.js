$(function(){
    //table 表格
     var table = $("#third-example").dataTable({
     	"lengthChange": false,
     	ajax: {
        //指定数据源
        url: "testdata/thirddata.txt"  //json 数据格式传送
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
          	 "data": "IP"
          }, {
          	 "data": "describe"
          }, {
          	 "data": "url"
          }, {
          	 "data": "id"
          }
       ],
       "columnDefs": [{
           'orderable' : false,
	       'targets' :[0,1,2,3,4] 
	    }, {
	        "render": function(data, type, row, meta) {
	            return '<a href='+row.url+' target="_blank">下载</a>';
	        },
	        "targets": 3
	    },
	    {
	        "render": function(data, type, row, meta) {
	            return '<a href="#" id='+row.id+'>更新</a> '+' <a href="#" id='+row.id+'>删除</a>';
	        },
	        "targets": 4
	    }]
     });

osOperation(); //第三方设备 更新 删除
NewEquipmentAssets();//新增设备资产
// 第三方设备 更新 删除
 function osOperation(){
     //更新
     var $third=$("#third-example");
     $third.on("click","tbody>tr td:nth-child(5) a:nth-child(1)",function(){
         var _self=$(this);
          $("#myModal").modal("show");
          $("#myModalLabel").text("更新设备");
     })
       
  
     //删除
      $third.on("click","tbody>tr td:nth-child(5) a:nth-child(2)",function(){
         var _self=$(this);
        layer.confirm('是否删除第三方设备？', {
            btn: ['是的','取消'] //按钮
            }, function(){
            layer.msg("主机ID："+_self.attr("id"));
            });
     })
  }

  //新增设备资产
  function NewEquipmentAssets(){
      $('#NewEquipmentAssets').click(function(){
           $("#myModal").modal("show");
           $("#myModalLabel").text("新增设备");
      });
      //保存
      $("#AssetsSave").click(function(){
           var name=$('#inputEmail3').val();
           var IP=$('#inputPassword3').val();
           var describe=$('#inputPassword4').val();
           var file=$('#inputPassword10').val();
           
           if(!name){
               layer.msg("设备名称不能为空！")
           }else if(!IP){
               layer.msg("IP地址不能为空！")
           }else{
               alert(`
                  设备名称：${name},IP地址：${IP},设备描述：${describe},上传文件：${file}
               `)
                $("#myModal").modal("hide");
           }


      });

  }
  
  $("#myModal").on('hide.bs.modal',function(event){
         $('input ').val(''); //清除input 内容
        $('select').empty(); //清空select内容
    })

});