angular.module('gameApp')
  .controller('scoreCtrl', function scoreCtrl(gameSvs) {
    this.userId = localStorage.getItem('userId');
    this.playerScores = '';
    this.getPlayerScores = (data) => {
      data.map((score) => {
        score.gameTitle = score.gameTitle.toUpperCase().slice(0, 1) + score.gameTitle.slice(1);
      });
      this.playerScores = data;
      console.log(this.playerScores, 'player scores');
    }
    gameSvs.getScore(this.userId, this.getPlayerScores.bind(this));  
  })
  .directive('score', () => {
    return {
      scope: {},
      controller: 'scoreCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      template:
        `<ul class="list-group" ng-repeat="score in ctrl.playerScores" style="background-color: white">
          <a href="#" class="list-group-item">GAME: <b>{{score.gameTitle}}</b><span style="float:right">SCORE: <b>{{score.score}}</b></span></a>
        </ul> `
    };
  });
