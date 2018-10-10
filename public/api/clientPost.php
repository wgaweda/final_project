<?php

//Works

$survey = new Client($_POST);

$survey->create();

echo json_encode($survey);
