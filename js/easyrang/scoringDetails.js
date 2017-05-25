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

	 var data_val=[51, 24, 30, 31, 28, 53, 20.2],
          xAxis_val=['安全类', 'web类', 'android类', '密码类', '漏洞类', 'price类', 'price类'];
     var data_val1=[0,0,0,0,0,0,0];
     myChart.setOption({
     	  backgroundColor:'#fff',
				grid:{
					left:10,
					top:'10%',
					bottom:20,
					right:40,
					containLabel:true
				},
				tooltip:{
					show:true,
					backgroundColor:'#384157',
					borderColor:'#384157',
					borderWidth:1,
					formatter:'{b}:{c}',
					extraCssText:'box-shadow: 0 0 5px rgba(0, 0, 0, 1)'
				},
				legend:{
					right:0,
					top:0,
					data:['距离'],
					textStyle:{
						color :'#5c6076'
					}
				},
				title: {
					text: '各科成功率',
					x:'4.5%',
					top: '1%',
					textStyle:{
					color :'#5c6076'
					}
				},
				xAxis: {
					data: xAxis_val,
					boundaryGap:false,
					axisLine:{
						show:false
					},
					axisLabel: {
						textStyle: {
							color: '#5c6076'
						}  
					},
					axisTick:{
						show:false
					}
				},
				yAxis: { 
					ayisLine:{
						show:false
					},
					axisLabel: {
						textStyle: {
							color: '#5c6076'
						}  
					},
					splitLine:{
						show:true,
						lineStyle:{
							color:'#2e3547'
						}
					},
					axisLine: {
							lineStyle: {
								color: '#384157'
							}
						}
				},
				
				series: [
					{
						type: 'bar',
						name:'linedemo',
						
						
						tooltip:{
							show:false
						},
						animation:false,
						barWidth:1.4,
						hoverAnimation:false,
						data:data_val,
						itemStyle:{
							normal:{
								color:'#f17a52',
								opacity:0.6,
								label:{
									show:false
								}
							}
						}
					},
					{
						type: 'line',
						name:'百分比',
						
						animation:false,
						symbol:'circle',
				
						hoverAnimation:false,
						data:data_val1,
						itemStyle:{
							normal:{
								color:'#f17a52',
								opacity:0,
							}
						},
						lineStyle:{
							normal:{
								width:1,
								color:'#384157',
								opacity:1
							}
						}
					},
					{
						type: 'line',
						name:'linedemo',
						smooth:true,
						symbolSize:10,
						animation:false,
						lineWidth:1.2,
						hoverAnimation:false,
						data:data_val,
						symbol:'circle',
						itemStyle:{
							normal:{
								color:'#f17a52',
								shadowBlur: 40,
								label:{
									show:true,
									position:'top',
									textStyle:{
										color:'#f17a52',
								
									}
								}
							}
						},
					areaStyle:{
							normal:{
								color:'#f17a52',
								opacity:0.08
							}
						}
						
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
