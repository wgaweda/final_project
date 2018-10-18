<?php

class Client

{
  public $clientId;
  public $clientName;
  public $clientDescription;
  public $gicsSector;
  public $gicsSubIndustry;
  public $headquarters;

  public function __construct($data) {
  $this->clientId = isset($data['clientId']) ? intval($data['clientId']) : null;
  $this->clientName = $data['clientName'];
  $this->clientDescription = $data['clientDescription'];
  $this->gicsSector = $data['gicsSector'];
  $this->gicsSubIndustry = $data['gicsSubIndustry'];
  $this->headquarters = $data['headquarters'];

}

  public static function fetchByClientId(int $clientId) {

    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    //2. run a query
    $sql = 'SELECT * FROM client WHERE cleintId = clients.cleintId';
    $statement = $db->prepare($sql);
    //3. read the results
    $success = $statement->execute(
      [$clientId]
    );
    //4. handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theClient = new Client($row);
      array_push($arr, $theClient);
    }
    return $arr;
  }
}
