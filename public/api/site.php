
<?php
require '../../app/common.php';

$siteId = intval($_GET['clientId'] ?? 0);

if ($siteId < 1) {
  throw new Exception('Invalid client ID in URL');
}

$site = Site::fetchBySiteId($siteId);

$json = json_encode($site, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
