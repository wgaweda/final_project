<?php

class Site

{
  public $siteId;
	public $clientId;
	public $siteName;
	public $siteDescription;
	public $primaryContact;
	public $capacity;
	public $commercialDate;
	public $addrLine1;
	public $addrLine2;
 	public $addrCity;
	public $addrState;
	public $addrZip;
	public $addrCountry;


  public function __construct($data) {
  $this->siteId = isset($data['siteId']) ? intval($data['siteId']) : null;
  $this->clientId = isset($data['clientId']) ? intval($data['clientId']) : null;
  $this->siteName = $data['siteName'];
  $this->siteDescription = $data['siteDescription'];
  $this->capacity = $data['capacity'];
  $this->commercialDate = $data['commercialDate'];
  $this->addrLine1 = $data['addrLine1'];
  $this->addrLine2 = $data['addrLine2'];
  $this->addrCity = $data['addrCity'];
  $this->addrState = $data['addrState'];
  $this->addrZip = $data['addrZip'];
  $this->addrCountry = $data['addrCountry'];
}

  public static function fetchAll() {

    $db = new PDO(DB_SERVER, DB_USER, DB_PW);

    //2. run a query
    $sql = 'SELECT * FROM site';
    $statement = $db->prepare($sql);
    //3. read the results
    $success = $statement->execute();
    //4. handle the results
    $arr = [];
    while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
      $theSite = new Site($row);
      array_push($arr, $theSite);
    }
    return $arr;
  }
}
