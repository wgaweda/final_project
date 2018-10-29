<?php

class Series

{
  public $Id;
  public $sensorDeployedId;
  public $dataCollectedDate;
  public $output;
  public $heatRate;
  public $compressorEfficiency;
  public $availability;
  public $reliability;
  public $firedHours;
  public $trips;
  public $starts;


  public function __construct($data) {
  $this->Id = isset($data['Id']) ? intval($data['Id']) : null;
  $this->sensorDeployedId = isset($data['sensorDeployedId']) ? intval($data['sensorDeployedId']) : null;
  $this->dataCollectedDate = $data['dataCollectedDate'];
  $this->output = intval($data['output']);
  $this->heatRate = intval($data['heatRate']);
  $this->compressorEfficiency = intval($data['compressorEfficiency']);
  $this->availability = intval($data['availability']);
  $this->reliability = intval($data['reliability']);
  $this->firedHours = intval($data['firedHours']);
  $this->trips = intval($data['trips']);
  $this->starts = intval($data['starts']);

}

  public static function fetchById(int $siteId) {

    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    //2. run a query
    $sql = 'SELECT s.sensorDeployedId, s.dataCollectedDate, s.output, s.heatRate, s.compressorEfficiency, s.availability, s.reliability, s.firedHours, s.trips, s.starts
    From sensor, turbineDeployed, sensorTimeSeries as s, sensorDeployed, site
    Where sensor.sensorId = sensorDeployed.sensorId
    AND sensorDeployed.sensorDeployedId = s.sensorDeployedId
    AND sensorDeployed.turbineDeployedId = turbineDeployed.turbineDeployedId
    AND turbineDeployed.siteId = site.siteId
    AND site.siteId = ?';

    $statement = $db->prepare($sql);
    //3. read the results
    $success = $statement->execute(
      [$siteId]
    );
    //4. handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSeries = new Series($row);
      array_push($arr, $theSeries);
    }
    return $arr;
  }
}
