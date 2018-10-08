
(function($) {
    $.fn.timeSchedule = function(options){
        var defaults = {
            rows : {},
            startTime: 0,
            endTime: 86400,
            widthTimeX:25,		// 1cell辺りの幅(px)
            widthTime:600,		// 区切り時間(秒)
            timeLineY:50,		// timeline height(px)
            timeLineBorder:1,	// timeline height border
            timeBorder:1,		// border width
            timeLinePaddingTop:0,
            timeLinePaddingBottom:0,
            headTimeBorder:1,	// time border width
            dataWidth:160,		// data width
            verticalScrollbar:0,	// vertical scrollbar width
            // event
            init_data: null,
            change: null,
            click: null,
            append: null,
            time_click: null,
            debug:""			// debug selecter
        };

		//  「秒」を「時：分」に変更する処理
        this.formatTime = function(sec) {
            var h = "" + (sec/36000|0) + (sec/3600%10|0);
            var m = "" + (sec%3600/600|0) + (sec%3600/60%10|0);
            var string = h + ":" + m;
            return string;
        };

		//  「時：分」を「秒」に変更する処理
        this.formatSec = function(time) {
			var arrTime = time.split(':');
		    var h = arrTime[0];
		    var m = arrTime[1];
		    return (Number(h) + (Number(m) / 60)) * 60 * 60;
        };

        var setting = $.extend(defaults, options);
        this.setting = setting;

        var scheduleData = new Array();
        var timelineData = new Array();

        var $element = $(this);
        var element = (this);

        var tableStartTime = setting.startTime;
        var tableEndTime = setting.endTime;

        var currentNode = null;
        tableStartTime -= (tableStartTime % setting.widthTime);
        tableEndTime -= (tableEndTime % setting.widthTime);

		// スケジュールデータ一括取得
        this.getScheduleData = function(){

            return scheduleData;
        }

		// スケジュールデータをidで取得
        this.getScheduleDataById = function(id){

			var data;

			$.each(scheduleData, function (index, value) {
				if(value.id == id){
					data = value;
					return false;
				}
			});

            return data;
        }

		// タイムラインデータの取得
        this.getTimelineData = function(){

            return timelineData;
        }

        // 現在のタイムライン番号を取得
        this.getTimeLineNumber = function(top){
            var num = 0;
            var n = 0;
            var tn = Math.ceil(top / (setting.timeLineY + setting.timeLinePaddingTop + setting.timeLinePaddingBottom));
            for(var i in setting.rows){
                var r = setting.rows[i];
                var tr = 0;
                if(typeof r["schedule"] == Object){
                    tr = r["schedule"].length;
                }
                if(currentNode && currentNode["timeline"]){
                    tr ++;
                }
                n += Math.max(tr,1);
                if(n >= tn){
                    break;
                }
                num ++;
            }
            return num;
        }

        // 対象タイムラインのスケジュール数の取得
        this.getScheduleCount = function(timeline){
            var num = 0;
            for(var i in scheduleData){
                if(scheduleData[i]["timeline"] == timeline){
                    num ++;
                }
            }
            return num;
        }

		// idからスケジュールnodeを取得
		this.getScheduleNode = function(id){

			return $("#schedule_"+id);
		}


        // 背景データ追加
        this.addScheduleBgData = function(data){
            var st = Math.ceil((data["start"] - tableStartTime) / setting.widthTime);
            var et = Math.floor((data["end"] - tableStartTime) / setting.widthTime);
            var $bar = $('<div class="sc_bgBar"><span class="text"></span></div>');
            var stext = element.formatTime(data["start"]);
            var etext = element.formatTime(data["end"]);
            var snum = element.getScheduleCount(data["timeline"]);
            $bar.css({
                left : (st * setting.widthTimeX),
                top : 0,
                width : ((et - st) * setting.widthTimeX),
                height : $element.find('.sc_main .timeline').eq(data["timeline"]).height()
            });
            if(data["text"]){
                $bar.find(".text").text(data["text"]);
            }
            if(data["class"]){
                $bar.addClass(data["class"]);
            }
            //$element.find('.sc_main').append($bar);
            $element.find('.sc_main .timeline').eq(data["timeline"]).append($bar);
        }

        // タイムラインの追加
        this.addRow = function(timeline,row){
            var title = row["title"];
            var id = $element.find('.sc_main .timeline').length;

            var html;

            html = '';
            html += '<div class="timeline"><span>'+title+'</span></div>';
            var $data = $(html);
            // event call
            if(setting.init_data){
                setting.init_data($data,row);
            }
            $element.find('.sc_data_scroll').append($data);

            html = '';
            html += '<div class="timeline"></div>';
            var $timeline = $(html);
            for(var t=tableStartTime;t<tableEndTime;t+=setting.widthTime){
                var $tl = $('<div class="tl"></div>');
                $tl.width(setting.widthTimeX - setting.timeBorder);

                $tl.data("time",element.formatTime(t));
                $tl.data("timeline",timeline);
                $timeline.append($tl);
            }

            // クリックイベント
            if(setting.time_click){
                $timeline.find(".tl").click(function(){
                    setting.time_click(this, $(this).data("time"), $(this).data("timeline"), timelineData[$(this).data("timeline")]);
                });
            }
            $element.find('.sc_main').append($timeline);

            timelineData[timeline] = row;

            if(row["class"] && (row["class"] != "")){
                $element.find('.sc_data .timeline').eq(id).addClass(row["class"]);
                $element.find('.sc_main .timeline').eq(id).addClass(row["class"]);
            }

            // スケジュールタイムライン
            if(row["schedule"]){
                for(var i in row["schedule"]){

                    var bdata = row["schedule"][i];

                    var data = {};
                    data["id"] = bdata["id"];
                    data["timeline"] = id;

                    data["start"] = bdata["start"];
                    data["end"] = bdata["end"];

                    if(bdata["text"]){
                        data["text"] = bdata["text"];
                    }
                    data["data"] = {};
                    if(bdata["data"]){
                        data["data"] = bdata["data"];
                    }
                    element.addScheduleData(data);
                }
            }

            // 高さの調整
            element.resetBarPosition(id);
            $element.find('.sc_main .timeline').eq(id).droppable({
                accept: ".sc_Bar",
                drop: function(ev, ui) {
                    var node = ui.draggable;
                    var sc_key = node.data("sc_key");
                    var nowTimelineNum = scheduleData[sc_key]["timeline"];
                    var timelineNum = $element.find('.sc_main .timeline').index(this);
                    // タイムラインの変更
                    scheduleData[sc_key]["timeline"] = timelineNum;
                    node.appendTo(this);
                    // 高さ調整
                    element.resetBarPosition(nowTimelineNum);
                    element.resetBarPosition(timelineNum);
                }
            });
            // コールバックがセットされていたら呼出
            if(setting.append){
                $element.find('.sc_main .timeline').eq(id).find(".sc_Bar").each(function(){
                    var node = $(this);
                    var sc_key = node.data("sc_key");
                    setting.append(node, scheduleData[sc_key]);
                });
            }
        }

        // スケジュール追加
        this.addScheduleData = function(data){

            var st = Math.ceil((data["start"] - tableStartTime) / setting.widthTime);
            var et = Math.floor((data["end"] - tableStartTime) / setting.widthTime);
            var $bar = $('<div id="schedule_' + data["id"] + '" class="sc_Bar"><div class="head"><div class="time"></div></div><span class="text"></span></div>');

            // 「時：分」の形に修正
            var stext = element.formatTime(data["start"]);
            var etext = element.formatTime(data["end"]);
            var snum = element.getScheduleCount(data["timeline"]);

            $bar.css({
                left : (st * setting.widthTimeX),
                top : ((snum * setting.timeLineY) + setting.timeLinePaddingTop),
                width : ((et - st) * setting.widthTimeX),
                height : (setting.timeLineY)
            });

			// 時間を編集
            $bar.find(".time").html("<p>" + stext + " - " + etext + "</p>");

            if(data["text"]){
                $bar.find(".text").text(data["text"]);
            }

            if(data["class"]){
                $bar.addClass(data["class"]);
            }

            $element.find('.sc_main .timeline').eq(data["timeline"]).append($bar);

            // データの追加
            scheduleData.push(data);

            // key
            var key = scheduleData.length - 1;
            $bar.data("sc_key",key);

            $bar.bind("mouseup",function(){
                // コールバックがセットされていたら呼出
                if(setting.click){
                    if($(this).data("dragCheck") !== true && $(this).data("resizeCheck") !== true){
                        var node = $(this);
                        var sc_key = node.data("sc_key");
                        setting.click(node, scheduleData[sc_key]);
                    }
                }
            });

            var $node = $element.find(".sc_Bar");

            $node.draggable({
                grid: [ setting.widthTimeX, 1 ],
                containment: ".sc_main",
                helper : 'original',
                start: function(event, ui) {
                    var node = {};
                    node["node"] = this;
                    node["offsetTop"] = ui.position.top;
                    node["offsetLeft"] = ui.position.left;
                    node["currentTop"] = ui.position.top;
                    node["currentLeft"] = ui.position.left;
                    node["timeline"] = element.getTimeLineNumber(ui.position.top);
                    node["nowTimeline"] = node["timeline"];
                    currentNode = node;
                },
                drag: function(event, ui) {
                    // drag時の処理
                    $(this).data("dragCheck",true);
                    if(!currentNode){
                        return false;
                    }
                    var $moveNode = $(this);
                    var sc_key = $moveNode.data("sc_key");
                    var originalTop = ui.originalPosition.top;
                    var originalLeft = ui.originalPosition.left;
                    var positionTop = ui.position.top;
                    var positionLeft = ui.position.left;
                    var timelineNum = element.getTimeLineNumber(ui.position.top);

                    // 位置の修正
                    ui.position.left = Math.floor(ui.position.left / setting.widthTimeX) * setting.widthTimeX;

                    if(currentNode["nowTimeline"] != timelineNum){
                        // 現在のタイムライン
                        currentNode["nowTimeline"] = timelineNum;
                    }

                    currentNode["currentTop"] = ui.position.top;
                    currentNode["currentLeft"] = ui.position.left;

                    // 時間変更
                    element.rewriteBarText(scheduleData[sc_key]);
                    return true;
                },
                // 要素の移動が終った後の処理
                stop: function(event, ui) {
                    $(this).data("dragCheck",false);
                    currentNode = null;

                    var node = $(this);
                    var sc_key = node.data("sc_key");
                    var x = node.position().left;
                    var w = node.width();

                    var start = tableStartTime + (Math.floor(x / setting.widthTimeX) * setting.widthTime);
                    var end = start + ((scheduleData[sc_key]["end"] - scheduleData[sc_key]["start"]));

                    scheduleData[sc_key]["start"] = start;
                    scheduleData[sc_key]["end"] = end;


                    // コールバックがセットされていたら呼出
                    if(setting.change){
                        setting.change(node, scheduleData[sc_key]);
                    }
                }
            });
            $node.resizable({
                handles:'e',
                grid: [ setting.widthTimeX, setting.timeLineY ],
                minWidth:setting.widthTimeX,
                start: function(event, ui){
                    var node = $(this);
                    node.data("resizeCheck",true);
                },
                // 要素の移動が終った後の処理
                stop: function(event, ui){
                    var node = $(this);
                    var sc_key = node.data("sc_key");

                    var x = node.position().left;
                    var w = node.width();
                    var start = tableStartTime + (Math.floor(x / setting.widthTimeX) * setting.widthTime);
                    var end = tableStartTime + (Math.floor((x + w) / setting.widthTimeX) * setting.widthTime);
                    var timelineNum = scheduleData[sc_key]["timeline"];

                    scheduleData[sc_key]["start"] = start;
                    scheduleData[sc_key]["end"] = end;

                    // 高さ調整
                    element.resetBarPosition(timelineNum);
                    // 時間変更
                    element.rewriteBarText(scheduleData[sc_key]);

                    node.data("resizeCheck",false);
                    // コールバックがセットされていたら呼出
                    if(setting.change){
                        setting.change(node, scheduleData[sc_key]);
                    }
                }
            });
            return key;
        }


        // スケジュールの時間の変更
        this.rewriteBarText = function(data){

            // idからnodeを取得
			var node = this.getScheduleNode(data["id"]);

            var x = node.position().left;
            var w = node.width();

			// 時間を取得
            var start = tableStartTime + (Math.floor(x / setting.widthTimeX) * setting.widthTime);
            var end = start + (data["end"] - data["start"]);

            var html = element.formatTime(start)+"-"+element.formatTime(end);
            $(node).find(".time").html(html);
        }

		// スケジュールの幅変更
		this.rewriteBarWidth = function(data){

            // idからnodeを取得
			var node = this.getScheduleNode(data["id"]);

            var x = node.position().left;
            var w = node.width();

			// 終了時間から長さを逆算
			var tmpWidth = ((data.end  - tableStartTime) / setting.widthTime * setting.widthTimeX) - x;
            $(node).width(tmpWidth);
		}


        // 再描画
        this.resetBarPosition = function(timeline){
            // 要素の並び替え
            var $bar_list = $element.find('.sc_main .timeline').eq(timeline).find(".sc_Bar");
            var codes = [];
            for(var i=0;i<$bar_list.length;i++){
                codes[i] = {code:i,x:$($bar_list[i]).position().left};
            };
            // ソート
            codes.sort(function(a,b){
                if(a["x"] < b["x"]){
                    return -1;
                }else if(a["x"] > b["x"]){
                    return 1;
                }
                return 0;
            });
            var check = [];
            var h = 0;
            var $e1,$e2;
            var c1,c2;
            var s1,e1,s2,e2;
            for(var i=0;i<codes.length;i++){
                c1 = codes[i]["code"];
                $e1 = $($bar_list[c1]);
                for(h=0;h<check.length;h++){
                    var next = false;
                    L: for(var j=0;j<check[h].length;j++){
                        c2 = check[h][j];
                        $e2 = $($bar_list[c2]);

                        s1 = $e1.position().left;
                        e1 = $e1.position().left + $e1.width();
                        s2 = $e2.position().left;
                        e2 = $e2.position().left + $e2.width();
                        if(s1 < e2 && e1 > s2){
                            next = true;
                            continue L;
                        }
                    }
                    if(!next){
                        break;
                    }
                }
                if(!check[h]){
                    check[h] = [];
                }
                $e1.css({top:((h * setting.timeLineY) + setting.timeLinePaddingTop)});
                check[h][check[h].length] = c1;
            }
            // 高さの調整
            this.resizeRow(timeline, check.length);
        }

        this.resizeRow = function(timeline, height){
            var h = Math.max(height,1);
            $element.find('.sc_data .timeline').eq(timeline).height((h * setting.timeLineY) - setting.timeLineBorder + setting.timeLinePaddingTop + setting.timeLinePaddingBottom);
            $element.find('.sc_main .timeline').eq(timeline).height((h * setting.timeLineY) - setting.timeLineBorder + setting.timeLinePaddingTop + setting.timeLinePaddingBottom);

            $element.find('.sc_main .timeline').eq(timeline).find(".sc_bgBar").each(function(){
                $(this).height($(this).closest(".timeline").height());
            });

            $element.find(".sc_data").height($element.find(".sc_main_box").height());
        }

        // resizeWindow
        this.resizeWindow = function(){
            var sc_width = $element.width();
            var sc_main_width = sc_width - setting.dataWidth - (setting.verticalScrollbar);
            var cell_num = Math.floor((tableEndTime - tableStartTime) / setting.widthTime);
            $element.find(".sc_header_cell").width(setting.dataWidth);
            $element.find(".sc_data,.sc_data_scroll").width(setting.dataWidth);
            $element.find(".sc_header").width(sc_main_width);
            $element.find(".sc_main_box").width(sc_main_width);
            $element.find(".sc_header_scroll").width(setting.widthTimeX*cell_num);
            $element.find(".sc_main_scroll").width(setting.widthTimeX*cell_num);
        }

        // init
        this.init = function(){
            var html = '';
            html += '<div class="sc_menu">'+"\n";
            html += '<div class="sc_header_cell"><span>&nbsp;</span></div>'+"\n";
            html += '<div class="sc_header">'+"\n";
            html += '<div class="sc_header_scroll">'+"\n";
            html += '</div>'+"\n";
            html += '</div>'+"\n";
            html += '<br class="clear" />'+"\n";
            html += '</div>'+"\n";
            html += '<div class="sc_wrapper">'+"\n";
            html += '<div class="sc_data">'+"\n";
            html += '<div class="sc_data_scroll">'+"\n";
            html += '</div>'+"\n";
            html += '</div>'+"\n";
            html += '<div class="sc_main_box">'+"\n";
            html += '<div class="sc_main_scroll">'+"\n";
            html += '<div class="sc_main">'+"\n";
            html += '</div>'+"\n";
            html += '</div>'+"\n";
            html += '</div>'+"\n";
            html += '<br class="clear" />'+"\n";
            html += '</div>'+"\n";

            $element.append(html);

            $element.find(".sc_main_box").scroll(function(){
                $element.find(".sc_data_scroll").css("top", $(this).scrollTop() * -1);
                $element.find(".sc_header_scroll").css("left", $(this).scrollLeft() * -1);

            });
            // add time cell
            var cell_num = Math.floor((tableEndTime - tableStartTime) / setting.widthTime);
            var before_time = -1;
            for(var t=tableStartTime;t<tableEndTime;t+=setting.widthTime){

                if(
                    (before_time < 0) ||
                        (Math.floor(before_time / 3600) != Math.floor(t / 3600))){
                    var html = '';
                    html += '<div class="sc_time">'+element.formatTime(t)+'</div>';
                    var $time = $(html);
                    var cell_num = Math.floor(Number(Math.min((Math.ceil((t + setting.widthTime) / 3600) * 3600),tableEndTime) - t) / setting.widthTime);
                    $time.width((cell_num * setting.widthTimeX) - setting.headTimeBorder);
                    $element.find(".sc_header_scroll").append($time);

                    before_time = t;
                }
            }

            $(window).resize(function(){
                element.resizeWindow();
            }).trigger("resize");

            // addrow
            for(var i in setting.rows){
                this.addRow(i,setting.rows[i]);
            }
        }

        // 初期化
        this.init();

        this.debug = function(){
            var html = '';
            for(var i in scheduleData){
                html += '<div>';

                html += i+" : ";
                var d = scheduleData[i];
                for(var n in d){
                    var dd = d[n];
                    html += n+" "+dd;
                }

                html += '</div>';
            }
            $(setting.debug).html(html);
        }

        if(setting.debug && setting.debug != ""){
            setInterval(function(){
                element.debug();
            },10);
        }

        return(this);
    };
})(jQuery);
