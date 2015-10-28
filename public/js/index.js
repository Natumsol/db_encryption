$(function(){
	$("#search1").click(function () {
	$.ajax({
		url: "/search1",
		type: "post",
		dataType: "json",
		data: {
			keyword: $("#keyword1").val().trim()
		},
		success: function (data) {
			// load a template file, then render it with data
			new EJS({ url: '/list.ejs' }).update('result1', data);
             var chart = $('#charts').highcharts();
            chart.series[0].addPoint(data.time);
		}
	});
});

$("#search2").click(function () {
	$.ajax({
		url: "/search1",
		type: "post",
		dataType: "json",
		data: {
			keyword: $("#keyword2").val().trim()
		},
		success: function (data) {
			// load a template file, then render it with data
			new EJS({ url: '/list.ejs' }).update('result2', data)
		}
	});
});
$('#charts').highcharts({
        title: {
            text: "字符串查询性能对比图",
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories: ['1', '2', '3', '4', '5', '6',
                '7', '8', '9', '10', '11', '12']
        },
        yAxis: {
            title: {
                text: '耗时(ms)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: '二次查询',
            data: []
        }, {
            name: '全文查询',
            data: []
        }]
    });
});

