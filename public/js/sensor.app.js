var sensorApp = new Vue({
  el: '#sensorsMain',
  data:{
    sensors:[]
},

methods: {
  fetchsensorDeployed(sDid) {
    fetch('api/sensorDeployed.php?sensorId='+sDid)
    .then( response => response.json() )
    .then( json => {this.sensors = json; console.log(this.sensors)} )
    .catch( err => {
        console.log('CLIENT FETCH ERROR:');
        console.log(err);
      })
    },

gotoSensor (sDid) {
window.location = 'sensor.html?sensorId=' + sDid;
},

},

created() {
  const url = new URL(window.location.href);
  const sensorId = url.searchParams.get('sensorId') || 0;
  console.log('sensor: '+ sensorId);
  this.sensors.sensorId = sensorId;

  if (!sensorId) {
    console.error('Sensor Deployed Id not defined in URL parameters.')
  }


  this.fetchsensorDeployed(sensorId);
}

})
