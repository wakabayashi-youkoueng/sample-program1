$(function () {
  $(document).on('click', '#schedulePage', function () {
    $('<form/>', {
      action: '/index',
      method: 'post'
    }).appendTo(document.body).submit();
  });
  $(document).on('click', '#dashboard', function () {
    $('<form/>', {
      action: '/dashboard',
      method: 'post'
    }).appendTo(document.body).submit();
  });
  $(document).on('click', '#tablePage', function () {
    $('<form/>', {
      action: '/tablePage',
      method: 'post'
    }).appendTo(document.body).submit();
  });
});
// 「秒」を「時：分」に変換する処理(30分区切り)
$.fn.second2time = function (second) {
  var min = $().second2min(second);
  var hour = $().second2hour(second);
  return hour + ":" + min;
}
// 「秒」を「分」に変換する処理(30分区切り)
$.fn.second2min = function (second) {
  var min = Math.floor(second / 60) % 60;
  var min = Math.floor(min / 30) * 30;
  return ("00" + min).slice(-2);
}
// 「秒」を「時間」に変換する処理
$.fn.second2hour = function (second) {
  var hour = Math.floor(second / 3600);
  return ("00" + hour).slice(-2);
}
// 「時：分」を「秒」に変更する処理
$.fn.time2second = function (time) {
  var arrTime = time.split(':');
  var h = arrTime[0];
  var m = arrTime[1];
  return (Number(h) + (Number(m) / 60)) * 60 * 60;
};