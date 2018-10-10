<?php

$sensor = new sensorDeployed($_POST);

$sensor->create();

echo json_encode($sensor);
