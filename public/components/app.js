const gameApp = angular.module('gameApp', [])
  .controller('gameCtrl', ['gameSvs', function gameCtrl(gameSvs) {
    this.searchTerm = '';
    this.gameList = '';
    this.counter = 0;
    this.userID = 0;
    this.getResults = (data) => {
      this.gameList = data;
      console.log(this.gameList, 'gameList');
    };
    this.getSearch = (searchTerm) => {
      console.log(searchTerm, 'search term');
      this.searchTerm = searchTerm;
      gameSvs.fetchSearch(searchTerm, this.getResults);
    };
    this.ansRight = (e) => {
      this.counter += 1;
      console.log(e, 'score:', this.counter);
    };
    this.submitScore = () => {
      const scoreData = {
        score: this.counter * 10,
        gameTitle: this.searchTerm,
        userId: localStorage.getItem('userId'),
      };
      gameSvs.postScore(scoreData);
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
