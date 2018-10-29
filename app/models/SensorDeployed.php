<?php
class Deployed
{

  public static function fetchSensorDepById(int $sensorDeployedId) {
    $db = new PDO(DB_SERVER, DB_USER, DB_PW);
    //2. run a query
    $sql = 'SELECT * from sensor, sensorDeployed, turbineDeployed, site
    WHERE sensor.sensorId = sensorDeployed.sensorDeployedId
    AND turbineDeployed.siteId = site.siteId
    AND site.siteId = ?';

    $statement = $db->prepare($sql);
    //3. read the results
    $success = $statement->execute(
      [$sensorDeployedId]
    );
    //4. handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSensorDeployed = new Deployed($row);
      array_push($arr, $theSensorDeployed);
    }
    return $arr;
  }
}
