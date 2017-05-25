$(function(){
      for(var j=0; j<25; j++){
        $("#timeLine").append(`
           <div class="row timeLine-bg" >
                <div class="col-md-2">
                  <h4 class="text-center timeLine-h2 text-primary">
                      场景名称场景名称场${j}
                  </h4>
                </div>
                <div class="col-md-10">
                    <div class="scroll-pane ui-widget ui-widget-header ui-corner-all" >
                        <div class="scroll-content">
                             ${
                                $('.scroll-content').append(`
                                   <div class="scroll-content-item ui-widget-header">
                                          <h5 class="timeline-title" id="script-2">脚本:虚拟脚本${j}</h5>
                                          <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i>开机 01:00:00 后执行</small></p>
                                          <p id="os-2">云主机：木马云主机${j}</p>
                                  </div>
                                `)
                              }
                           
                        </div>
                    </div>
                </div>
        </div>
        `)
    }

  
     //计算每个场景时间轴的宽度
     var timeLIneWidth=$(".scroll-content");
     timeLIneWidth.each(function(){
       $(this).css('width',$(this).children().length*220+'px');
     });
     
     //返回按钮 给我参数判断 回到靶场 或者回到红蓝对抗
   
    $('.ui-widget ').niceScroll({
    cursorcolor: "#1caf9a",//#CC0071 光标颜色
    cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
    touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
    cursorwidth: "10px", //像素光标的宽度
    cursorborder: "0", // 游标边框css定义
    cursorborderradius: "5px",//以像素为光标边界半径
    autohidemode: false //是否隐藏滚动条
    });
})