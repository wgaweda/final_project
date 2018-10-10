<?php

$sensor = new Deployed($_POST);

$sensor->create();

echo json_encode($sensor);
