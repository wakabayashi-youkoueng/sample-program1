
var gl_scheduleData;

$(function () {

    // ===================================== tabulatorへの反映 start =====================================

	var scheduleList = $().getScheduleData();

	$.each(scheduleList, function (index, value) {
		value['no'] = index + 1;
		$("#testTable").tabulator("addRow", scheduleList[index]);
	});

    // ===================================== tabulatorへの反映  end  =====================================

    // 入力ダイアログを定義
    $("#cutSchedule").dialog({
        title:"スケジュールの変更",
        autoOpen: false,
        modal: true,
        resizable: false,
        height: 360,
        width: 400,
        open: function(event, ui){
			// 閉じるボタンを非表示
            $(".ui-dialog-titlebar-close").hide();
        },
        buttons: {
            "OK": function() {
                // 分割後のスケジュールを登録する

				// エラーチェック
				var cut1Start = $().time2second($("#cut1StartHour").val() + ":" + $("#cut1StartMinute").val());
				var cut1End = $().time2second($("#cut1EndHour").val() + ":" + $("#cut1EndMinute").val());
				var cut2Start = $().time2second($("#cut2StartHour").val() + ":" + $("#cut2StartMinute").val());
				var cut2End = $().time2second($("#cut2EndHour").val() + ":" + $("#cut2EndMinute").val());

				var error = false;
				$("#error1").empty();
				$("#error2").empty();

				if(cut1Start >= cut1End){

					$("#error1").html("<p class='red'>開始・終了時間が不正です</p>");
					error = true;
				}

				if(cut2Start >= cut2End){
					$("#error2").html("<p class='red'>開始・終了時間が不正です</p>");
					error = true;
				}

				if(error) return;

				// ダイアログのデータからスケジュールを変更する
				$().editSchedule();

                $(this).dialog("close");
            },
            "キャンセル": function() {
                $(this).dialog("close");
            }
        }
    });
});


// 「秒」を「時：分」に変換する処理(30分区切り)
$.fn.second2time = function(second) {
    var min = $().second2min(second);
    var hour = $().second2hour(second);
    return hour + ":" + min;
}

// 「秒」を「分」に変換する処理(30分区切り)
$.fn.second2min = function(second) {
    var min = Math.floor(second / 60) % 60;
    var min = Math.floor(min / 30) * 30;
	return ("00" + min).slice(-2);
}

// 「秒」を「時間」に変換する処理
$.fn.second2hour = function(second) {
    var hour = Math.floor(second / 3600);
	return ("00" + hour).slice(-2);
}


// 「時：分」を「秒」に変更する処理
$.fn.time2second = function(time) {
	var arrTime = time.split(':');
    var h = arrTime[0];
    var m = arrTime[1];
    return (Number(h) + (Number(m) / 60)) * 60 * 60;
};
