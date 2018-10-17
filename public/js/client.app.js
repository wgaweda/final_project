var clientApp = new Vue({
  el: '#clientsMain',
  data:{
  clients: [],
},
methods: {
  // handleCommentForm(e) {
  //
  //     const s = JSON.stringify(this.commentForm);
  //
  //     fetch('../api/comment.php', {
  //       method: "POST",
  //       headers: {
  //           "Content-Type": "application/json; charset=utf-8",
  //       },
  //       body: s
  //   })
  //
  //   .then( response => response.json() )
  //   .then( json => {this.comments.push(json)})
  //   .catch( err => {
  //     console.log('COMMENT POST ERROR:');
  //     console.log(err);
  //   })
  //
  //     this.commentForm = this.getEmptyCommentForm();
  //   },
  //
  //   getEmptyCommentForm() {
  //     return {
  //     }
  //   },

//help recieved from Karan Asher
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
