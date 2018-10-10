<?php

$series = new Series($_POST);

$series->create();

echo json_encode($series);
