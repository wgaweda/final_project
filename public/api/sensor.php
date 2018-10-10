
<?php
require '../../app/common.php';

//POST function

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'sensorPost.php';
  exit;
}

//FETCH ALL
$sensors = Sensor::fetchAll();

$json = json_encode($sensors, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
