$(function () {

	var timeFormat = function(cell, formatterParams){ //plain text value
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
        formatter:timeFormat
    }

    var End = {
        title: "終了時間",
        field: "end",
        headerSort: false,
        visible: true,
        formatter:timeFormat
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

	// テーブル定義
	$("#testTable").tabulator({
        resizableColumns:false,
        selectable:1,
        columns:actionTableColumns,
    });

	// 新規IDを取得
	$.fn.getNewId = function(){

		var retId = 0;
		var tableData = $("#testTable").tabulator("getData");

		$.each(tableData, function (index, value) {
			if(retId < value["id"]) retId = value["id"];
		});

		// 最大値を返す
		return retId + 1;
	}

	// 対象行を更新する処理
	$.fn.updRow = function(scheduleData){

		var updScheduleData = {};

		// オブジェクトの値渡し
		Object.assign(updScheduleData, scheduleData);

		$("#testTable").tabulator("updateData", [updScheduleData]);
	}

	// テーブルに行を追加
	$.fn.addRow = function(scheduleData){


	}

	// テーブルに行を挿入
	$.fn.insRow = function(addData, targetId){

		$("#testTable").tabulator("addRow", addData, false, targetId)
	}

});