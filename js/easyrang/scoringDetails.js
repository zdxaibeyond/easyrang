$(function(){
	//成功率
     var myChart = echarts.init(document.getElementById('left'));
	 
     var data1=['安全类','web类','android类','密码类','漏洞类','price类'];
     var data=[
            {value:10, name:'安全类'},
	        {value:5, name:'web类'},
	        {value:15, name:'android类'},
	        {value:25, name:'密码类'},
	        {value:20, name:'漏洞类'},
	        {value:35, name:'price类'}
     ]
     var dataValue=[10,5,15,25,20,35];
     myChart.setOption({
     	 backgroundColor: '#fff',
		    title : {
		        text: '成功率',
		        subtext: '纯属虚构',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        x : 'center',
		        y : 'bottom',
		        data:data1
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {
		                show: true,
		                type: ['pie', 'funnel']
		            },
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    series : [
		        {
		            name:'面积模式',
		            type:'pie',
		            radius : [30, 110],
		            center : ['50%', '50%'],
		            roseType : 'area',
		            data:data
		        }
		    ]
     	
     });

     //题目分类
     var myChart1 = echarts.init(document.getElementById('right'));
     myChart1.setOption({
     	 backgroundColor: '#fff',
		    title : {
		        text: '题目分类',
		        subtext: '各科题目占总题目百分比',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        x : 'center',
		        y : 'bottom',
		        data:data1
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {
		                show: true,
		                type: ['pie', 'funnel']
		            },
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    series : [
		        {
		            name:'面积模式',
		            type:'pie',
		            radius : [30, 110],
		            center : ['50%', '50%'],
		            roseType : 'area',
		            data:data
		        }
		    ]
     });

      //答题情况
     var myChart2 = echarts.init(document.getElementById('center'));
     myChart2.setOption({
     	backgroundColor: '#fff',
	 	        title : {
		        text: '答题情况',
		        subtext: '纯属虚构',
		        x:'center'
		        },
			    color: ['#3398DB'],
			    tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			        }
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '3%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            data : data1,
			            axisTick: {
			                alignWithLabel: true
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : [
			        {
			            name:'题目答对',
			            type:'bar',
			            barWidth: '60%',
			            data:dataValue
			        }
			    ]
     });
});
