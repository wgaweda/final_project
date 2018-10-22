var turbineApp = new Vue({
  el: '#turbineMain',
  data:{
    turbines:[]
},

methods: {
  fetchTurbine(tid) {
    fetch('api/turbine.php?turbineId='+tid)
    .then( response => response.json() )
    .then( json => {this.turbines = json; console.log(this.turbines)} )
    .catch( err => {
        console.log('CLIENT FETCH ERROR:');
        console.log(err);
      })
    },

},

gotoTurbine (tid) {
window.location = 'turbine.html?turbineId=' + tid;
}

created() {
  const url = new URL(window.location.href);
  const turbineId = url.searchParams.get('turbineId') || 0;
  console.log('Turbine: '+ turbineId);
  this.turbines.turbineId = turbineId;

  if (!turbineId) {
    console.error('Client Id not defined in URL parameters.')
  }


  this.fetchTurbine(turbineId);
