var turbineApp = new Vue({
  el: '#turbinesMain',
  data:{
    turbines:[],
    sensors: []
},

methods: {
  fetchTurbineDeployed(sid) {
    fetch('api/turbineDeployed.php?siteId='+sid)
    .then( response => response.json() )
    .then( json => {this.turbines = json; console.log(this.turbines)} )
    .catch( err => {
        console.log('CLIENT FETCH ERROR:');
        console.log(err);
      })
    },

//   fetchSensors() {
//     fetch('api/sensor.php')
//     .then( response => response.json() )
//     .then( json => {turbinesMain.sensors = json} )
//     .catch( err => {
//       console.log('TEAM LIST ERROR:');
//       console.log(err);
//   })
// },

gotoTurbine (sid) {
window.location = 'turbine.html?siteId=' + sid;
}

},

created() {
  const url = new URL(window.location.href);
  const siteId = url.searchParams.get('siteId') || 0;
  console.log('Turbine: '+ siteId);
  this.turbines.siteId = siteId;

  if (!siteId) {
    console.error('Site Id not defined in URL parameters.')
  }


  this.fetchTurbineDeployed(siteId);
}

})
