$(function () {
    // ===================================== スケジュール定義 start =====================================
	var schedule1 = {
		id : 1,
        start : 32400,
        end : 43200,
        text : 'schedule1',
        data : {}
    }

	var schedule2 = {
		id : 2,
        start : 54000,
        end : 57600,
        text : 'schedule2',
        data : {}
    }

	var schedule3 = {
		id : 3,
        start : 57600,
        end : 61200,
        text : 'schedule3',
        data : {}
    }
    // ===================================== スケジュール定義  end  =====================================

    // ===================================== スケジュール項目一覧定義 start =====================================
	var scheduleList1 = [
        schedule1,
        schedule2
    ]

	var scheduleList2 = [
        schedule3
    ]

	var rows = {
		'1' : {
			title : '工程1',
			schedule: scheduleList1
		},
		'2' : {
			title : '工程2',
			schedule: scheduleList2
		}
	}
    // ===================================== スケジュール項目一覧定義  end  =====================================

    // ===================================== イベントハンドラ定義 start =====================================
    // スケジュール変更イベント
    var scheduleChange = function(scheduleData){

		$().updRow(scheduleData);
    }

    // スケジュールクリックイベント
    var scheduleClick = function(scheduleData){

		// クリック時に時間（秒）をbase.jsにて定義しているグローバル変数に渡す
		gl_scheduleData = scheduleData;
    }
    // ===================================== イベントハンドラ定義  end  =====================================

	// スケジューラー定義
    var $sc = $("#schedule").timeSchedule({
        startTime: 0,
        endTime: 86400,
        widthTime: 60 * 30,
        timeLineY: 60,
        verticalScrollbar:0,
        rows : rows,
        change: function(node, scheduleData){
            scheduleChange(scheduleData);
        },
        click: function(node, scheduleData, timeline, timelineList){
            scheduleClick(scheduleData);

//			$sc.addScheduleData(schedule4);
//			$sc.resetBarPosition(schedule4.timeline);

//			var test = $sc.getScheduleData();
//			console.log(test);
//
//			var test2 = $sc.getScheduleDataById(10);
//			console.log(test2);


//			$sc.editScheduleData(10,schedule4);
//			$sc.resetBarPosition(schedule4.timeline);

//			console.log($sc.getScheduleNode(10));
//			console.log(node);

        }
    });

    $.fn.getScheduleData = function(){
        return $sc.getScheduleData()
    }

    // ダイアログのデータからスケジュールを変更する
    $.fn.editSchedule = function(){

		// ① 元のスケジュールの時間を変更する
		gl_scheduleData.start = $().time2second($("#cut1StartHour").val() + ":" + $("#cut1StartMinute").val());
		gl_scheduleData.end = $().time2second($("#cut1EndHour").val() + ":" + $("#cut1EndMinute").val());

		// データベースの変更
		$().updRow(gl_scheduleData);

		$sc.rewriteBarText(gl_scheduleData);
		$sc.rewriteBarWidth(gl_scheduleData);

		var newId = $().getNewId();
		var start = $().time2second($("#cut2StartHour").val() + ":" + $("#cut2StartMinute").val());
		var end = $().time2second($("#cut2EndHour").val() + ":" + $("#cut2EndMinute").val());

		var tmpSchedule = {
			id : newId,
	        timeline: gl_scheduleData.timeline,
	        start: start,
	        end: end,
	        text:'schedule' + newId,
	        no:newId,
	        data:{}
	    }

		// データベースの登録
		$().insRow(tmpSchedule, gl_scheduleData.id);

		// タイムラインの登録
		tmpSchedule.start = start;
		tmpSchedule.end = end;

		$sc.addScheduleData(tmpSchedule);

		// 再描画
		$sc.resetBarPosition(tmpSchedule.timeline);
    }

});
