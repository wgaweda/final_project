
<?php
require '../../app/common.php';


//FETCH ALL
$sensors = Sensor::fetchAll();

$json = json_encode($sensors, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
