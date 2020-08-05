const apiUrl = "http://minesweeper-rails.herokuapp.com"
// const apiUrl = "http://localhost:3000"

new Vue({
  el: '#app',

  data (){
    return {
      title: "Minesweeper",
      game: null,
      games: null,
      cell: null,
      form: {
        rows: '',
        columns: '',
        mines: ''
      }
    }
  },

  methods: {

    createGame(e) {
      var self=this;
      e.preventDefault()
      axios.post(`${apiUrl}/games.json`, self.form)
      .then(function (response) {
        self.game = response.data;
        self.getGames()
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    reveal(game_id, x, y) {
      var self=this;
      axios.post(`${apiUrl}/games/${game_id}/reveal.json`, {
        x, y
      })
      .then(function (response) {
        console.log(response.data)
        self.getGames()
        self.game = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
    },

    flag(game_id, status, x, y) {
      var self=this;
      axios.post(`${apiUrl}/games/${game_id}/flag.json`, {
        status, x, y
      })
      .then(function (response) {
        console.log(response.data)
        self.game = response.data
      })
      .catch(function (error) {
        console.log(error);
      })
    },

    getGame(game_id) {
      var self=this;
      axios.get(`${apiUrl}/games/${game_id}.json`)
      .then(function (response) {
        self.game = response.data;
        console.log(self.game.cells)
      })
      .catch(function (error) {
        console.log(error);
      })
    },

    getGames() {
      var self=this;
      axios({
        method: 'get',
        url: `${apiUrl}/games.json`
      })
      .then(function (response) {
        self.games = response.data;
        console.log(self.games.cells)
      })
      .catch(function (error) {
        console.log(error);
      })
    },

    findCell(x, y) {
      // var self=this;
      // return self.game.cells.find(function (cell) {
      //   return cell.x == x && cell.y == y
      // })
      return this.game.cells.filter(cell => {
        return cell.x == x & cell.y == y
      })[0]
    }
  },
  mounted() {
    this.getGames()
  }
})