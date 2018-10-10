
<?php
require '../../app/common.php';


//FETCH ALL
$sensorsTS = Series::fetchAll();

$json = json_encode($sensorsTS, JSON_PRETTY_PRINT);

header('Content-Type: application/json');
echo $json;
