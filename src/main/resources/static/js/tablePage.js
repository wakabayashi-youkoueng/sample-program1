$(function () {
  // 時間の変換
  var timeFormat = function (cell, formatterParams) {
    return $().second2time(cell.getValue());
  };
  // ===================================== 列定義 start =====================================
  var Id = {
    title: "Id",
    field: "id",
    headerSort: false,
    visible: true
  }
  var No = {
    title: "No",
    field: "no",
    headerSort: false
  }
  var Start = {
    title: "開始時間",
    field: "start",
    headerSort: false,
    visible: true,
    formatter: timeFormat
  }
  var End = {
    title: "終了時間",
    field: "end",
    headerSort: false,
    visible: true,
    formatter: timeFormat
  }
  var Text = {
    title: "内容",
    field: "text",
    width: 250,
    headerSort: false,
    visible: true
  }
  // ===================================== 列定義  end  =====================================
  // 項目定義
  var actionTableColumns = [
    Id,
    No,
    Start,
    End,
    Text
  ];
  // ===================================== tabulatorへの反映 start =====================================
  // テーブル定義
  $("#testTable").tabulator({
    resizableColumns: false,
    selectable: 1,
    columns: actionTableColumns,
  });

  // スケジュールを取得
  var $getAllSchedule = function () {
    // スケジュールデータの取得
    $.ajax({
      type: "post",
      url: "/getSchedule",
      dataType: "json",
    }).then(function (json_data) {
      console.log(json_data);
      // 成功時の処理
      $.each(json_data, function (index, value) {
        value['no'] = index + 1;
        $("#testTable").tabulator("addRow", json_data[index]);
      });
    }, function () {
      // 失敗時の処理
      console.log("失敗しました");
    });
  }
  // 対象行を更新する処理
  var $updRow = function (scheduleData) {
    var updScheduleData = {};
    // オブジェクトの値渡し
    Object.assign(updScheduleData, scheduleData);
    $("#testTable").tabulator("updateData", [updScheduleData]);
  }
  // テーブルに行を追加
  var $addRow = function (scheduleData) {}
  // テーブルに行を挿入
  var $insRow = function (addData, targetId) {
    $("#testTable").tabulator("addRow", addData, false, targetId)
  }


  $getAllSchedule();

  // ===================================== tabulatorへの反映  end  =====================================
});