
<?php
require '../../app/common.php';

//POST function

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  require 'sensorDeployedPost.php';
  exit;
}

//FETCH ALL
$sensorsDeployed = sensorDeployed::fetchAll();

$json = json_encode($sensorsDeployed, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
