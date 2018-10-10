<?php

//Change the working directory to this file
chdir( __DIR__ );
set_include_path ( __DIR__ );


require 'environment.php';

/** models **/
require 'models/Client.php';
require 'models/Sensor.php';
require 'models/SensorDeployed.php';
require 'models/SensorTimeSeries.php';
require 'models/Site.php';
