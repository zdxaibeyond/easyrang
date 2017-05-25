$(function(){
    selectData()//select2数据加载 队伍选择 场景选择 
    ListeningScenar() //监听场景选项
    addScript()//添加脚本
    newSubject()  //保存新增题目
        //select数据加载 队伍 场景选择 
    function selectData(){
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
                    {id:'scenario-1',text:"CTF场景"},
                    {id:'scenario-2',text:"发送者场景"},
                    {id:'scenario-3',text:"版本不兼容场景"},
                    {id:'scenario-4',text:"自动补全场景"},
                    {id:'scenario-5',text:"部分代码场景"},
                    {id:'scenario-6',text:"超长对抗场景"},
                    {id:'scenario-7',text:"红蓝对抗场景"},
                    {id:'scenario-8',text:"靶场场景"}
                ];
         $("#timeLine").hide();           
        //队伍数据加载
        $("#teamSelect").select2({
            data:data,
            width: '100%',
            allowClear:true
        });

        //场景数据加载
        $("#scenarioSelect").select2({
            data:data1,
            width: '100%',
            allowClear:true
        });
    
        
}

//监听场景选项
function ListeningScenar(){
    $("#scenarioSelect").on("select2-close",function(e){
        var res=$("#scenarioSelect").select2("data");
        if(res === null){
            return false;
        }else{
             $("#timeLine").slideDown(500); //时间轴显示
         var data=[
                    {id:'script-1',text:"脚本111"},
                    {id:'script-2',text:"脚本2222"},
                    {id:'script-3',text:"脚本333"},
                    {id:'script-4',text:"脚本444"},
                    {id:'script-5',text:"脚本5555"},
                    {id:'script-6',text:"脚本6"},
                    {id:'script-7',text:"脚本11166666"},
                    {id:'script-8',text:"脚本111234234234234"}
                ];
         var data1=[
                    {id:'os-1',text:"盗号云主机"},
                    {id:'os-2',text:"木马云主机"},
                    {id:'os-3',text:"熊猫烧香云主机"},
                    {id:'os-4',text:"千年虫云主机"},
                    {id:'os-5',text:"二愣子云主机"},
                    {id:'os-6',text:"csdn云主机"},
                    {id:'os-7',text:"漏洞云主机"},
                    {id:'os-8',text:"WEB云主机"}
                ];       
      //脚本数据加载
        $("#scriptSelect").select2({
            data:data,
            width: '100%',
            allowClear:true
        }); 

       //当前选择场景主机数据加载
        $("#ostSelect").select2({
            data:data1,
            width: '100%',
            allowClear:true
        });   
        }
      
    })
       
       //场景选择内容清空监听
      $("#scenarioSelect").on("select2-clearing",function(e){
        $("#timeLine").slideUp(500);
        $("#scriptSelect").val(''); //清空脚本列表
        $("#ostSelect").val(''); //清空云主机列表
        $("#addTimeLine li").remove(); //清空AI列表
        $("#timepicker2").val('') //清空时间
        arrayTime=[];
    })
}
   
   //脚本时间设置
   $('#timepicker2').timepicker({
    showSeconds: true,
    showMeridian: false,
    defaultTime: false
});

//时间数组
var arrayTime=[];
function addScript(){
      $("#addScript").click(function(){
        var timeValue= $('#timepicker2').val();//时间数值
        var times= timeValue.split(":");//时间数值
        var scriptValue= $('#scriptSelect').select2("data");//执行脚本脚本
        var osValue= $('#ostSelect').select2("data");//执行主机
        var timer=parseInt(times[0])*3600+parseInt(times[1])*60+parseInt(times[2]); //执行时间转换为秒数
         
        arrayTime.push(timer);

        var arraySort=arrayTime.sort(function(a,b){
            return a-b;
        })
        if(!timeValue){
           layer.msg("请选择时间!")
        }else if(!scriptValue){
           layer.msg("请选择执行脚本!")
        }else if(!osValue){
            layer.msg("请选择执主机!")
        }else if($("#addTimeLine li").length == 0){
            $(`#addTimeLine`).append(`
                        <li value=${timer}>
                            <div class="timeline-badge warning"><i class="glyphicon glyphicon-remove subjectRemove"></i></div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                <h5 class="timeline-title" id=${scriptValue.id}>执行脚本：${scriptValue.text}</h5>
                                <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i>开机 ${timeValue} 后执行</small></p>
                                </div>
                                <div class="timeline-body">
                                <p id=${osValue.id}>执行云主机：${osValue.text}</p>
                                </div>
                            </div>
                        </li>
            `)
        }else if(arraySort.indexOf(timer) < $("#addTimeLine li").length){
              $(`#addTimeLine li:nth-child(${arraySort.indexOf(timer)+1})`).before(`
                        <li value=${timer}>
                            <div class="timeline-badge warning"><i class="glyphicon glyphicon-remove subjectRemove"></i></div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                <h5 class="timeline-title" id=${scriptValue.id}>执行脚本：${scriptValue.text}</h5>
                                <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i>开机 ${timeValue} 后执行</small></p>
                                </div>
                                <div class="timeline-body">
                                <p id=${osValue.id}>执行云主机：${osValue.text}</p>
                                </div>
                            </div>
                        </li>
            `)
        }else{
             $(`#addTimeLine li:nth-child(${arraySort.indexOf(timer)})`).after(`
                        <li value=${timer}>
                            <div class="timeline-badge warning"><i class="glyphicon glyphicon-remove subjectRemove"></i></div>
                            <div class="timeline-panel">
                                <div class="timeline-heading">
                                <h5 class="timeline-title" id=${scriptValue.id}>执行脚本：${scriptValue.text}</h5>
                                <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i>开机 ${timeValue} 后执行</small></p>
                                </div>
                                <div class="timeline-body">
                                <p id=${osValue.id}>执行云主机：${osValue.text}</p>
                                </div>
                            </div>
                        </li>
            `)
        }
   
      })

      //删除定时脚本
      $(document).on('click','.subjectRemove',function(){
          var indexScript= $(this).parents('li').index();
          var _self=$(this);
          layer.confirm('是否删除定时脚本？', {
            btn: ['确认','取消'] //按钮
        }, function(){
            arrayTime.splice(indexScript,1);
            _self.parents('li').remove();
            layer.msg('删除成功!', {icon: 1});
            });
          
      })    


}

//保存新增题目
function newSubject(){
   $("#newSubject").click(function(){
        var subjectName=$("input[name=subjectName]").val(); //题目名称
        var classification=$("#inputEmail4").val(); //分类
        var team=$("#teamSelect").val(); //队伍
        var score=$("#inputEmail6").val(); //分数
        var flag=$("#inputEmail7").val(); //FLag
        var addFile=$("#inputEmail8").val(); //添加文件
        var scenario=$("#scenarioSelect").val(); //场景选择
        var AILength=$("#addTimeLine li"); //AI
        
        var newAddSubjectSave=[];//新增题目保存

        if(!subjectName){
            layer.msg("题目名称不能为空！")
        }else if(!score){
            layer.msg("题目分数不能为空！")
        }else if(!scenario){
            console.log(subjectName,classification,team,score,flag,addFile,scenario);
        }else{
            console.log(subjectName,classification,team,score,flag,addFile,scenario);
             AILength.each(function(i){
                 newAddSubjectSave.push([$(this).val(),$(this).find("h5").attr("id"),$(this).find(".timeline-body p").attr("id")]);
                 console.log(newAddSubjectSave);
             }) 
        }
      
   })
  
}

});