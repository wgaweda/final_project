
<?php
require '../../app/common.php';

$sensorDeployedId = intval($_GET['sensorDeployedId'] ?? 0);

if ($sensorDeployedId < 1) {
  throw new Exception('Invalid site ID in URL');
}

//FETCH ALL
$sensorsDeployed = Deployed::fetchBySensorId();

$json = json_encode($sensorsDeployed, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
