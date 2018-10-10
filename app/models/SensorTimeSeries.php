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
  $this->output = $data['output'];
  $this->heatRate = $data['heatRate'];
  $this->compressorEfficiency = $data['compressorEfficiency'];
  $this->availability = $data['availability'];
  $this->reliability = $data['reliability'];
  $this->firedHours = $data['firedHours'];
  $this->trips = $data['trips'];
  $this->starts = $data['starts'];

}

  public static function fetchAll() {

    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    //2. run a query
    $sql = 'SELECT * FROM sensorTimeSeries';
    $statement = $db->prepare($sql);
    //3. read the results
    $success = $statement->execute();
    //4. handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSeries = new Series($row);
      array_push($arr, $theSeries);
    }
    return $arr;
  }
}
