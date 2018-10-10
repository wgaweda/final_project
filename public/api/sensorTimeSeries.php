
<?php
require '../../app/common.php';

//POST function

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'sensorTimeSeriesPost.php';
  exit;
}

//FETCH ALL
$sensorsTS = Series::fetchAll();

$json = json_encode($sensorsTS, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
