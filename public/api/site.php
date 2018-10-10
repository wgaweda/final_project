
<?php
require '../../app/common.php';

//FETCH ALL
$sites = Site::fetchAll();

$json = json_encode($sites, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
