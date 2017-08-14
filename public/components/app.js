const gameApp = angular.module('gameApp', [])
  .controller('gameCtrl', ['gameSvs', function gameCtrl(gameSvs) {
    this.searchTerm = '';
    this.gameList = '';
    this.counter = 0;
    this.userID = localStorage.getItem('userId');
    this.lastScore = '';
    this.countdown = (minutes) => {
      const seconds = 120;
      const mins = minutes
      function tick() {
        const counter = document.getElementById("counter");
        const current_minutes = mins-1
        seconds--;
        counter.innerHTML = "TIMER: " + (seconds < 10 ? "0" : "") + String(seconds) + " seconds left";
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else {
            if(mins > 1){
                countdown(mins-1);           
            }
        }
      }
      tick();
    }

    this.getResults = (data) => {
      data.map((media) => {  media.score = 0; } );
      this.gameList = data;
      console.log(this.gameList, 'gameList');
    };
    this.getSearch = (searchTerm) => {
      console.log(searchTerm, 'search term');
      this.searchTerm = searchTerm;
      gameSvs.fetchSearch(searchTerm, this.getResults);
      this.countdown();
    };
    this.ansRight = (e) => {
      this.counter += 1;
      e.score = this.counter;
      document.getElementById(`${e.Name}`).style.background = '#ECFF33';
      console.log(e, 'score:', this.counter);
    };
    this.playNewGame = () => {
      document.getElementById('myModal').style.display = 'none';
      this.searchTerm = '';
      this.gameList = '';
    };
    this.goToLastGame = () => {
      document.getElementById('myModal').style.display = 'none';
    };

    this.getLastScore = (lastGame) => {
      this.lastScore = lastGame;
      console.log(this.lastScore, 'recent score');
    };
    this.submitScore = () => {
      document.getElementById('myModal').style.display = 'block';
      const scoreData = {
        score: this.counter * 5,
        gameTitle: this.searchTerm,
        userId: this.userID,
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
