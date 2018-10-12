$(function () {
  $(document).on('click', '#testBtn', function () {
    // 通信実行
    $.ajax({
      type: "post",
      url: "/service",
      data: JSON.stringify($("#testTable").tabulator("getData")),
      contentType: 'application/json',
      dataType: "json",
    }).then(function (json_data) {
      // 成功時の処理
      console.log(json_data);
    }, function () {
      // 失敗時の処理
      console.log("失敗しました");
    }).then(function () {
      console.log("成功")
    }).then(function () {
      console.log("2回目")
    });
  });
  $(document).on('click', '#selectBtn', function () {
    // 通信実行
    $.ajax({
      type: "post",
      url: "/company",
      dataType: "json",
    }).then(function (json_data) {
      // 成功時の処理
      console.log(json_data);
    }, function () {
      // 失敗時の処理
      console.log("失敗しました");
    });
  });
  $(document).on('click', '#insBtn', function () {
    // 通信実行
    $.ajax({
      type: "post",
      url: "/insCompany",
      dataType: "json",
    }).then(function (json_data) {
      // 成功時の処理
      console.log(json_data);
    }, function () {
      // 失敗時の処理
      console.log("失敗しました");
    });
  });
  $(document).on('click', '#refreshScheduleBtn', function () {
    // 通信実行
    $.ajax({
      type: "post",
      url: "/refreshSchedule",
      dataType: "json",
    }).then(function (json_data) {
      // 成功時の処理
      console.log(json_data);
    }, function () {
      // 失敗時の処理
      console.log("失敗しました");
    });
  });
  $(document).on('click', '#helloBtn', function () {
    $('<form/>', {
      action: '/hello',
      method: 'post'
    }).append($('<input/>', {
      type: 'hidden',
      name: 'name',
      value: "名前です"
    })).append($('<input/>', {
      type: 'hidden',
      name: 'aaa',
      value: "aです"
    })).append($('<input/>', {
      type: 'hidden',
      name: 'bbb',
      value: "bです"
    })).append($('<input/>', {
      type: 'hidden',
      name: 'ccc',
      value: "cです"
    })).appendTo(document.body).submit();
  });
});