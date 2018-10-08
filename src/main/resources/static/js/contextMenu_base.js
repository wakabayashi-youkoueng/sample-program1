$(function () {

	var edit = {name: "編集", icon: "edit"}
	var cut = {name: "分割", icon: "cut"}

	var itemList = {
       "edit": edit,
       "cut": cut
	}

	$.contextMenu({
        selector: '.sc_Bar',
        callback: function(key, options) {

            switch (key) {
                case "edit":
                    break;

                case "cut":

					// 分割の場合、開始時分と終了時分を見て、真ん中の時間で分割する
					var middleTime = gl_scheduleData.start + ((gl_scheduleData.end - gl_scheduleData.start) / 2);
					var middleHour = $().second2hour(middleTime);
					var middleMinute = $().second2min(middleTime);

				    var cut1StartHour = $().second2hour(gl_scheduleData.start);
				    var cut1StartMinute = $().second2min(gl_scheduleData.start);

				    var cut1EndHour = $().second2hour(gl_scheduleData.end);
				    var cut1EndMinute = $().second2min(gl_scheduleData.end);

				    var cut2StartHour = $().second2hour(gl_scheduleData.start);
				    var cut2StartMinute = $().second2min(gl_scheduleData.start);

				    var cut2EndHour = $().second2hour(gl_scheduleData.end);
				    var cut2EndMinute = $().second2min(gl_scheduleData.end);

					// ダイアログの値に選択したスケジュールの値を渡す
					$("#cut1StartHour").val(cut1StartHour);
					$("#cut1StartMinute").val(cut1StartMinute);
					$("#cut1EndHour").val(middleHour);
					$("#cut1EndMinute").val(middleMinute);

					$("#cut2StartHour").val(middleHour);
					$("#cut2StartMinute").val(middleMinute);
					$("#cut2EndHour").val(cut2EndHour);
					$("#cut2EndMinute").val(cut2EndMinute);

                    $("#cutSchedule").dialog("open");

                    break;
            }
        },
        items:itemList
    });
});