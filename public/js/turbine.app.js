var turbineApp = new Vue({
  el: '#turbinesMain',
  data:{
    turbines:[]
},

methods: {
  fetchTurbineDeployed(sid) {
    fetch('api/turbineDeployed.php?siteId='+tid)
    .then( response => response.json() )
    .then( json => {this.turbines = json; console.log(this.turbines)} )
    .catch( err => {
        console.log('CLIENT FETCH ERROR:');
        console.log(err);
      })
    },

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
    console.error('Client Id not defined in URL parameters.')
  }


  this.fetchTurbineDeployed(siteId);
}

})
