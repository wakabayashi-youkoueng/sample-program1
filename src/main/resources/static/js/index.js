$(function () {
  // ===================================== 時間コンボボックスの作成 start =====================================
  for (var i = 0; i < 24; i++) {
    num = ("00" + i).slice(-2);
    $("#cut1StartHour").append($('<option>', {
      value: num,
      text: num
    }));
    $("#cut1EndHour").append($('<option>', {
      value: num,
      text: num
    }));
    $("#cut2StartHour").append($('<option>', {
      value: num,
      text: num
    }));
    $("#cut2EndHour").append($('<option>', {
      value: num,
      text: num
    }));
  }
  $("#cut1StartMinute").append($('<option>').val("00").text("00"));
  $("#cut1EndMinute").append($('<option>').val("00").text("00"));
  $("#cut2StartMinute").append($('<option>').val("00").text("00"));
  $("#cut2EndMinute").append($('<option>').val("00").text("00"));
  $("#cut1StartMinute").append($('<option>').val("30").text("30"));
  $("#cut1EndMinute").append($('<option>').val("30").text("30"));
  $("#cut2StartMinute").append($('<option>').val("30").text("30"));
  $("#cut2EndMinute").append($('<option>').val("30").text("30"));
  // ===================================== 時間コンボボックスの作成  end  =====================================

  // 入力ダイアログを定義
  $("#cutSchedule").dialog({
    title: "スケジュールの変更",
    autoOpen: false,
    modal: true,
    resizable: false,
    height: 320,
    width: 360,
    open: function (event, ui) {
      // 閉じるボタンを非表示
      $(".ui-dialog-titlebar-close").hide();
    },
    buttons: {
      "OK": function () {
        // 分割後のスケジュールを登録する
        // エラーチェック
        var cut1Start = $().time2second($("#cut1StartHour").val() + ":" + $("#cut1StartMinute").val());
        var cut1End = $().time2second($("#cut1EndHour").val() + ":" + $("#cut1EndMinute").val());
        var cut2Start = $().time2second($("#cut2StartHour").val() + ":" + $("#cut2StartMinute").val());
        var cut2End = $().time2second($("#cut2EndHour").val() + ":" + $("#cut2EndMinute").val());

        var error = false;
        $("#error1").empty();
        $("#error2").empty();

        if (cut1Start >= cut1End) {
          $("#error1").html("<p class='red'>開始・終了時間が不正です</p>");
          error = true;
        }
        if (cut2Start >= cut2End) {
          $("#error2").html("<p class='red'>開始・終了時間が不正です</p>");
          error = true;
        }

        if (error) return;

        // ダイアログのデータからスケジュールを変更する
        $editSchedule();

        $(this).dialog("close");
      },
      "キャンセル": function () {
        $(this).dialog("close");
      }
    }
  });
  // ===================================== スケジュール項目一覧定義 start =====================================
  var rows = {
    '1': {
      title: '工程1'
    },
    '2': {
      title: '工程2'
    }
  }
  // ===================================== スケジュール項目一覧定義  end  =====================================

  // スケジューラー定義
  var $sc = $("#schedule").timeSchedule({
    startTime: 0,
    endTime: 86400,
    widthTime: 60 * 30,
    timeLineY: 60,
    verticalScrollbar: 0,
    rows: rows,
    change: function (node, scheduleData) {
      // 通信実行
      $.ajax({
        type: "post",
        url: "/updSchedule",
        data: JSON.stringify(scheduleData),
        contentType: 'application/json',
        dataType: "json"
      }).then(function (json_data) {
        // 成功時の処理
        $sc.rewriteBarText(scheduleData);
        $sc.rewriteBarWidth(scheduleData);
        // 再描画
        $sc.resetBarPosition(scheduleData.timeline);
      }, function () {
        // 失敗時の処理
        console.log("失敗しました");
      });
    },
    click: function (node, scheduleData, timeline, timelineList) {

      $("#scheduleId").val(scheduleData.id);

      // 分割の場合、開始時分と終了時分を見て、真ん中の時間で分割する
      var middleTime = scheduleData.start + ((scheduleData.end - scheduleData.start) / 2);
      var middleHour = $().second2hour(middleTime);
      var middleMinute = $().second2min(middleTime);
      var cut1StartHour = $().second2hour(scheduleData.start);
      var cut1StartMinute = $().second2min(scheduleData.start);
      var cut1EndHour = $().second2hour(scheduleData.end);
      var cut1EndMinute = $().second2min(scheduleData.end);
      var cut2StartHour = $().second2hour(scheduleData.start);
      var cut2StartMinute = $().second2min(scheduleData.start);
      var cut2EndHour = $().second2hour(scheduleData.end);
      var cut2EndMinute = $().second2min(scheduleData.end);
      // ダイアログの値に選択したスケジュールの値を渡す
      $("#cut1StartHour").val(cut1StartHour);
      $("#cut1StartMinute").val(cut1StartMinute);
      $("#cut1EndHour").val(middleHour);
      $("#cut1EndMinute").val(middleMinute);
      $("#cut2StartHour").val(middleHour);
      $("#cut2StartMinute").val(middleMinute);
      $("#cut2EndHour").val(cut2EndHour);
      $("#cut2EndMinute").val(cut2EndMinute);
    }
  });

  // スケジュールを取得
  var $getAllSchedule = function () {
    // スケジュールデータの取得
    $.ajax({
      type: "post",
      url: "/getSchedule",
      dataType: "json",
    }).then(function (json_data) {
      // 成功時の処理
      $.each(json_data, function (index, value) {
        var tmpSchedule = {
          id: value.id,
          timeline: value.timeline,
          start: value.start,
          end: value.end,
          text: value.text,
        }
        $sc.addScheduleData(tmpSchedule);
        // 再描画
        $sc.resetBarPosition(tmpSchedule.timeline);
      });
    }, function () {
      // 失敗時の処理
      console.log("失敗しました");
    });
  }

	$getAllSchedule();

  // ===================================== 右クリックした際の項目定義 start =====================================
  var edit = {
    name: "編集",
    icon: "edit"
  }
  var cut = {
    name: "分割",
    icon: "cut"
  }
  var itemList = {
    "edit": edit,
    "cut": cut
  }
  // ===================================== 右クリックした際の項目定義  end  =====================================
  // 右クリックメニュー
  $.contextMenu({
    selector: '.sc_Bar',
    callback: function (key, options) {
      switch (key) {
      case "edit":
        break;
      case "cut":
        $("#cutSchedule").dialog("open");
        break;
      }
    },
    items: itemList
  });

  // ダイアログのデータからスケジュールを変更する
  var $editSchedule = function () {

		// IDからスケジュールを取得
		var scheduleData = $sc.getScheduleDataById($("#scheduleId").val());

    // ① 元のスケジュールの時間を変更する
    scheduleData.start = $().time2second($("#cut1StartHour").val() + ":" + $("#cut1StartMinute").val());
    scheduleData.end = $().time2second($("#cut1EndHour").val() + ":" + $("#cut1EndMinute").val());

    // データベースの変更
    $.ajax({
      type: "post",
      url: "/updSchedule",
      data: JSON.stringify(scheduleData),
      contentType: 'application/json',
      dataType: "json"
    }).then(function (json_data) {
      // 成功時の処理
      $sc.rewriteBarText(scheduleData);
      $sc.rewriteBarWidth(scheduleData);
      // 再描画
      $sc.resetBarPosition(scheduleData.timeline);
    }, function () {
      // 失敗時の処理
      console.log("失敗しました");
      return false;
    });
    var start = $().time2second($("#cut2StartHour").val() + ":" + $("#cut2StartMinute").val());
    var end = $().time2second($("#cut2EndHour").val() + ":" + $("#cut2EndMinute").val());
    var tmpSchedule = {
      timeline: scheduleData.timeline,
      start: start,
      end: end,
      text: '分割後'
    }
    // データベースの変更
    $.ajax({
      type: "post",
      url: "/insSchedule",
      data: JSON.stringify(tmpSchedule),
      contentType: 'application/json',
      dataType: "json"
    }).then(function (json_data) {
      tmpSchedule.id = json_data.id;
      // 成功時の処理
      $sc.addScheduleData(tmpSchedule);
      // 再描画
      $sc.resetBarPosition(tmpSchedule.timeline);
    }, function () {
      // 失敗時の処理
      console.log("失敗しました");
      return false;
    });
  }
});