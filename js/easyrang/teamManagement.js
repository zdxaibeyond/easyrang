$(function(){
    //table 表格
     var table = $("#team-example").dataTable({
     	"lengthChange": false,
     	ajax: {
        //指定数据源
        url: "testdata/teamdata.txt"  //json 数据格式传送
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
          	 "data": "ranking"
          }, {
          	 "data": "teamname"
          }, {
          	 "data": "permissions"
          }, {
          	 "data": "teamMembers"
          }, {
          	 "data": "teamId"
          }
          
       ],
       "columnDefs": [{
           'orderable' : false,
	       'targets' :[0,4] 
	    },{
	        "render": function(data, type, row, meta) {
	            return ' <a href="#" id='+row.teamId+'>更新</a>'+' <a href="#" id='+row.teamId+' class="text-danger" >删除</a>';
	        },
	        "targets": 4
	    },{
            "width":"50%",
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

newTeam(); //新建队伍
//新建队伍
function newTeam(){
   //点击弹出模态框
   $("#createTeam").click(function(){
       $('input').val(''); //清除input里面的内容
       $("#myModal").modal("show");
       $("#myModalLabel").text("新建队伍");

        //头像上传初始化
        $('#file-es').fileinput({
            language:"zh",
            uploadUrl: '#',//上传地址
            allowedFileExtensions: ['jpg', 'png','gif'],
            msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！"
        });
   })
  
  //加载队员
  $("#addPlayers").click(function(){
       $(".addPlayers").stop(true).slideToggle("slow");
       for(let i=0;i<40;i++){
           $(".addPlayers ul").append(`
                <li>
                    <div class="ckbox ckbox-success">
                        <input type="checkbox" id="player${i}" value="张三${i}">
                        <label for="player${i}">张三${i}</label>
                    </div>
                </li>
       `)
       }
  }); 


  //添加队员
  $("#addToTeam").click(function(){
       var $players=$(".addPlayers ul li .ckbox-success input");
       $players.each(function(){
           if(this.checked == true){
               $(".user-palyer").append(`
                   <p>
                     <span >${$(this).val()}</span>
                     <span class="badge">X</span>
                    </p>
               `);
           }
       }) 
  });
 
//关闭添加队员选项
   $('#shutDownToTeam').click(function(){
       $(".addPlayers").stop(true).slideUp("slow");
   })


 //删除队员
$(document).on('click','.badge',function(){
    $(this).parent().remove();
     console.log($(this));
})

   //保存队伍
   $("#teamSave").click(function(){
       var teamName=$("#team").val();
       var teamDescribe=$("#team1").val();
       var addPlayers=$("#add-player p span:nth-child(1)").text();

       if(!teamName){
           layer.msg('队伍名称不能为空')
       }else{
           alert(`
            队伍名称：${teamName},描述：${teamDescribe},队员：${addPlayers};
           `);
           $("#myModal").modal("hide");
       }
   })

   //更新
    var $team=$("#team-example");
     $team.on("click","tbody>tr td:nth-child(5) a:nth-child(1)",function(){
         var data={
             teamName:"宝宝队",
             teamDescribe:"这是一个全是宝宝的战队",
             teamPlayers:['张三','王五','赵四','二麻子','二傻子','大宝','二宝'],
             teamHead:"url"
         }
         var _self=$(this).attr("id");
         $('input').val(''); //清除input里面的内容
         $("#myModal").modal("show");
         $("#myModalLabel").text("队伍管理");
         $("#team").val(data.teamName);
         $("#team1").val(data.teamDescribe);
         $.map(data.teamPlayers,function(n){
             $("#add-player").append(`
                    <p>
                        <span>${n}</span>
                        <span class="badge">X</span>
                    </p>
                `)
         })
     })

       //删除
      $team.on("click","tbody>tr td:nth-child(5) a:nth-child(2)",function(){
         var _self=$(this).attr("id");
         layer.confirm('确定要删除队伍？', {
            btn: ['确定','取消'] //按钮
            }, function(){
            layer.msg('关闭成功! ID:'+_self, {icon: 1});
            });
     })

}

   //监听模态框关闭清除里面内容
     $("#myModal").on('hide.bs.modal',function(event){
         $('input ').val(''); //清除input 内容
         $('select').empty(); //清空select内容
         $("#add-player p").remove();
         $(".addPlayers ul li").remove();
         $(".addPlayers").hide();
     })

});