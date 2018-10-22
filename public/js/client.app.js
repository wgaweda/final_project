var clientApp = new Vue({
  el: '#clientsMain',
  data:{
  clients: [],
  clientNotes: [],
  sites: []
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
    },


  fetchNotes(cid) {
    fetch('api/clientNotes.php?clientId='+cid)
    .then( response => response.json() )
    .then( json => {this.clientNotes = json; console.log(this.clientNotes)} )
    .catch( err => {
        console.log('CLIENT NOTES FETCH ERROR:');
        console.log(err);
      })
    },

  fetchSite(cid) {
    fetch('api/site.php?clientId='+cid)
    .then( response => response.json() )
    .then( json => {this.sites = json; console.log(this.sites)} )
    .catch( err => {
        console.log('SITE FETCH ERROR:');
        console.log(err);
      })
  },

    gotoClient (cid) {
    window.location = 'client.html?clientId=' + cid;
  }

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
  this.fetchNotes(clientId);
  this.fetchSite(clientId);
}

})
