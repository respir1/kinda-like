const gameApp = angular.module('gameApp', [])
  .controller('gameCtrl', ['gameSvs', function gameCtrl(gameSvs) {
    this.searchTerm = '';
    this.gameList = '';
    this.counter = 0;
    this.userID = 0;
    this.seconds = 47;
    this.lastScore = '';
    this.startTimer = () => {}
    this.getResults = (data) => {
      data.map((media) => {  media.score = 0; } );
      this.gameList = data;
      console.log(this.gameList, 'gameList');
      // setInterval(this.startTimer, 1000);
    };
    this.getSearch = (searchTerm) => {
      console.log(searchTerm, 'search term');
      this.searchTerm = searchTerm;
      gameSvs.fetchSearch(searchTerm, this.getResults);
    };
    this.ansRight = (e) => {
      this.counter += 1;
      e.score = this.counter;
      document.getElementById(`${e.Name}`).style.background = '#ECFF33';
      console.log(e, 'score:', this.counter);
    };
    this.playNewGame = () => {
      document.getElementById('myModal').style.display = 'none';
    };
    this.goToLastGame = () => {
      document.getElementById('myModal').style.display = 'none';
      this.searchTerm = '';
      this.gameList = '';
    };

    this.getLastScore = (lastGame) => {
      this.lastScore = lastGame;
      console.log(this.lastScore, 'recent score');
    };
    this.submitScore = (e) => {
      document.getElementById('myModal').style.display = 'block';
      const scoreData = {
        score: this.counter * 10,
        gameTitle: this.searchTerm,
        userId: localStorage.getItem('userId'),
      };
      gameSvs.postScore(scoreData, this.getLastScore.bind(this));
      this.counter = 0;
    };
  }])
  .directive('game', () => {
    return {
      scope: {},
      controller: 'gameCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: 'components/game.html',
    };
  });
