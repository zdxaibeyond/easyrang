$(function () {
    var topocontent = $('#content'),
        lefticon = $('.children li');
    
    //jsplumb 初始设置
     var  lineColor='#2f8e00',
          instance = jsPlumb.getInstance({
                         PaintStyle:{ 
                            strokeWidth:1, 
                            stroke:lineColor, 
                            outlineStroke:lineColor, 
                            outlineWidth:1 
                        },
                        Connector:[ "Bezier", { curviness: 30 } ],
                        Endpoint:[ "Dot", { radius:5 } ],
                        EndpointStyle : { fill: lineColor  }
                });

    
      window.jsp = instance; 
      
      var couldHost={ //云主机
                   isSource:true,
                   isTarget:false,
                   connector: ["Flowchart", {stub: [0, 0], gap: 2, cornerRadius: 5, alwaysRespectStubs: true }]
		},
        switches={//交换机
                  isSource:true,  //是否可以拖动（作为连线起点）
                  isTarget:true, //是否可以放置（作为连线终点）
                  maxConnections:8, //设置连接点最多可以连接几条线 
                  connector: ["Flowchart", {stub: [0, 0], gap: 2, cornerRadius: 5, alwaysRespectStubs: true }] //连接线的样式
        }
        
         
        //topo渲染
        function renderConnect(newid){
          instance.draggable(newid);
          if(newid.substring(0,8) == "switches"){
               instance.addEndpoint(newid,{filter:".Center",anchor:"Continuous"}, switches);
          }else{
               instance.addEndpoint(newid, {filter:".Center",anchor:"Continuous"},couldHost);
          } 
		
        }  
     
    //拖动创建元素
    lefticon.draggable({
        helper: 'clone',
        start: function (event, ui) {
            var $this = ui.helper;
            $this.css({
                "background": "#eee",
                "width": "200px;",
                "border": "1px solid #ccc"
            });
            $this.children('a').children('i').remove();
            $this.children("a").css({
                "text-align": "center",
                "padding": "10px 20px",
                "color": "#636e7b"
            })
        },
        scope: 'topo'
    });
    topocontent.droppable({
        scope: 'topo',
        drop: function (event, ui) {
            //获取基本元素与参数
            var $this = $(this),
                dragui = ui.draggable,
                fatop = parseInt($this.offset().top),
                faleft = parseInt($this.offset().left),
                uitop = parseInt(ui.offset.top),
                uileft = parseInt(ui.offset.left),
                imgsrc = dragui.children('a').attr('value'),
                spantxt = dragui.children('a').text(),
                uid = dragui.attr('id'),
                alluid = topocontent.children('div.' + uid);
            //ID计算
            var allicon = alluid.length,
                idnum = 0,
                idArr = new Array;
            alluid.each(function (i) {
                idArr.push(parseInt($(this).attr('id').split('_')[1]));
            });
            idArr.sort(function (a, b) { return a > b ? 1 : -1 });
            for (i = 0; i < allicon; i++) {
                var idArrOne = parseInt(idArr[i]);
                if (i != idArrOne) {
                    idnum = idArrOne - 1;
                    break;
                } else {
                    idnum = allicon;
                }
            }

            var newstyle = 'left:' + (uileft - faleft) + 'px;top:' + (uitop - fatop) + 'px',
                newid = uid + '_' + idnum,
                str = `
                    <div class="elebox ${uid}" id=${newid} style=${newstyle}>
                        <img src=${imgsrc}  alt=${spantxt}>
                        <p class="dragPoint" >${spantxt}</p>
                    </div>
                `;
            $this.append(str);
            renderConnect(newid);
			instance.revalidate(newid);
            $(`#${newid}`).draggable({ containment: "parent" });

            console.log(str);
        }
    });

    // $(document).on("click","#content .elebox",function(){
    //    alert(1);
    // })

    //左侧内容超出滚动条
    $('.ul-maxHight ').niceScroll({
        cursorcolor: "#1caf9a",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "10px", //像素光标的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径
        autohidemode: false //是否隐藏滚动条
    });

});