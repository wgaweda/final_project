
<?php
require '../../app/common.php';

// //FETCH ALL
// $turbines = Turbine::fetchAll();
//
// $json = json_encode($turbines, JSON_PRETTY_PRINT);
//
// header('Content-Type: application/json');
// echo $json;

$siteId = intval($_GET['siteId'] ?? 0);

if ($siteId < 1) {
  throw new Exception('Invalid site ID in URL');
}

$turbine = Turbine::fetchByTurbineId($siteId);

$json = json_encode($turbine, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
