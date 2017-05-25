$(function(){
    //table 表格
     var table = $("#user-example").dataTable({
     	"lengthChange": false,
     	ajax: {
        //指定数据源
        url: "testdata/userdata.txt"  //json 数据格式传送
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
          	 "data": "number"
          }, {
          	 "data": "role"
          }, {
          	 "data": "loginUser"
          }, {
          	 "data": "e-mail"
          }, {
          	 "data": "phone"
          }
       ],
       "columnDefs": [{
           'orderable' : false,
	       'targets' :[0,6] 
	    }, 
	    {
	        "render": function(data, type, row, meta) {
	            return '<a href="#" id='+row.id+'>更新/详情</a> '+' <a href="#" id='+row.id+' class="text-danger" >删除</a>';
	        },
	        "targets": 6
	    }]
     });

userManagement(); //用户管理 更新 删除
NewUser();//新建用户 上传用户
// 用户管理 更新 删除
 function userManagement(){
     var data=['55',"xiaohua","123123456",'56','这是一位优秀的同学',"admin",'2017/8/9 10:11:30','王五','2017/8/30 10:11:30','大队长']
        //  id:'55',
        //  loginname:"xiaohua",
        //  loginpass:"123123456",
        //  usernum:'56',
        //  information:'这是一位优秀的同学',
        //  founder:"admin",
        //  founderstart:'2017/8/9 10:11:30',
        //  lastfounder:'王五',
        //  lasttime:'2017/8/30 10:11:30',
        //  role:'学生'
     
    var role=[
        {user:"学生"},
        {user:"教师"},
        {user:"管理员"},
        {user:"大队长"}
    ]
     //更新/详情 打开数据写入
     var $user=$("#user-example");
     $user.on("click","tbody>tr td:nth-child(7) a:nth-child(1)",function(){
         var _self=$(this);
         var $input=$("#updatedDetails input");
          $("#updatedDetails").modal("show");

         $input.map(function(index){
             $(this).val(data[index]);
         })
         
         for(let x of role){
             $("select[name=userrole]").append(`<option value=${x.user}>${x.user}</option>`)
         }

         $("select[name=userrole]").val(data[9]);
         
     })

     // 更新详情 数据保存
     $("#userModify").click(function(){
          var $input=$("#updatedDetails input");
          var updatesave=[];
          $input.map(function(){
              updatesave.push($(this).val()); 
          })
          updatesave.push($("select[name=userrole]").val());
          alert(updatesave);
          $("#updatedDetails").modal("hide");
     })
  
     //删除
      $user.on("click","tbody>tr td:nth-child(7) a:nth-child(2)",function(){
         var _self=$(this);
        layer.confirm('是否删除用户？', {
            btn: ['是的','取消'] //按钮
            }, function(){
            layer.msg("用户ID："+_self.attr("id"));
            });
     })
  }

  //新建用户 上传用户
  function NewUser(){
      var data = [
          {role:"学生"},
          {role:"教师"},
          {role:"管理员"},
          {role:"超级管理员"}
      ]
     //点击弹出新建用户模态框 
      $('#NewUser').click(function(){
           $("#myModal").modal("show");
           $("#myModalLabel").text("新建用户");
           for(var item of data){
               $("select[name=role]").append(`
                <option value=${item.role}>${item.role}</option>
            `)
           }
          
      });
      //保存新建用户
      $("#NewUserSave").click(function(){
           var loginName=$('#inputEmail3').val();
           var pass=$('#inputPassword3').val();
           var eMail=$('#inputPassword4').val();
           var phone=$('#inputPassword5').val();
           var username=$('#inputPassword6').val();
           var userNUM=$('#inputPassword7').val();
           var noteInformation=$('#inputPassword8').val();
           var role=$('select[name=role]').val();
           if(!loginName){
               layer.msg("登陆名称不能为空！")
           }else if(!pass){
               layer.msg("登陆密码不能为空！")
           }else if(!username){
               layer.msg("用户姓名不能为空！")
           }else if(!userNUM){
               layer.msg("用户编号不能为空！")
           }else if(noteInformation.length > 100){
               layer.msg("备注信息不能超过100个字符.")
           }else{
               alert(`
                  登陆名称：${loginName},登陆密码：${pass},电子邮件:${eMail},联系电话:${phone},用户姓名:${username},用户编号:${userNUM}，备注信息:${noteInformation},选择角色：${role}
               `)
                $("#myModal").modal("hide");
           }
      });

      //上传用户
      $("#UploadUser").click(function(){
          $("#upload-user").modal("show");
          // 上传插件叫 fileinput.js
           $('#file-es').fileinput({
                language: 'zh',
                uploadUrl: '#',//上传地址
                allowedFileExtensions: ['xls', 'xlsx']
            });
      })

      //保存上传用户
    //   $("#upUserSave").click(function(){
    //        $("#upload-user").modal("hide");
    //        layer.msg("保存成功");
    //   })

  }
  
  $("#myModal").on('hide.bs.modal',function(event){
        $('input ').val(''); //清除input 内容
        $('select').empty(); //清空select内容
    })

  $("#updatedDetails").on('hide.bs.modal',function(event){
        $('input ').val(''); //清除input 内容
        $('select').empty(); //清空select内容
    }) 

   //监听上传模态框关闭后
      $("#upload-user").on('hide.bs.modal',function(event){
        $(".fileinput-remove-button").click();
    }) 

});