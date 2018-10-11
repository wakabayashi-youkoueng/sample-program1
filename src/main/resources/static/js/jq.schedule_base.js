$(function () {
	// ===================================== スケジュール項目一覧定義 start =====================================
	var rows = {
		'1' : {
			title : '工程1'
		},
		'2' : {
			title : '工程2'
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
  $sc = $("#schedule").timeSchedule({
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
//			$().updRow(gl_scheduleData);

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
//			$().insRow(tmpSchedule, gl_scheduleData.id);

			// タイムラインの登録
			tmpSchedule.start = start;
			tmpSchedule.end = end;

			$sc.addScheduleData(tmpSchedule);

			// 再描画
			$sc.resetBarPosition(tmpSchedule.timeline);
    }
});
