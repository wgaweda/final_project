
<?php
require '../../app/common.php';

$turbineDeployedId = intval($_GET['turbineDeployedId'] ?? 0);

if ($turbineDeployedId < 1) {
  throw new Exception('Invalid turbineDeployedId ID in URL');
}

//FETCH ALL
$sensorsDeployed = Deployed::fetchSensorDepById($turbineDeployedId);
$json = json_encode($sensorsDeployed, JSON_PRETTY_PRINT);
header('Content-Type: application/json');
echo $json;
