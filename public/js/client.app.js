var clientApp = new Vue({
  el: '#clientsMain',
  data:{
  clients: [],
},
methods: {

  fetchClient() {
    fetch('api/client.php')
    .then( response => response.json() )
    .then( json => {this.clients = json; console.log(this.clients);} )
    .catch( err => {
        console.log('COMMENTS FETCH ERROR:');
        console.log(err);
      })
    }
  },
created() {
  console.log('inside created.');
this.fetchClient()
}

})
