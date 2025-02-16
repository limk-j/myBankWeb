    function fnW(str) {
        var num;
        str >= 10 ? num = str : num = "0" + str;
        return num;
    }
    //获取当前时间
    var timer = setInterval(function () {
        var date = new Date();
        var year = date.getFullYear(); //当前年份
        var month = date.getMonth(); //当前月份
        var data = date.getDate(); //天
        var hours = date.getHours(); //小时
        var minute = date.getMinutes(); //分
        var second = date.getSeconds(); //秒
        var day = date.getDay(); //获取当前星期几 
        var ampm = hours < 12 ? 'am' : 'pm';
        $('#time').html(fnW(hours) + ":" + fnW(minute) + ":" + fnW(second));
        $('#date').html('<span>' + year + '/' + (month + 1) + '/' + data + '</span><span>' + ampm + '</span><span>周' + day + '</span>')

    }, 1000)

	

	/*按钮点击方法*/
    $('.select-ul').on('click', 'li', function () {
        $(this).addClass('active').siblings('li').removeClass('active').parent().hide().siblings('.select-div').html($(this).html());
        var parentDiv = $(this).parent().parent().parent();
    })

    //鼠标滑动到按钮，按钮内容变成白色
    var imgName;
    $('.title-box').children('button').hover(function () {
        imgName = $(this).children('img').attr('src').split('.png')[0];
        $(this).children('img').attr('src', imgName + '_on.png');
    }, function () {
        $(this).children('img').attr('src', imgName + '.png');

    });


    var startColor = ['#0e94eb', '#c440ef', '#efb013', '#2fda07', '#d8ef13', '#2e4af8', '#0eebc4', '#f129b1', '#17defc', '#f86363'];
    var borderStartColor = ['#0077c5', '#a819d7', '#c99002', '#24bc00', '#b6cb04', '#112ee2', '#00bd9c', '#ce078f', '#00b2cd', '#ec3c3c'];


	$('.select').on('blur', function () {
			$(this).find('.select-ul').hide();
		})
		//下拉框点击出现下拉框内容
	$('.select-div').on('click', function () {
		if ($(this).siblings('.select-ul').is(":hidden")) {
			$(this).siblings('.select-ul').show();
		} else {
			$(this).siblings('.select-ul').hide();
		}
	})
	$('.select-ul').on('click', 'li', function () {
		$(this).addClass('active').siblings('li').removeClass('active').parent().hide().siblings('.select-div').html($(this).html());
		var parentDiv = $(this).parent().parent().parent();
	})

    //银行指标分析占比，带边框效果的饼图

    // 点击其他位置收起选择框
    var title1_1; //标题1：分析 的第一个选择参数
    var title1_2; //标题1：分析 的第二个选择参数
    var title2_1; //标题2：预测 的第一个选择参数
    $('.box-center').on('click', function () {
        if (!$('#filCon').is(":hidden")) {
            $('#filCon').hide();
    			//var ul = document.getElementById("analyli1_1").getElementsByTagName("ul")[0].getElementsByTagName("li");
    			title1_1 = $("#analyli1_1").text();
    			title1_2 = $("#analyli1_2").text();
    			title1 = '业务指标分析';
    			if(title1_1 != '业务指标' && title1_2 != '分析指标'){
    				$("#title1").text(title1+": "+title1_1+" - "+title1_2);
    			}

            }
            if (!$('#fil1Con').is(":hidden")) {
                $('#fil1Con').hide();
                title2_1 = $("#analyli2_1").text();
                title2 = '业务指标预测';
                if(title2_1 != '预测指标'){
                    $("#title2").text(title2+": "+title2_1);
                }

            }
        });

    function chart1() {
        //data 为模拟数据
        var data = [{
            name: 'IT人员',
            value: 192581,
            percent: '20.74',
        }, {
            name: '教师',
            value: 215635,
            percent: '19.26',
        }, {
            name: '管理人员',
            value: 224585,
            percent: '35.44',
        }, {
            name: '行政',
            value: 224585,
            percent: '10.56',
        }, {
            name: '医生',
            value: 224585,
            percent: '5.11',
        }, {
            name: '律师',
            value: 224585,
            percent: '3.63',
        }, {
            name: '农民',
            value: 224585,
            percent: '1.26',
        }];
        var myChart = echarts.init(document.getElementById('pie'));
        window.addEventListener('resize', function () {
            myChart.resize();
        });

        var str = '';
        for (var i = 0; i < data.length; i++) {
            str += '<p><span><i class="legend" style="background:' + startColor[i] + '"></i></span>' + data[i].name + '<span class="pie-number" style="color:' + startColor[i] + '">' + ""+ '</span>' + Number(data[i].percent).toFixed(2) + '%</p>';
        }

        $('.pie-data').append(str);


        function deepCopy(obj) {
            if (typeof obj !== 'object') {
                return obj;
            }
            var newobj = {};
            for (var attr in obj) {
                newobj[attr] = obj[attr];
            }
            return newobj;
        }
        var xData = [],
        yData = [];
        data.map((a, b) => {
            xData.push(a.name);
            yData.push(a.value);
        });


        var RealData = [];
        var borderData = [];
        data.map((item, index) => {
            var newobj = deepCopy(item);
            var newobj1 = deepCopy(item);
            RealData.push(newobj);
            borderData.push(newobj1);
        });
        RealData.map((item, index) => {
            item.itemStyle = {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: startColor[index] // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: startColor[index] // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                }
            }
        });
        borderData.map((item, index) => {
            item.itemStyle = {
                normal: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: borderStartColor[index] // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: borderStartColor[index] // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    },
                }
            }
        });
        var option = {
            tooltip: {
                trigger: 'item',
                //            position: ['30%', '50%'],
                confine: true,
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
            // 主要展示层的
            {
                radius: ['50%', '85%'],
                center: ['50%', '50%'],
                type: 'pie',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                name: "银行指标分析占比内容",
                data: RealData
            },
            // 边框的设置
            {
                radius: ['45%', '50%'],
                center: ['50%', '50%'],
                type: 'pie',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                animation: false,
                tooltip: {
                    show: false
                },
                data: borderData
            }
            ]
        };

        myChart.setOption(option);
    }
    $('#filBtn').on('click', function () {
        if ($('#filCon').is(":hidden")) {
            $('#filCon').attr('style', 'display:flex');
        } else {
            $('#filCon').hide();
        }
    })
        //点击筛选按钮end

        chart1()

//----------------------业务指标分析占比内容end---------------

//------------业务预测数据内容---------------
    //点击筛选按钮
    $('#fil1Btn').on('click', function () {
        if ($('#fil1Con').is(":hidden")) {
            $('#fil1Con').attr('style', 'display:flex');
        } else {
            $('#fil1Con').hide();
        }
    })
        //点击筛选按钮end
        function chart2() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('prechart'));
            myChart.clear();
            option = {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['历史','预测'],
                    textStyle:{
                        color: '#fff'
                    },
                    top: '8%'
                },
                grid: {
                    top: '20%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                color: ['#FF4949','#FFA74D','#FFEA51','#4BF0FF','#44AFF0','#4E82FF','#584BFF','#BE4DFF','#F845F1'],
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['7月','8月','9月','10月','11月','12月'],
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                yAxis: {
                    name: '张',
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                series: [
                {
                    name:'历史',
                    type:'line',
    					smooth: true, //平滑曲线显示
                        data:[3961.88, 4233.63, 4183.14]
                    },
                    {
                        name:'预测',
                        type:'line',
    					smooth: true, //平滑曲线显示
                        data:[,,4183.14, 3633.01, 3704.47,4204.47]
                    }
    				// 此处添加
                    ]
                };
                myChart.setOption(option);
            }
            chart2('');
//------------指标预测end---------------

/* =========================地图模块图表============================*/
    //地图地点选择
    var myChart3 = echarts.init(document.getElementById('gdMap'));
    function chart3(chartType) {
        var data = [
        {
            name: '广州市',
            value: 120057.34
        },
        {
            name: '韶关市',
            value: 15477.48
        },
        {
            name: '深圳市',
            value: 131686.1
        },
        {
            name: '珠海市',
            value: 6992.6
        },
        {
            name: '汕头市',
            value: 44045.49
        },
        {
            name: '佛山市',
            value: 40689.64
        },
        {
            name: '江门市',
            value: 37659.78
        },
        {
            name: '湛江市',
            value: 45180.97
        },
        {
            name: '茂名市',
            value: 5204.26
        },
        {
            name: '肇庆市',
            value: 21900.9
        },
        {
            name: '惠州市',
            value: 4918.26
        },
        {
            name: '梅州市',
            value: 5881.84
        },
        {
            name: '汕尾市',
            value: 4178.01
        },
        {
            name: '河源市',
            value: 2227.92
        },
        {
            name: '阳江市',
            value: 2180.98
        },
        {
            name: '清远市',
            value: 9172.94
        },
        {
            name: '东莞市',
            value: 3368
        },
        {
            name: '中山市',
            value: 306.98
        },
        {
            name: '潮州市',
            value: 810.66
        },
        {
            name: '揭阳市',
            value: 542.2
        },
        {
            name: '云浮市',
            value: 256.38
        }]

        window.addEventListener('resize', function () {
            myChart3.resize();
        });
        var yMax = 0;
        for (var j = 0; j < data.length; j++) {
            if (yMax < data[j].value) {
                yMax = data[j].value;
            }
        }
        myChart3.hideLoading();
        var option = {
            animation: true,
            tooltip: {
                show: true
            },
            visualMap: {
                min: 0,
                max: yMax,
                text: ['高', '低'],
                orient: 'horizontal',
                itemWidth: 15,
                itemHeight: 200,
                right: 0,
                bottom: 30,
                inRange: {
                    color: ['#75ddff', '#0e94eb']
                },
                textStyle: {
                    color: 'white'
                }
            },
            series: [
            {
                name: '数据名称',
                type: 'map',
                mapType: '广东',
                selectedMode: 'multiple',
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}<br/>{c} (件)'
                },
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        borderColor: '#0e94eb',
                        label: {
                            show: false
                        }
                    },
                            emphasis: { // 也是选中样式
                                borderWidth: 1,
                                borderColor: '#fff',
                                backgroundColor: 'red',
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff'
                                    }
                                }
                            }
                        },
                        data: data,
                    }
                    ]
                };
                myChart3.setOption(option);
            }
            chart3('');

/* =========================地图模块图表节结束============================*/

/* =========================业务选择============================*/

    //业务选择 按钮动态展示
	var mouseleaveable_1 = true;
	var mouseleaveable_2 = true;
	var mouseleaveable_3 = true;
	var mouseleaveable_4 = true;
    $('#Jcardnum').css({y:-20}).transition({
      opacity: 1,
      y:0
	},1000, 'linear');
	$('#Jcardnum').on('mouseover',function(){
	  $('#Jcardnum').css({background:'#9400D3'})
	});
	$('#Jcardnum').on('mouseleave',function(){
		if(mouseleaveable_1)
			$('#Jcardnum').css({background:'#4169E1'})
	});
	$('#Jcardnum').on('click',function(){
	  mouseleaveable_1 = false;
	  mouseleaveable_2 = true;
	  mouseleaveable_3 = true;
	  mouseleaveable_4 = true;
	  $('#Jcardnum').css({background:'#9400D3'});
	  $('#Jloan').css({background:'#4169E1'});
	  $('#Jcash').css({background:'#4169E1'});
	  $('#Jmiddle').css({background:'#4169E1'});
	});
  
    $('#Jloan').css({y:-20}).transition({
      opacity: 1,
      y:0,
      delay:250
	},1000, 'linear');
	$('#Jloan').on('mouseover',function(){
	  $('#Jloan').css({background:'#9400D3'})
	});
	$('#Jloan').on('mouseleave',function(){
		if(mouseleaveable_2)
			$('#Jloan').css({background:'#4169E1'})
	});
	$('#Jloan').on('click',function(){
	  mouseleaveable_1 = true;
	  mouseleaveable_2 = false;
	  mouseleaveable_3 = true;
	  mouseleaveable_4 = true;
	  $('#Jcardnum').css({background:'#4169E1'});
	  $('#Jloan').css({background:'#9400D3'});
	  $('#Jcash').css({background:'#4169E1'});
	  $('#Jmiddle').css({background:'#4169E1'});
	});
  
    $('#Jcash').css({y:-20}).transition({
      opacity: 1,
      y:0,
      delay:500
	},1000, 'linear');
	$('#Jcash').on('mouseover',function(){
			$('#Jcash').css({background:'#9400D3'})
	});
	$('#Jcash').on('mouseleave',function(){
		if(mouseleaveable_3)
			$('#Jcash').css({background:'#4169E1'})
	});
	$('#Jcash').on('click',function(){
	  mouseleaveable_1 = true;
	  mouseleaveable_2 = true;
	  mouseleaveable_3 = false;
	  mouseleaveable_4 = true;
	  $('#Jcardnum').css({background:'#4169E1'});
	  $('#Jloan').css({background:'#4169E1'});
	  $('#Jcash').css({background:'#9400D3'});
	  $('#Jmiddle').css({background:'#4169E1'});
	});
	
    $('#Jmiddle').css({y:-20}).transition({
      opacity: 1,
      y:0,
      delay:750
	},1000, 'linear');
	$('#Jmiddle').on('mouseover',function(){
	  $('#Jmiddle').css({background:'#9400D3'})
	});
	$('#Jmiddle').on('mouseleave',function(){
		if(mouseleaveable_4)
			$('#Jmiddle').css({background:'#4169E1'})
	});
	$('#Jmiddle').on('click',function(){
	  mouseleaveable_1 = true;
	  mouseleaveable_2 = true;
	  mouseleaveable_3 = true;
	  mouseleaveable_4 = false;
	  $('#Jcardnum').css({background:'#4169E1'});
	  $('#Jloan').css({background:'#4169E1'});
	  $('#Jcash').css({background:'#4169E1'});
	  $('#Jmiddle').css({background:'#9400D3'});
	});
  
  
    $('#gdMap').css({opacity: 0,scale:0.2}).transition({
      opacity: 1,
      scale:1
  },1000, 'linear');
  
  
/* =========================业务选择结束============================*/

/* =========================历史查询============================*/
// 新增查询的时候，会自动更新，会进行存储，默认只显示前4条
    $('').on('click',function(){
    	var data1 = $('#historydata1').text();
    	var data2 = $('#historydata2').text();
    	$('.historydata').transition({
         opacity: 0
     },500);
    	$('.historydata').transition({
    		opacity: 1
    	},500);
    	setTimeout(function(){$('#historydata1').text(data2)},500);
    });
/* =========================历史查询结束============================*/


/* =========================时间选择器============================*/
    var startV = '';
    var endV = '';
    laydate.skin('danlan');
    var startTime = {
        elem: '#startTime',
        format: 'YYYY-MM-DD',
        min: '1997-01-01', //设定最小日期为当前日期
        max: laydate.now(), //最大日期
        istime: true,
        istoday: true,
        fixed: false,
        choose: function (datas) {
            startV = datas;
            endTime.min = datas; //开始日选好后，重置结束日的最小日期
        }
    };
    var endTime = {
        elem: '#endTime',
        format: 'YYYY-MM-DD',
        min: laydate.now(),
        max: laydate.now(),
        istime: true,
        istoday: true,
        fixed: false,
        choose: function (datas) {
            //        startTime.max = datas; //结束日选好后，重置开始日的最大日期
            endV = datas;
        }
    };

    laydate(startTime);
    laydate(endTime);

    //时间选择器
    var startVs = '';
    var endVs = '';
    laydate.skin('danlan');
    var startTimes = {
        elem: '#startTimes',
        format: 'YYYY-MM-DD',
        min: '1997-01-01', //设定最小日期为当前日期
        max: '2099-06-16', //最大日期
        istime: true,
        istoday: true,
        fixed: false,
        choose: function (datas) {
            startVs = datas;
            endTimes.min = datas; //开始日选好后，重置结束日的最小日期
            setQgData($('#barTypes').parent().parent(), 1);
        }
    };
    var endTimes = {
        elem: '#endTimes',
        format: 'YYYY-MM-DD',
        min: laydate.now(),
        max: laydate.now(),
        istime: true,
        istoday: true,
        fixed: false,
        choose: function (datas) {
            //        startTime.max = datas; //结束日选好后，重置开始日的最大日期
            endVs = datas;
            setQgData($('#barTypes').parent().parent(), 1);
        }
    };

    laydate(startTimes);
    laydate(endTimes);

    //点击时间选择器的时候更改样式
    $('#endTime').on('click', function () {
        dateCss();
    })

    $('#end').on('click', function () {
        dateCss();
    })


    //更改日期插件的样式
    function dateCss() {
        var arr = $('#laydate_box').attr('style').split(';');
        var cssStr =
        'position:absolute;right:0;';
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].indexOf('top') != -1) {
                cssStr += arr[i];
            }
        }

        $('#laydate_box').attr('style', cssStr);
    }
/* =========================时间选择器结束============================*/

/* =========================核心查询图表============================*/
    var myChart4 = echarts.init(document.getElementById('chart4'));
    function chart4() {
            // 基于准备好的dom，初始化echarts实例
            myChart4.clear();
            option = {
                tooltip : {
                    trigger: 'axis'
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        magicType: {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                dataZoom : {
                  zoomOnMouseWheel:true,
                  moveOnMouseMove:true,
                  type: 'slider',
    		//type:'inside',
            xAxisIndex: 0,
            filterMode: 'weakFilter',
            height: 20,
            bottom: 0,
            start: 0,
            end: 26,
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            show : true,
            realtime : true,
            y: '90%',
            height: 20,
            //backgroundColor: '#5F9EA0',
            dataBackgroundColor: 'rgb(0,0,0,0)',
            //fillerColor: '#00008B',
            //handleColor: '#00008B',
            textStyle:{
              color: '#fff',
          },
          start : 0,
          end : 100
      },
      color: ['#00008B','#4169E1','#5F9EA0','#8A2BE2','#44AFF0','#4E82FF','#584BFF','#BE4DFF','#F845F1'],
      calculable : true,
      legend: {
        data:['开卡数','贷款数','存款数'],
        textStyle:{
            color: '#fff'
        },
    },
    xAxis : [
    {
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        splitLine: {
            show: false
        },
        type : 'category',
        data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    }
    ],
    yAxis : [
    {

     splitLine: {
        show: false,
    },
    axisLine: {
        lineStyle: {
            color: '#fff'
        }
    },
    type : 'value',
    name : '张',
    axisLabel : {
    }
}
],
series : [
/*
{
	
    name:'广州市',
    type:'bar',
    data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
    itemStyle: {
        normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: "#00FFE3"
            },
            {
                offset: 1,
                color: "#4693EC"
            }
            ])
        }
    },
} */
]
};               
myChart4.setOption(option);
}
chart4('');


/*==================数据获取的地方==================*/
    /*横坐标参数，年月日信息
    其中年和月静态，日由函数getday()动态获取*/
    var year = ['1997年','1998年','2000年','2001年','2002年','2003年','2004年','2005年','2006年','2007年','2008年','2009年','2010年','2011年','2012年','2013年','2014年','2015年','2016年','2017年','2018年','2019年']
    var month = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    var day = [];
    function getday(params){
        var list = [];
        if(params.indexOf('1') != -1 || params.indexOf('3')  != -1 || 
          params.indexOf('5')  != -1 || params.indexOf('7')  != -1 ||
          params.indexOf('8')  != -1 || params.indexOf('10') != -1 ||
          params.indexOf('12') != -1 ){
          for (var i = 1; i <= 31; i++) {
             list.push(i+'号');
         }
         return list;
     }else if (params.indexOf('2') != -1 ){
      for (var i = 1; i <= 29; i++) {
         list.push(i+'号');
     }
     return list;
 }else{
  for (var i = 1; i <= 30; i++) {
     list.push(i+'号');
 }
 return list;
}
return list;
};

    // 获取随机数
    function gettestdata(num){
    	var testdata = [];
    	for (var i = 0; i < num ; i++){
    		testdata.push(myrandom(500,1000));
    	}
    	return testdata;
    }
    function myrandom(lower, upper) {
    	return Math.floor(Math.random() * (upper - lower+1)) + lower;
    }

    /*纵坐标参数，测试的时候数据为静态，动态化给一下变量进行赋值即可
    主要接收的json数据格式
    var jasondata = 
    [
    	{
    		{
    			{
    				{},{},{},{} 4中业务数据
    			},{},{}...{} 29/30/31天
    		},{},{}...{} 12个月
    	},{},{}...{} 1997-2019
        ]*/

        /*测试用*/
    // 1997-2019年数据
    var yearData = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
    ,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4]
    // 1年12个月的数据
    var monthsInYear = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3];
    // 1个月29/30/31天的数据
    var daysInMonth = [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
    ,2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
    ,2.0, 4.9, 7.0, 23.2, 25.6, 76.7];//这里有30个数据

    function getdaysdata(city){
    	var out = [];
    	out = gettestdata(31);
    	return out;
    }

    function getmonthsdata(city){
    	var out = [];
    	out = gettestdata(12);
    	return out;
    }

    function getyearsdata(city){
    	var out = [];
    	out = gettestdata(23);//1997-2019
    	return out;
    }
/*===========================数据获取结束============================*/
    /*滑动监听事件*/
    myChart4.on('datazoom',function(params){
    	var options = myChart4.getOption();
    	var startValue = options.dataZoom[0].startValue;
    	var endValue = options.dataZoom[0].endValue;
    	//console.log(options.dataZoom[0].start+" "+options.dataZoom[0].end)
    	var refleshXAxisData = [];
    	var refleshSeriesData = [];
    	if(endValue - startValue == 0){
    		var dataIndex = options.xAxis[0].data;
    		if(dataIndex[0].indexOf('月')!=-1){
    			startValue ++;
    			refleshXAxisData = getday(startValue+'月');
    			refleshSeriesData = daysInMonth;
    			options.xAxis[0].data = refleshXAxisData;
    			options.series[0].data = refleshSeriesData;
    			options.dataZoom[0].start = 0;
    			options.dataZoom[0].end = 100;
    			myChart4.clear();
    			myChart4.setOption(options)
    		}
    	}
    })

    // 双击跳到上一层  号--月--年
    $('#chart4').on('dblclick', function (params) {
    	var options = myChart4.getOption();
        var dataIndex = options.xAxis[0].data;
        if(dataIndex != null){
          if(dataIndex[0].indexOf('号')!=-1){
             options.xAxis[0].data = month;
             options.series[0].data = monthsInYear;
             options.dataZoom[0].start = 0;
             options.dataZoom[0].end = 100;
             myChart4.clear();
             myChart4.setOption(options)
         }
         if(dataIndex[0].indexOf('月')!=-1){
             options.xAxis[0].data = year;
             options.series[0].data = yearData;
             options.dataZoom[0].start = 0;
             options.dataZoom[0].end = 100;
             myChart4.clear();
             myChart4.setOption(options)
         }
     }
 });

    var selectedCity = [];


    /*实现点击进入具体某一年或者某一月的功能*/
    myChart4.getZr().on('click',params=>{
    	//console.log(params);
        const pointInPixel= [params.offsetX, params.offsetY];
        if (myChart4.containPixel('grid',pointInPixel)) {
            let xIndex = myChart4.convertFromPixel({seriesIndex:0},[params.offsetX, params.offsetY])[0];
            /*事件处理代码书写位置*/
            if(xIndex != null){
             var options = myChart4.getOption();
             var dataIndex = options.xAxis[0].data;
             /*如果是某一天的图形点击事件*/
             if(dataIndex[0].indexOf('号')!=-1){

             }else if (dataIndex[0].indexOf('月')!=-1){
    				// 获取当前点击月份
    				var clickMonth = xIndex + 1;
    				options.xAxis[0].data = getday(clickMonth+'月');
                    for(var i = 0; i < selectedCity.length;i ++){
                        options.series[i].data = getdaysdata();
                    }
                    options.dataZoom[0].start = 0;
                    options.dataZoom[0].end = 100;
                    myChart4.clear();
                    myChart4.setOption(options)
                }else{
    				// 获取当前点击年份
    				var clickMonth = xIndex + 1997;
    				options.xAxis[0].data = month;
                    for(var i = 0; i < selectedCity.length;i ++){
                        options.series[i].data = getmonthsdata();
                    }
    				options.dataZoom[0].start = 0;
    				options.dataZoom[0].end = 100;
    				myChart4.clear();
    				myChart4.setOption(options)
    			}
    		}

    	}
    });

    /*获取选择的地点，并赋予到查询表的图例中*/
    myChart3.on('mapselectchanged',function(params){
    	selectedCity = []; // 清空数组
    	var citys = params.batch[0].selected;
    	var keys = Object.keys(citys);
    	for(var i = 0; i < keys.length;i ++){
    		if(citys[keys[i]] == true){
    			selectedCity.push(keys[i]);
    		}
    	}
    	var options = myChart4.getOption();
    	options.legend[0].data = selectedCity;	
    	// 加载数据
    	var dataIndex = options.xAxis[0].data;
    	options.series = []; // 先清空
    	if(dataIndex[0].indexOf('号')!=-1){
    		for(var i = 0; i < selectedCity.length;i ++){
    			options.series.push({name:'',type:'',data:''});
    			options.series[i].name = selectedCity[i];
    			options.series[i].type = 'bar';
    			options.series[i].data = getdaysdata(selectedCity[i]);
    		}
    	}else if (dataIndex[0].indexOf('月')!=-1){
    		for(var i = 0; i < selectedCity.length;i ++){
    			options.series.push({name:'',type:'',data:''});
    			console.log(selectedCity);
    			options.series[i].name = selectedCity[i];
    			options.series[i].type = 'bar';
    			options.series[i].data = getmonthsdata(selectedCity[i]);
    		}
    	}else{
    		for(var i = 0; i < selectedCity.length;i ++){
    			options.series.push({name:'',type:'',data:''});
    			options.series[i].name = selectedCity[i];
    			options.series[i].type = 'bar';
    			options.series[i].data = getyearsdata(selectedCity[i]);
    		}
    	}
    	myChart4.clear();
    	myChart4.setOption(options);
    });
	
// 放大方法
	$('.close-pop').on('click', function () {
		$(this).parent().parent().hide().find('.cont-div').attr('style', 'visibility: hidden');
	})

	$('#tohistory').on('click', function () {
		$('.container').attr('style', 'visibility: visible').find('.pop-up').eq(3).attr('style', 'visibility: visible').siblings().attr('style', 'visibility: hidden');
	})
