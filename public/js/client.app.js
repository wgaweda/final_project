var clientApp = new Vue({
  el: '#clientsMain',
  data:{
  clients: [],
  clientNotes: []
},
methods: {
  fetchClient(cid) {
    fetch('api/client.php?clientId='+cid)
    .then( response => response.json() )
    .then( json => {this.clients = json; console.log(this.clients)} )
    .catch( err => {
        console.log('CLIENT FETCH ERROR:');
        console.log(err);
      })
    }
  },

  fetchClientNotes(cid)  {
    fetch('api/clientNotes.php')
    .then( response => response.json() )
    .then( json => {this.clientNotes = json; console.log(this.clientNotes)} )
    .catch( err => {
        console.log('CLIENT NOTES FETCH ERROR:');
        console.log(err);
      })
    },

created() {
  const url = new URL(window.location.href);
  const clientId = url.searchParams.get('clientId') || 0;
  console.log('Client: '+ clientId);
  this.clients.clientId = clientId;

  if (!clientId) {
    console.error('Client Id not defined in URL parameters.')
  }


  this.fetchClient(clientId);
  this.fetchClientNotes(clientId);
}

})
