$(function () {
    var topocontent = $('#topocontent'),
        lefticon = $('.children li'),
        rightkeyPop = $('#rightkeyPop'),
        relationWrap = $('#relationWrap');
   
    //jsplumb 初始设置  
     //连接样式
	var lineColor = '#2f8e00',
	    labelTxt =  '连接',
	    instance = jsPlumb.getInstance({
			Endpoint : ["Dot", {radius:5}],
            filter:".dragPoint",
			ConnectionOverlays : [
				[ "Arrow", {location: 1, id:"arrow", length:10, foldback:0.8, width: 10} ]
			],
			DragOptions : { zIndex:2000 },
			Container:"topocontent"
		});
		
	window.jsp = instance;
    
    var  switches = {
			paintStyle: {
				strokeStyle: lineColor,
				fillStyle: lineColor
			},
			connector: ["Flowchart", {stub: [0, 0], gap: 2, cornerRadius: 5, alwaysRespectStubs: true }],
			connectorStyle: {
				lineWidth: 1,
				strokeStyle: lineColor
			},
			maxConnections: 8,
            filter:"p",
            isSource:true,
            isTarget:true
           
		},
        general = {
			paintStyle: {
				strokeStyle: lineColor,
				fillStyle: lineColor
			},
			connector: ["Flowchart", {stub: [0, 0], gap: 2, cornerRadius: 5, alwaysRespectStubs: true }],
			connectorStyle: {
				lineWidth: 1,
				strokeStyle: lineColor
			},
            isSource:true,
            isTarget:true
           
		},
         router = {
			paintStyle: {
				strokeStyle: lineColor,
				fillStyle: lineColor
			},
			connector: ["Flowchart", {stub: [0, 0], gap: 2, cornerRadius: 5, alwaysRespectStubs: true }],
			connectorStyle: {
				lineWidth: 1,
				strokeStyle: lineColor
			},
			maxConnections: 4,
            isSource:true,
            isTarget:true
           
		},
         Internet = {
			paintStyle: {
				strokeStyle: lineColor,
				fillStyle: lineColor
			},
			connector: ["Flowchart", {stub: [0, 0], gap: 2, cornerRadius: 5, alwaysRespectStubs: true }],
			connectorStyle: {
				lineWidth: 1,
				strokeStyle: lineColor
			},
			maxConnections: 2,
            isSource:true,
            isTarget:true
           
		},
        cloudHosting={
                paintStyle: {
                    strokeStyle: lineColor,
                    fillStyle: lineColor
                },
                connector: ["Flowchart", {stub: [0, 0], gap: 2, cornerRadius: 5, alwaysRespectStubs: true }],
                connectorStyle: {
                    lineWidth: 1,
                    strokeStyle: lineColor
                },
                anchor:"AutoDefault",
                maxConnections: 1
        }

       //渲染
      function renderConnect(newid){//渲染
		instance.draggable(newid);
        if(newid.substring(0,8) == "switches"){
             instance.addEndpoint(newid, switches);
        }else if(newid.substring(0,6) == "router"){
             instance.addEndpoint(newid, router);
        }else if(newid.substring(0,8) == "Internet"){
             instance.addEndpoint(newid, Internet);
        }else{
             instance.makeTarget(newid, cloudHosting);
        }

	}


   //加载已有数据
   topocontent.load('testdata/topo.json', function(response, status){
	    if(status == "success"){
            console.log(response);
			editData(response);
		}else{
		    layer.msg("没有数据");
		}
	});

    function editData(response){
	    var list = eval(response.split('&')[0]),
			blocks = eval(response.split('&')[1]),
			htmlText = "",
			conn = "";
		//------------插入元素-------------
		for( var i in blocks){
			var viewstyle = 'left:'+blocks[i].BlockX+'px;top:'+blocks[i].BlockY+'px;',
				viewid = blocks[i].BlockId,
				viewClass = blocks[i].BlockClass,
				viewsrc = blocks[i].BlockImg,
                viewstate=blocks[i].state?"gray":"",
				viewTxt = blocks[i].BlockText;
			htmlText = htmlText + '<div class="elebox '+viewClass+'" id='+viewid+' style='+viewstyle+'><img src='+viewsrc+' class='+viewstate+'><p class="dragPoint">'+viewTxt+'</p></div>';
		};
		topocontent.html(htmlText);

		//------------默认连接-------------
		var windowsDrag = jsPlumb.getSelector("#topocontent .elebox");
        for(let i=0;i<windowsDrag.length;i++){
             renderConnect(windowsDrag[i].id);
        }
       
		//------------连接-------------
		for( var i in list){
            console.log(list[i]);
         //   console.log(list[i].PageSourceId);
          //  console.log(list[i].PageTargetId);
			var conor = instance.connect({ source: list[i].PageSourceId, target:list[i].PageTargetId });
                conor.setPaintStyle({fillStyle : list[i].lineColor, strokeStyle: list[i].lineColor});
                instance.addEndpoint(list[i].PageSourceId,general)
		};
		$("div.elebox").draggable({ containment: "parent" });
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
                        <p class="dragPoint" >${spantxt+idnum}</p>
                    </div>
                `;
            $this.append(str);
            renderConnect(newid);
			instance.revalidate(newid);
            $(`#${newid}`).draggable({
                 containment: "parent",
                 stop:function(){  //监听元素移动后的位置
             //   console.log("x:"+$(this).css('left')+" y:"+$(this).css('top'))
            } });
        }
    });

  

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

    //点击文字修改名称
    $(document).on('click', '#topocontent div.elebox p', function(){
             var nameOS=$(this);
             var ModifyNameVal= $("#inputPassword3");
             ModifyNameVal.val('');
             $("#ModifyName").modal("show");
             ModifyNameVal.attr("placeholder",nameOS.text());
             saveName(nameOS,ModifyNameVal);
    })

    function saveName(nameOS,ModifyNameVal){
        $("#osSave").unbind('click').click(function(event){
            if(!ModifyNameVal.val()){
                layer.msg('名字不能为空')
            }else{
                layer.msg('修改成功'+ModifyNameVal.val())
                nameOS.text(ModifyNameVal.val());  //新名字放到topol里面。
                $("#ModifyName").modal("hide"); 
            }
            
        })
    }

   //交换机弹出层
   $(document).on("click","#topocontent div.elebox img",function(){
             var ID=$(this).parent().attr('id');
             var title=$(this).siblings('p').text();
             $(".modal-title").html(title);
             $(".modal-title").attr("value",ID);
             var s=instance.select({source:ID});
             var v=instance.select({target:ID});
             var j=1;
             if(ID.substring(0,8) == "switches"){
                switchesLayer(s,v,j)
             }else if(ID.substring(0,6) == "router"){
                  layer.msg("我是路由器 我最后做")
             }else if(ID.substring(0,8) == "Internet"){
                InternetLayer(s,v,j)
             }else{
                 return false;
             }
   });

    //交换机弹出层
    function switchesLayer(s,v,j){
        //先从后台获取交换机数据 如果没有的话 在执行下面操作
          $("#switchesmodal").modal("show");
                 s.each(function(i){
                     $("#switchesTable tbody").append(`
                          <tr id=${i.targetId}>   
                            <td scope="row">opt${j++}</td>
                            <td>${i.target.outerText}</td>
                            <td><input type="number" class="form-control" placeholder="范围 1-4094"></td>
                            <td><input type="number" class="form-control" placeholder="请输入IP地址"></td>
                            <td><input type="number" class="form-control" placeholder="请输入子网掩码"></td>
                          </tr>    
                     `)
                 });
                 v.each(function(i){
                     $("#switchesTable tbody").append(`
                          <tr id=${i.sourceId}>   
                            <td scope="row">opt${j++}</td>
                            <td>${i.source.outerText}</td>
                            <td><input type="number" class="form-control" placeholder="范围 1-4094"></td>
                            <td><input type="number" class="form-control" placeholder="请输入IP地址"></td>
                            <td><input type="number" class="form-control" placeholder="请输入子网掩码"></td>
                          </tr>    
                     `)
                 })
    }

    //互联网弹出层
    function InternetLayer(s,v,j){
        //先从后台获取交换机数据 如果没有的话 在执行下面操作
        $("#Internetmodal").modal("show");
                s.each(function(i){
                     $("#InternetTable tbody").append(`
                          <tr id=${i.targetId}>   
                            <td scope="row">opt${j++}</td>
                            <td>${i.target.outerText}</td>
                          </tr>    
                     `)
                 });
                 v.each(function(i){
                     $("#InternetTable tbody").append(`
                          <tr id=${i.sourceId}>   
                            <td scope="row">opt${j++}</td>
                            <td>${i.source.outerText}</td>
                          </tr>    
                     `)
                 })
    }
     //路由器弹出层
    function routerLayer(s,v,j){
        //先从后台获取交换机数据 如果没有的话 在执行下面操作

    }
     
   //保存交换机配置信息
     $("#switchesSave").click(function(){
          var switchID=$("#myModalLabel1").val(); //交换机ID
          var switchArray={
                 switch:switchID,
                 os:[
                 ]
          }
          $("#switchesTable tbody tr").each(function(i,dom){
              switchArray.os.push({
                         osID:$(this).attr('id'),
                         osName:$(this).children("td:nth-child(2)").text(),
                         interface:$(this).children("td:first").text(),
                         VlanID:$(this).children("td:nth-child(3)").children().val(),
                         IP:$(this).children("td:nth-child(4)").children().val(),
                         mask:$(this).children("td:nth-child(5)").children().val()
              })
          })
          $("#switchesmodal").modal("hide");
          console.log(switchArray);
     })
 
     
     //监听新的连接
    instance.bind("connection", function (connInfo, originalEvent) {
          console.log("起始ID:"+connInfo.sourceId+"  终点ID:"+connInfo.targetId);
        });

    //监听连接线事件
    instance.bind("connectionDragStop",function(info,originalEvent){
         if(info.connector){
             console.log("链接事件");
             console.log("起始ID:"+info.sourceId+"  终点ID:"+info.targetId)
         }else{
             console.log("取消链接事件");
              console.log("起始ID:"+info.sourceId+"  终点ID:"+info.targetId)
         }
     })
      
     //阻止系统自带右键点击事件
     $(document).on("contextmenu", function() {
        return false;
    });

    //右键点击事件
     $(document).on('mousedown', '#topocontent div.elebox', function(event){
            var Id=$(this).attr('id');
            var $this = $(this),
                    event = event || window.event,
                    oLeft = parseInt(event.clientX),
                    oTop = parseInt(event.clientY),
                    span = $this.children('p').text(),
                    idStr = $this.attr('id');
           if(event.which == 3){
               if(Id.substring(0,8) == "switches" || Id.substring(0,8) == "Internet"){
                   rightkeyPop.children("span:last").siblings().hide();
                   rightkeyPop.css({left : oLeft, top : oTop, zIndex : 2999}).attr('rightkey_click_id', idStr).show();
               }else if(Id.substring(0,6) == "router"){
                   rightkeyPop.children("span:last").siblings().show();
                   rightkeyPop.children("#vnc").hide();
                   rightkeyPop.css({left : oLeft, top : oTop, zIndex : 2999}).attr('rightkey_click_id', idStr).show();
               }else{
                   rightkeyPop.children("span:last").siblings().show();
                   rightkeyPop.css({left : oLeft, top : oTop, zIndex : 2999}).attr('rightkey_click_id', idStr).show();  
               }
                  
           }
                 
     })
    rightkeyPop.mouseover(function(){
        $(this).show();
        return false;
    });
    $('body').mouseover(function(){
        rightkeyPop.hide();
    });

    //开机
     $(document).on('click', '#startVnc', function(){

		idStr = rightkeyPop.attr('rightkey_click_id');
        var imgGray=$("#"+idStr).children("img").hasClass("gray");
        var imgTarget=$("#"+idStr).children('img');
        var imgSRC=imgTarget.attr('src');

        if(imgGray){
           layer.confirm('是否开机?', {
            btn: ['确定','取消'] //按钮
               }, function(){
                imgTarget.attr("src","images/topo/loading.gif");
                 setTimeout(function(){
                    imgTarget.attr("src",imgSRC);
                    $("#"+idStr).children('img').removeClass("gray");
                    layer.msg("开机成功!");
                    },2000)
                layer.closeAll();
				console.log('云主机id:'+idStr);
            });
        }else{
           layer.msg("已经开机！")
        }
		
	});

     //重启
     $(document).on('click', '#startRestart', function(){
		idStr = rightkeyPop.attr('rightkey_click_id'); //当前目标ID
        var imgTarget=$("#"+idStr).children('img');
        var imgSRC=imgTarget.attr('src');
        imgTarget.attr("src","images/topo/loading.gif");
        setTimeout(function(){
           imgTarget.attr("src",imgSRC);
           layer.msg("重启成功!");
        },2000)
	});
    
      //关机
     $(document).on('click', '#startOff', function(){
		idStr = rightkeyPop.attr('rightkey_click_id');
        var imgGray=$("#"+idStr).children("img").hasClass("gray");
        var imgTarget=$("#"+idStr).children('img');
        var imgSRC=imgTarget.attr('src');

        if(!imgGray){
           layer.confirm('是否关机?', {
            btn: ['确定','取消'] //按钮
               }, function(){
                imgTarget.attr("src","images/topo/loading.gif");
                 setTimeout(function(){
                    imgTarget.attr("src",imgSRC);
                    $("#"+idStr).children('img').addClass("gray");
                    layer.msg("关机成功!");
                    },2000)
                layer.closeAll();
				console.log('云主机id:'+idStr);
            });
        }else{
           layer.msg("已经关机！")
        }
	});

    //vnc
     $(document).on('click', '#vnc', function(){
		idStr = rightkeyPop.attr('rightkey_click_id');
		alert('云主机ID:'+idStr);
	});

    // 删除
	$(document).on('click', '#delEle', function(){
		idStr = rightkeyPop.attr('rightkey_click_id');
        layer.confirm('确认删除此元素及其链接吗？', {
            btn: ['确定','取消'] //按钮
            }, function(){
               instance.removeAllEndpoints(idStr);
				instance.remove(idStr);
                layer.closeAll();
				console.log('删除云主机id:'+idStr);
            });
	});

    //topo图保存
    var saveTopoBtn = $('#topoSave'),
		serliza = '';
        
    saveTopoBtn.click(function(){
        var connects = [];
        $.each(instance.getAllConnections(), function (idx, connection) {
                connects.push({
                    lineColor: lineColor,
                    PageSourceId: connection.sourceId,
                    PageTargetId: connection.targetId
                });
            });
       
        var blocks = [];
		$("#topocontent .elebox").each(function (idx, elem) {
			var $elem = $(elem);
			blocks.push({
				BlockId: $elem.attr('id'),
				BlockClass: $elem.attr('class').split(' ')[1],
				BlockImg: $elem.children('img').attr('src'),
				BlockText: $elem.children('p').text(),
                state:$elem.children('img').hasClass("gray"),
				BlockX: parseInt($elem.css("left")),
				BlockY: parseInt($elem.css("top"))
			});
		});
        serliza = JSON.stringify(connects) + "&" + JSON.stringify(blocks);
        console.log(serliza);
    })    

    //监听模态框隐藏事件
    $('#switchesmodal').on('hide.bs.modal', function () {
         $("#switchesTable tbody tr").remove();
      });
      
    $('#Internetmodal').on('hide.bs.modal', function () {
         $("#InternetTable tbody tr").remove();
      })  

});