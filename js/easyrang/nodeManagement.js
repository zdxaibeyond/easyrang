$(function(){
    //table 表格
     var table = $("#node-example").dataTable({
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
          	 "data": "ip"
          }, {
          	 "data": "port"
          }, {
          	 "data": "mirrorName"
          }, {
          	 "data": "id"
          }
          
       ],
       "columnDefs": [{
           'orderable' : false,
	       'targets' :[0,4,5] 
	    }, {
	        "render": function(data, type, row, meta) {
	            return '<input type="checkbox" name="value"  class="checkchild"/ id='+ row.id+'>';
	        },
	        "targets": 0
	    },{
	        "render": function(data, type, row, meta) {
	            return  '<a href="#" id='+row.id+'>更新</a> '+' <a href="#" id='+row.id+' class="text-danger" >删除</a>';
	        },
	        "targets": 5
	    }]
     });

     nodeList() // 新建云节点 更新云节点 删除 更新云节点
     checkAll() //全选
     nodeNewDelete() //云节点 更新 删除

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
   // 新建云节点 更新云节点 删除
   function nodeList(){
       //点击弹出新建云节点模态框
       $("#NewNode").click(function(){
           $("#myModal").modal("show");
           $("input").val('') //input 清空
       });

     //点击保存新建云节点
     $("#newNodeSave").click(function(){
         var nodeName=$("#inputEmail3").val();
         var IP=$("#inputPassword3").val();
         var port=$("#inputPassword4").val();
         var describe=$("#inputPassword8").val();
         if(!nodeName){
             layer.msg("名称不能为空！")
         }else if(!IP){
             layer.msg("IP地址不能为空！")
         }else if(!port){
             layer.msg("端口不能为空！")
         }else{
             alert(nodeName+IP+port+describe);
             $("#myModal").modal("hide");
         }
     })


     //批量删除云节点
     $("#BatchDelete").click(function(){
         var $input=$("input[type=checkbox]");
         var deleteNode=[];
         $input.each(function(i){
             if($(this).is(":checked")){
                 deleteNode.push([
                     "id",$(this).attr('id')
                 ])
             }
         })
        alert(deleteNode); 
     });
   }  

 //云节点 更新 删除
 function nodeNewDelete(){
     var $node=$("#node-example");
     var $nodeName=$("#uploadNmae");
     var $nodeDescribe=$("#nodeDescribe");
     //点击更新
     $node.on("click","tbody>tr td:nth-child(6) a:nth-child(1)",function(){
         $("#upload").modal("show");
         $("input").val('');

         var data={
             nodeName:"node1节点名称",
             nodeDescribe:"这是云节点描述"
         }
       $nodeName.val(data.nodeName);
       $nodeDescribe.val(data.nodeDescribe);
     })

     //保存云节点信息
     $("#uploadSave").click(function(){
         if(!$nodeName.val()){
             layer.msg("节点名称不能为空！")
         }else{
           alert("云节点名称："+$nodeName.val()+"云节点秒速："+$nodeDescribe.val());
           $("#upload").modal("hide");
         }
     })

        //点击删除
     $node.on("click","tbody>tr td:nth-child(6) a:nth-child(2)",function(){
          var _self=$(this);
           layer.confirm('是否删除云节点？', {
            btn: ['是的','取消'] //按钮
            }, function(){
            layer.msg("主机ID："+_self.attr("id"));
            });
     })
 }
   
});