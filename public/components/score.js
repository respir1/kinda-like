angular.module('gameApp')
  .controller('scoreCtrl', [ 'gameSvs', function scoreCtrl(gameSvs) {
    this.userId = localStorage.getItem('userId');
    this.playerScores = [];
    this.getPlayerScores = (data) => {
      this.playerScores = data;
    }
    gameSvs.getScore(this.userId, this.getPlayerScores);  
  }])
  // .directives('score', () => {
  //   return {
  //     scope: {},
  //     controller: 'scoreCtrl',
  //     controllerAs: 'ctrl',
  //     bindToController: true,
  //     templateUrl: 'component/score.html',
  //   };
  // });
