<?php
echo exec('whoami');

$mysqli = new mysqli("localhost", "name", "password");
$mysqli->select_db("dbname");
$mysqli->set_charset("utf8");

$file1 = 'data/ui_name.csv';
$file2 = 'data/se_namecsv';
$file3 = 'data/mog_name.csv';

if (isset($_GET['uidata'])) {
    echo "OK";
    //GETでURLからデータ取得
    $uidata = $_GET['uidata'];
    //追加書き込みモードでファイルを開く＆エラー処理
    $myfile = fopen($file1, "a") or die("Unable to open file!");
    foreach ((array)$uidata as $value) { //(array)で強制的に配列にするよ
        $content = "{$value}";
        //ファイル内容を表示
        echo $content;
        fwrite($myfile, $content);
    }
    fwrite($myfile, "\n");
    fclose($myfile);
} else if (isset($_GET['sensordata'])) {
    echo "OK";
    $sensordata = $_GET['sensordata'];
    $myfile = fopen($file2, "a") or die("Unable to open file!");
    foreach ((array)$sensordata as $value) {
        $content = "{$value}";
        echo $content;
        fwrite($myfile, $content);
    }
    fwrite($myfile, "\n");
    fclose($myfile);
} else if (isset($_GET['mgrdata'])) {
    echo "OK";
    $mgrdata = $_GET['mgrdata'];
    $myfile = fopen($file3, "a") or die("Unable to open file!");
    foreach ((array)$mgrdata as $value) {
        $content = "{$value}";
        echo $content;
        fwrite($myfile, $content);
    }
    fwrite($myfile, "\n");
    fclose($myfile);
} else {
    echo "ERROR";
}
