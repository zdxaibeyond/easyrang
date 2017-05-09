$(function(){
    //table 表格
     var table = $("#cloud-example").dataTable({
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
          	 "data": "id"
          },
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
          }, {
          	 "data": "snapshotTime"
          }, {
          	 "data": "id"
          }, {
          	 "data": "id"
          }
          
       ],
       "columnDefs": [{
           'orderable' : false,
	       'targets' :[0,5,7,8] 
	    }, {
	        "render": function(data, type, row, meta) {
	            return '<input type="checkbox" name="value"  class="checkchild"/ id='+ row.id+'>';
	        },
	        "targets": 0
	    },{
	        "render": function(data, type, row, meta) {
	            return '<a href='+row.vnc+' target="_blank">打开</a>';
	        },
	        "targets": 5
	    },
	    {
	        "render": function(data, type, row, meta) {
	            return '<a href="#" id='+row.id+'>创建</a> '+' <a href="#" id='+row.id+'>恢复</a>';
	        },
	        "targets": 7
	    },{
	        "render": function(data, type, row, meta) {
	            return '<a href="#" id='+row.id+'>重命名</a> '+' <a href="#" id='+row.id+'>销毁</a>';
	        },
	        "targets": 8
	    }]
     });


checkAll(); //全选
startOS(); //开机
osOperation();//快照 主机操作
newOS()//创建云主机
   //全选
  function checkAll(){
     var $all=$("#checkall");
        $all.on("click", function () {  
            if($all.is(':checked') == true){
            $("input[name='value']").each( function() {

            if(false == $(this).is(':checked')){
                $(this).prop("checked", true);
            }

            });
                    } 
            if($all.is(':checked') == false){
            $("input[name='value']").each( function() {

            if(true == $(this).is(':checked')){
                $(this).prop("checked", false);
            } 
            });
            }
       });
  }

  //开机
  function startOS(){
       $("#start").click(function(){
            $("input[name='value']").each( function() {
                 if($(this).is(':checked')){
                     alert("id是:"+$(this).attr("id")) //获取选中ID
                 }
            });
       });
  }
 
  //快照操作 主机操作
  function osOperation(){
     //创建
     var $cloud=$("#cloud-example");
     $cloud.on("click","tbody>tr td:nth-child(8) a:nth-child(1)",function(){
         var _self=$(this);
        layer.confirm('是否要创建云主机快照？', {
            btn: ['是的','取消'] //按钮
            }, function(){
            layer.msg("主机ID："+_self.attr("id"));
            });
     })
       
    //恢复   
     $cloud.on("click","tbody>tr td:nth-child(8) a:nth-child(2)",function(){
         var _self=$(this);
        layer.confirm('是否恢复云主机快照？', {
            btn: ['是的','取消'] //按钮
            }, function(){
            layer.msg("主机ID："+_self.attr("id"));
            });
     })

     //重命名
      $cloud.on("click","tbody>tr td:nth-child(9) a:nth-child(1)",function(){
          var _self=$(this);
         layer.prompt({title: '主机重命名'},function(val, index){
            layer.msg('得到了'+val+' ID的值为'+_self.attr("id"));
            layer.close(index);
            });
     })

     //销毁
      $cloud.on("click","tbody>tr td:nth-child(9) a:nth-child(2)",function(){
         var _self=$(this);
        layer.confirm('是否销毁云主机？', {
            btn: ['是的','取消'] //按钮
            }, function(){
            layer.msg("主机ID："+_self.attr("id"));
            });
     })
  }
    
   //创建云主机
 function newOS(){
      //点击弹出模态框
      $("#createOS").click(function(){
          //模态框弹出下拉框数据
          var data={
              "node":[
                  {'node':"node0",'value':'node0'},
                  {'node':"node1",'value':'node1'},
                  {'node':"node2",'value':'node2'},
                  {'node':"node3",'value':'node3'}
              ],
              "os":[
                  {'os':'CentOS 6.6 32位桌面纯净版','value':'CentOS 6.6 32'},
                  {'os':'Windows 7 SP1','value':'Windows 7 SP1'},
                  {'os':'Windows XP SP3','value':'Windows XP SP3'},
                  {'os':'Ubuntu 8.04 32位服务器版','value':'Ubuntu 8.04 32'},
                  {'os':'Debian 7.6 32位桌面纯净版','value':'Debian 7.6 32'},
                  {'os':'KALI安全测试操作系统','value':'KALI'},
                  {'os':'Windows Server 2008 R2','value':'Windows Server 2008 R2'}
              ],
              "ram":[
                  {'ram':"1",'value':'1'},
                  {'ram':"2",'value':'2'},
                  {'ram':"4",'value':'4'},
                  {'ram':"8",'value':'5'}
              ]
          }
             
          $("#myModal").modal("show");
          for(let item of data["node"]){
            $("select[name=Node]").append(` <option value=${item.value}>${item.node}</option>` )
          }

          for(let item of data["os"]){
            $("select[name=os]").append(` <option value=${item.value}>${item.os}</option>` )
          }

          for(let item of data["ram"]){
            $("select[name=ram]").append(` <option value=${item.value}>${item.ram}G</option>` )
          }
          
      })
   
      $("#osSave").click(function(){
          var nameOS=$("#inputPassword3").val();
          var describeOS=$("#inputPassword6").val();
          var node=$("select[name=Node]").val();
          var os=$("select[name=os]").val();
          var ram=$("select[name=ram]").val();
          console.log(node);
          if(!nameOS){
              layer.msg('主机名称不能为空!');
          }else{
              alert(`
              节点:${node},主机名称:${nameOS},选择操作系统:${os},内存：${ram},主机资产备注：${describeOS}
              `)
               $("#myModal").modal('hide');
                $('input ').val(''); //清除input 内容
                $('select').empty(); //清空select内容
          }


     })
     //监听模态框关闭清除里面内容
     $("#myModal").on('hide.bs.modal',function(event){
         $('input ').val(''); //清除input 内容
        $('select').empty(); //清空select内容
     })
  

 }

});