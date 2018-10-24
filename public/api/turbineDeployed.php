
<?php
require '../../app/common.php';

$siteId = intval($_GET['siteId'] ?? 0);

if ($siteId < 1) {
  throw new Exception('Invalid site ID in URL');
}

$turbine = TurbineDeployed::fetchByTurbineId($siteId);

$json = json_encode($turbine, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
