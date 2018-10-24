
<?php
require '../../app/common.php';

$siteId = intval($_GET['siteId'] ?? 0);

if ($siteId < 1) {
  throw new Exception('Invalid site ID in URL');
}

//FETCH ALL
$sensors = Sensor::fetchSensorById($siteId);

$json = json_encode($sensors, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
