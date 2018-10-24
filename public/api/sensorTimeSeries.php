
<?php
require '../../app/common.php';

$siteId = intval($_GET['siteId'] ?? 0);

if ($siteId < 1) {
  throw new Exception('Invalid site ID in URL');
}


//FETCH ALL
$sensorsTS = Series::fetchById($siteId);

$json = json_encode($sensorsTS, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
