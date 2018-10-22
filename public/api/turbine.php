
<?php
require '../../app/common.php';

// //FETCH ALL
// $turbines = Turbine::fetchAll();
//
// $json = json_encode($turbines, JSON_PRETTY_PRINT);
//
// header('Content-Type: application/json');
// echo $json;

$turbineId = intval($_GET['turbineId'] ?? 0);

if ($turbineId < 1) {
  throw new Exception('Invalid turbine ID in URL');
}

$turbine = Turbine::fetchByTurbineId($turbineId);

$json = json_encode($turbine, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
