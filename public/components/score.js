angular.module('gameApp')
  .controller('scoreCtrl', function scoreCtrl(gameSvs) {
    this.userId = localStorage.getItem('userId');
    this.playerScores = '';
    this.getPlayerScores = (data) => {
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
      templateUrl: 'components/score.html',
    };
  });
