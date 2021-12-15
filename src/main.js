
var tapcount = 85;  //残り時間
var score = 0;  //得点
var mogura = $('#stage div');  //モグラのブロック

//24匹のモグラの状態を配列で管理
//0＝土の中　1＝頭を出した状態　2＝体を全て出した状態　3＝頭を出した状態  4=土の中　5=叩かれた時
var joutai = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//モグラの向きの初期　0=正面　1=右　2=左
var muki = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//頭数カウント
var num = 0;
//モグラの番号をシャフルして入れるとこ
var mogNum = [];

var sensorRec1 = {};
var sensorRec2 = {};

let isHoge = true;
const callHogeOnetime = ((_text) => {
  if (isHoge) {
    alert(_text);
    isHoge = false;
  }
})

function mogSet() {
  for (i = 0; i < 84; i++) {
    mogNum.push(i);
  }
  mogNum.sort(function () {  //配列mogNumの中身をランダムに並び替え
    return Math.random() - Math.random();
  });
  console.log(mogNum);
  mogStart(mogSelect(), 350);
}

//土に潜っている状態のモグラをランダムで選ぶ関数
function mogSelect() {
  return mogNum[num] % 28;
}

//モグラの状態から適した画像を表示させる関数
function mogGraphic(n) {
  var dankai = joutai[n];  //該当のモグラの状態を取得
  dankai++;  //次の状態のグラフィックに変更したいので1を足す
  if (dankai > 2) {
    dankai = 2;
  }

  recordMgrData(n, muki[n], joutai[n]);

  // var direction = muki[n];
  if (muki[n] == 0) {
    mogura.eq(n).css({ 'background-position': (dankai * -100) + 'px ' + 0 + 'px' })  //モグラの画像を次の段階のものへずらす
    mogura.eq(n).css('background-image', 'url(src/img/mog_f.png)');
  } else if (muki[n] == 1) {
    mogura.eq(n).css({ 'background-position': (dankai * -100) + 'px ' + 0 + 'px' })
    mogura.eq(n).css('background-image', 'url(src/img/mog_r.png)');
  } else if (muki[n] == 2) {
    mogura.eq(n).css({ 'background-position': (dankai * -100) + 'px ' + 0 + 'px' })
    mogura.eq(n).css('background-image', 'url(src/img/mog_l.png)');
  }
  joutai[n] = dankai;  //モグラの状態を１つ進めたもので上書き

}


//モグラをタップしたとき
mogura.hammer().on('click', function () {
  var index = $(this).index();  //叩いたモグラの番号を取得

  if (muki[index] == 0) {
    attack(index);//叩いたモグラの番号を取得
  }
  recordUiData(index, muki[index], joutai[index]);
})
/*mogura.hammer().on('press', function () {
  alert("press");
  var index = $(this).index();  //叩いたモグラの番号を取得

  if (muki[index] == 0) {
    attack(index);//叩いたモグラの番号を取得
  }
  recordUiData(index, muki[index],joutai[index]);
})
mogura.hammer().on('drag', function () {
  var index = $(this).index();  //叩いたモグラの番号を取得

  if (muki[index] == 0) {
    attack(index);//叩いたモグラの番号を取得
  }
  recordUiData(index, muki[index],joutai[index]);
})*/
//モグラを右にスワイプしたとき
mogura.hammer().on('swiperight', function () {
  var index = $(this).index();

  if (muki[index] == 1) {
    attack(index);
  }
  recordUiData(index, muki[index], joutai[index]);
})
//モグラを左にスワイプしたとき
mogura.hammer().on('swipeleft', function () {
  var index = $(this).index();

  if (muki[index] == 2) {
    attack(index);
  }
  recordUiData(index, muki[index], joutai[index]);
})

//情報を送るためのあれやこれや

function recordUiData(index, muki, joutai) {
  var time = new Date().getTime();
  var data1 = index;
  var data2 = muki;
  var data3 = joutai;
  //alert('hohe');
  var recordData = {
    //時間　モグラをどこ叩いたか　どう叩いたか いつの段階か
    'time': time,
    'data1': data1,
    'data2': data2,
    'data3': data3
  }
  //alert('hoge');
  console.log(Object.values(recordData));
  sendUiData(recordData);
  //alert(recordData);
}

function sendUiData(value) {
  console.log(value);
  //alert('hoge');

  strValue = '';
  //alert('hoge');
  for (key in value) {
    strValue = strValue + value[key] + ',';
    //alert('hoge');
  }
  //alert(value);

  $.ajax({
    type: 'GET',
    url: 'mogura_api.php?uidata=' + strValue,
  }).done(function (data) {
    console.log(data);
    if (data == "OK") {
      console.log("受信完了");
      //alert(value);
    } else {
      console.log("受信失敗");
    }
  }).fail(function (xhr, status, error) {
    console.log("送信に失敗");
    // alert(value);
  });
}


function recordMgrData(index, muki, joutai) {
  var time = new Date().getTime();
  var data1 = index;
  var data2 = muki;
  var data3 = joutai;
  var recordData = {
    'time': time,
    'data1': data1,
    'data2': data2,
    'data3': data3
  }
  console.log(Object.values(recordData));
  sendMgrData(recordData);
}


function sendSensorData(data1, data2) {
  if (Object.keys(data1).length != 0 && Object.keys(data2).length != 0) {
    var value = Object.assign(data1, data2);
    reset();
    strValue = '';
    for (key in value) {
      strValue = strValue + value[key] + ',';
    }
    //alert(Object.keys(value).length);
    $.ajax({
      type: 'GET',
      url: 'mogura_api.php?sensordata=' + strValue,
    }).done(function (data) {
      console.log(data);
      if (data == "OK") {
        console.log("受信完了");
        alert('hoge');
      } else {
        console.log("受信失敗");
      }
    }).fail(function (xhr, status, error) {
      //alert("送信に失敗");
    });
  }
}

function reset() {
  sensorRec1 = {};
  sensorRec2 = {};
}

function sendMgrData(value) {
  console.log(value);
  strValue = '';
  for (key in value) {
    strValue = strValue + value[key] + ',';
  }
  console.log(strValue);
  $.ajax({
    type: 'GET',
    url: 'mogura_api.php?mgrdata=' + strValue,
  }).done(function (data) {
    console.log(data);
    if (data == "OK") {
      console.log("受信完了");
    } else {
      console.log("受信失敗");
    }
  }).fail(function (xhr, status, error) {
    console.log("送信に失敗");
  });
  //  alert('hoge');

}

/*
//ローカルストレージに保存
function uiSet(name, data) {
  var now = new Date().getTime();
  var key = `ui-${now}`;
  var val = `${data},${name}`;
  localStorage.setItem(key, val);
  //debug
  //alert(localStorage.getItem(key));
}*/

//モグラを動かす関数
function mogStart(n, speed) {  //第一引数：動かすモグラの番号　　第二引数：モグラの動きの速度
  muki[n] = Math.floor(mogNum[num] / 28);
  var mogId = setInterval(function () {
    if (joutai[n] <= 3) {  //モグラの状態が3以前ならば
      mogGraphic(n);  //mogGraphic()を実行
    }
    else if (joutai[n] == 4) {    //モグラの状態が4（飛び出して土に戻った状態）ならば
      clearInterval(mogId);  //setIntervalを解除してモグラの動きを止める
      joutai[n] = 0;  //モグラの状態を0（飛び出す前の状態）に変更
      //muki[n] = Math.floor(mogNum[num] / 24);
      mogStart(mogSelect(), 350);
      if (tapcount > 1) {  //countが1より大きければ
        tapcount--;
        num++;//追加
      } else {
        tapcount = 0;  //残り時間がなくなった場合
        //  clearInterval(countId);  //カウントダウンのsetIntervalを解除して止める
        $("#gameover").show().text("GAME CLEAR");  //タイムオーバーの画面を表示
      }
    }
    else if (joutai[n] == 5) {   //モグラの状態が5（叩かれた時）ならば
      setTimeout(function () {  //0.7秒後に
        mogura.eq(n).css({ 'background-position': 0 + 'px ' + 0 + 'px' })  //モグラを0のグラフィックに戻す
        clearInterval(mogId);  //setIntervalを解除してモグラの動きを止める
        joutai[n] = 0;  //モグラの状態を0（飛び出す前の状態）に変更
        //muki[n] = Math.floor(mogNum[num] / 24);
      }, 300);
      mogStart(mogSelect(), 350);
      if (tapcount > 1) {  //countが1より大きければ
        tapcount--;
        num++;//追加
      } else {
        tapcount = 0;  //残りがなくなった場合
        //  clearInterval(countId);  //カウントダウンのsetIntervalを解除して止める
        $("#gameover").show().text("GAME CLEAR");  //タイムオーバーの画面を表示
      }
      $("#tapcount").text(tapcount);  //変数tapcountに入っている残り時間の値を#tapcountに表示させる
    };
  }, speed);
}

//モグラを叩いた時に実行する関数
function attack(n) {
  if (joutai[n] != 0) {  //モグラの状態が0（飛び出す前）でなければ
    joutai[n] = 5;  //モグラの状態を5に
    mogura.eq(n).css({ 'background-position': -500 + 'px ' + 0 + 'px' });  //モグラのグラフィックを叩かれたものへ変更
  }
}

//ゲームスタート
$("#gameover").click(function () {  //#gameoverをクリックした時
  if (tapcount == 85) {  //countが30ならば
    $("#gameover").hide();  //#gameoverを非表示に
    mogSet();
    //mogStart(mogSelect(), 350);  //モグラを出現させる（1回のみ）
  }
})

window.addEventListener('devicemotion', function (e) {
  // 重力加速度を取得
  var ag = e.accelerationIncludingGravity;
  var rr = e.rotationRate;
  var time = new Date().getTime();
  var acc_x = ag.x;
  var acc_y = ag.y;
  var acc_z = ag.z;
  var rr_x = rr.beta;
  var rr_y = rr.gamma;
  var rr_z = rr.alpha;
  sensorRec1 = {
    'time': time,
    'data1': acc_x,
    'data2': acc_y,
    'data3': acc_z,
    'data4': rr_x,
    'data5': rr_y,
    'data6': rr_z
  };
  sendSensorData(sensorRec1, sensorRec2);
});

window.addEventListener("deviceorientation", function (e) {
  var x = e.beta;　//-180 - 180
  var y = e.gamma;　//-90 - 90
  var z = e.alpha;　//0 - 360

  sensorRec2 = {
    'data7': x,
    'data8': y,
    'data9': z
  }
  sendSensorData(sensorRec1, sensorRec2);
});
