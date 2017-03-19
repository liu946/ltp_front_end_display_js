/*
drawing flows data curves
*/
function loadFlows(flowsData, text, time, xcate, xtitle, total_flow) {
    $(function() {
        $('#container_traffic').highcharts({
            title: {
                text: text,
                x: -20 //center
            },
            subtitle: {
                text: 'Time: ' + time +  ' | Total Flows: ' + total_flow + ' Bytes',
                x: -20
            },
            xAxis: {
                categories: xcate,
                title: {
                    text: xtitle
                },
            },
            yAxis: {
                title: {
                    text: '字节'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'Bytes'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Flows',
                data: flowsData
            }]
        });
    });
}

/*
drawing requests data curves
*/
function loadRequests(requestsData, text, time, xcate, xtitle, total_request) {
    $(function() {
        $('#container_request').highcharts({
            title: {
                text: text,
                x: -20 //center
            },
            subtitle: {
                text: 'Time: ' + time + ' | Total Requests: ' + total_request + ' Requests',
                x: -20
            },
            xAxis: {
                categories: xcate,
                title: {
                    text: xtitle
                },
            },
            yAxis: {
                title: {
                    text: '请求'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'Requests'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Requests',
                data: requestsData
            }]
        });
    });
}

function load_graph(times){
    var dis_day = document.getElementById("show_day").style.display;
    var dis_month = document.getElementById("show_month").style.display;
    var dis_year = document.getElementById("show_year").style.display;
    var date_time = getdate();
    var type = 0;
    var text_traffic = 'Day Flows Statistics';
    var text_req = 'Day Requests Statistics';
    var xcate = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
    var xtitle = "时";

    if (times != 1) {
        if (dis_day != "none") {
            date_time = document.getElementById("id_time_0").value;
            if (date_time.length == 0 || !isDate(date_time)) {
                alert("日期不符合规范");
                return;
            }
        }
        else if (dis_month != "none") {
            date_time = document.getElementById("id_time_1").value;
            if (date_time.length == 0 || !isMonth(date_time)) {
                alert("日期不符合规范");
                return;
            }
            text_traffic = 'Month Flows Statistics';
            text_req = 'Month Requests Statistics';
            xcate = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
            xtitle = "天";
            type = 1;
        }
        else if (dis_year != "none") {
            date_time = document.getElementById("id_time_2").value;
            if (date_time.length == 0 || !isYear(date_time)) {
                alert("日期不符合规范");
                return;
            }
            text_traffic = 'Year Flows Statistics';
            text_req = 'Year Requests Statistics';
            xcate = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            xtitle = "月";
            type = 2;
        }
    }
    $.ajax({
        type: "get",
        dataType: "json",
        url: "/dashboard/traffics/proxy/",
        beforeSend:function(){
            $("#container_traffic").empty();
            $("#container_traffic_loading").show();
            $("#container_request").empty();
            $("#container_request_loading").show();
        },
        data: {
            date_time : date_time,
            date_type : type
        },
        success: function(msg) {
            $("#container_traffic_loading").hide();
            $("#container_request_loading").hide();
            loadFlows(msg["traffic_data"], text_traffic, date_time, xcate, xtitle, msg["total_traffic"]);
            loadRequests(msg["request_data"], text_req, date_time, xcate, xtitle, msg["total_request"]);
        },
        error: function(msg) {
            $("#container_traffic_loading").hide();
            $("#container_request_loading").hide();
            error_message = JSON.parse(msg.responseText);
            alert(error_message['error_message']);
        },
    });
}

$(document).ready(function() {
    $("#choose_day").click(function() {
        $("#show_year").hide();
        $("#show_month").hide();
        $("#show_day").show();
    });
    $("#choose_month").click(function() {
        $("#show_year").hide();
        $("#show_day").hide();
        $("#show_month").show();
    });
    $("#choose_year").click(function() {
        $("#show_month").hide();
        $("#show_day").hide();
        $("#show_year").show();
    });
    $("#log_search").click(function() {
        time_from = document.getElementById("id_time_from").value;
        time_to = document.getElementById("id_time_to").value;
        if (time_from.length == 0 || !isDate(time_from) || time_to.length == 0 || !isDate(time_to)) {
            alert("日期不符合规范");
            return;
        }
        window.location.href = '/dashboard/records/?time_from=' + time_from + '&time_to=' + time_to;
    });
    $("#jumpto_log").click(function() {
        time_from = document.getElementById("hidden_time_from").value;
        time_to = document.getElementById("hidden_time_to").value;
        current_page = document.getElementById("current_page").value;
        page_size = document.getElementById("page_size").value;
        if (current_page.length != 0 && isNotNumber(current_page) || page_size.length != 0 && isNotNumber(page_size)) {
            alert("跳转参数不合法");
        } else {
            window.location.href = '/dashboard/records/?time_from=' + time_from + '&time_to=' + time_to + '&current_page=' + current_page + '&page_size=' + page_size;
        }
    });
    $("#flows_search").click(function() {
        load_graph(2);
    });
});
