$(function(){
    //table 表格
     var table = $("#ctf-example").dataTable({
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
          },
          {
          	 "data": "describe"
          }, {
          	 "data": "snapshotTime"
          }, {
          	 "data": "snapshotTime"
          }, {
          	 "data": "mirrorName"
          }, {
          	 "data": "id"
          }
          
       ],
       "columnDefs": [{
           'orderable' : false,
	       'targets' :[0,5,6,7] 
	    },{
	        "render": function(data, type, row, meta) {
	            return  '<a href="#" id='+row.id+'>新增/修改</a> ';
	        },
	        "targets": 5
	    },{
	        "render": function(data, type, row, meta) {
	            return  '<a href="#" id='+row.id+'>管理</a> ';
	        },
	        "targets": 6
	    },{
	        "render": function(data, type, row, meta) {
	            return  '<a href="#" id='+row.id+'>打开</a> ';
	        },
	        "targets": 7
	    },{
	        "render": function(data, type, row, meta) {
	            return  '<a href="#" id='+row.id+'>管理</a> '+' <a href="#" id='+row.id+' class="text-danger" >删除</a>';
	        },
            "width":"10%",
	        "targets": 8
	    },{
            "width":"20%",
	        "targets": 1
        }]
     });

     newCTF() // 新增红蓝对抗比赛 更新 删除 题目 分数 管理
  
   // 新建红蓝对抗 更新红蓝对抗 删除
   function newCTF(){
       var SubjectManagement=[];
       //点击弹出新建CTF模态框
       $("#NewCTF").click(function(){
           $("#myModal").modal("show");
           $("#myModalLabel").text("新建红蓝对抗比赛");
       });
       
     
        var data=[
                    {id:'team-1',text:"战神队"},
                    {id:'team-2',text:"忐忑队"},
                    {id:'team-3',text:"留恋队"},
                    {id:'team-4',text:"股神队"},
                    {id:'team-5',text:"大神队"},
                    {id:'team-6',text:"菜鸟队"},
                    {id:'team-7',text:"白领队"},
                    {id:'team-8',text:"名字超长的队伍"}
                ];
            var data1=[
                    {id:'scenario-1',text:"评委1"},
                    {id:'scenario-2',text:"评委2"},
                    {id:'scenario-3',text:"评委3"},
                    {id:'scenario-4',text:"评委4"},
                    {id:'scenario-5',text:"评委5"},
                    {id:'scenario-6',text:"评委6"},
                    {id:'scenario-7',text:"评委7"},
                    {id:'scenario-8',text:"评委8"}
                ];

        //select2插件初始化
         $(".select2").select2({
            width: '100%'
        });
        //队伍数据加载
        for(var item of data){
            $("#teamSelect").append(`
            <option value=${item.id}>${item.text}</option>
            `)
        }
       
        //评委数据加载
         for(var x of data1){
            $("#judges").append(`
            <option value=${x.id}>${x.text}</option>
            `)
        }
        
       //时间选择
       var start = {
            elem: '#start',
            format: 'YYYY/MM/DD hh:mm:ss',
            min: laydate.now(), //设定最小日期为当前日期
            max: '2099-06-16 23:59:59', //最大日期
            istime: true,
            istoday: false,
            choose: function(datas){
                end.min = datas; //开始日选好后，重置结束日的最小日期
                end.start = datas //将结束日的初始值设定为开始日
            }
            };
            var end = {
            elem: '#end',
            format: 'YYYY/MM/DD hh:mm:ss',
            min: laydate.now(),
            max: '2099-06-16 23:59:59',
            istime: true,
            istoday: false,
            choose: function(datas){
                start.max = datas; //结束日选好后，重置开始日的最大日期
            }
            };
            laydate(start);
            laydate(end);

     //点击保存红蓝对抗比赛
     $("#newCTFSave").click(function(){
         var CTFName=$("#inputEmail3").val();
         var classification=$("#inputEmail9").val();
         var startTime=$("#start").text();
         var CTFteam=$("#teamSelect").val(); //队伍
         var CTFjudges=$("#judges").val(); //评委
         var endTime=$("#end").text();
         var describe=$("#inputPassword8").val();
         var updateID=$("#newCTFSave").attr("value");//如果是空表示新建比赛 如果有ID表示更改比赛
         if(!CTFName){
             layer.msg("红蓝对抗名称不能为空！")
         }else if(!startTime){
             layer.msg("比赛开始时间不能为空！")
         }else if(!endTime){
             layer.msg("比赛结束时间不能为空！")
         }else if(describe.length >=100 ){
             layer.msg("描述内容不能超过100个字！")
         }else{
             alert(CTFName+classification+startTime+endTime+describe+" -队伍:"+CTFteam+"-评委："+CTFjudges+" 更新ID："+updateID);
             $("#myModal").modal("hide");
         }
     })

     var $CTF=$("#ctf-example");

     //红蓝对抗比赛 管理
     $CTF.on("click","tbody>tr td:nth-child(9) a:nth-child(1)",function(){
           var _self=$(this);
           var data={
               cffName:"这个是红蓝对抗比赛",
               classification:"小组赛",
               startTime:"2017/05/17 00:00:00",
               endTime:"2017/05/29 00:00:00",
               describe:"CTF比赛描述"
           }

           $("#myModal").modal("show");
           $("#myModalLabel").text("更改红蓝对抗比赛");
           $("#newCTFSave").val(_self.attr('id'));
           alert("比赛ID："+_self.attr('id'))
        
          $("#inputEmail3").val(data.cffName);
          $("#inputEmail9").val(data.classification);
          $("#start").text(data.startTime);
          $("#end").text(data.endTime);
          $("#inputPassword8").val(data.describe);

          $("#teamSelect").select2('val',['team-8','team-6']); //加载已选择队伍
          $("#judges").select2('val',['scenario-1','scenario-2','scenario-3']); //加载已选择的评委

     })
      
     //红蓝对抗评分管理
     $CTF.on("click","tbody>tr td:nth-child(7) a",function(){
        var _self=$(this); 
        alert(_self.attr('id'));
           $("#content").load('againstGradingManagement.html');
           $('.pageheader h2 span').text("红蓝对抗评分管理");
        })

      //红蓝对抗比赛 删除
     $CTF.on("click","tbody>tr td:nth-child(9) a:nth-child(2)",function(){
           var _self=$(this);
           layer.confirm('是否要删除比赛？', {
             btn: ['是的','取消'] //按钮
             }, function(){
             layer.msg("主机ID："+_self.attr("id"));
            });
     })

       //红蓝对抗比赛 AI
        $CTF.on("click","tbody>tr td:nth-child(8) a",function(){
            var _self=$(this);
            alert(_self.attr("id"));
           $("#content").load('timeline.html');
           $('.pageheader h2 span').text(_self.parents("tr").children("td:first").text());
        })

      //红蓝对抗比赛 题目管理
     $CTF.on("click","tbody>tr td:nth-child(6) a:nth-child(1)",function(){
           $("#CTFSubjectManagement").modal("show");
           var i=1;
             //题目管理 table 表格
            var tableSubject = $("#subject-example").dataTable({
                "lengthChange": false,
                "destroy": true, //重新加载数据
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
                    "data": "port"
                }
            ],
            "columnDefs": [{
                'orderable' : false
                }, {
                    "render": function(data, type, row, meta) {
                        return '<p id='+row.id+'>'+(i++)+'</p>';
                    },
                    "targets": 0
                }],
             "createdRow":function(row,data,dataIndex){  //tr 行操作
                  if(data['node'] == 'node0'){
                      $(row).addClass( 'selected' );
                  }
             }   
            });
       
      
       
       var table = $('#subject-example').DataTable();
        //点击单选
        $('#subject-example tbody').on( 'click', 'tr', function () {
            $(this).toggleClass('selected');
        } );
       //全选
       $("#allSubject").click(function(){
           var $trSelectd=$("#subject-example tbody tr");
           $trSelectd.each(function(){
                   $(this).addClass('selected');
           })
       })
        //取消全选
       $("#dallSubject").click(function(){
           var $trSelectd=$("#subject-example tbody tr");
           $trSelectd.each(function(){
                   $(this).removeClass('selected');
           })
       })        
        //点击保存添加题目
        $('#CTFSubjectManagementSave').one("click", function () {
            SubjectManagement=[];
            for(let i=0;i<table.rows('.selected').data().length;i++){
                SubjectManagement.push(table.rows('.selected').data()[i])
            }
          console.log(SubjectManagement);
         $("#CTFSubjectManagement").modal("hide");  
        } );
      
       
     });


      


   }  

 
 
      //监听模态框关闭 
     $("#myModal").on('hide.bs.modal',function(event){
           $("input").val('') //input 清空
           $("#start").html('');
           $("#end").html('');
           $(".select2-search-choice-close").trigger("click");
           $("#newCTFSave").val('');
     })



});