
<?php
require '../../app/common.php';

//FETCH ALL
$turbines = Turbine::fetchAll();

$json = json_encode($turbines, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
