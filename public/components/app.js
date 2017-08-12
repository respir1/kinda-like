const gameApp = angular.module('gameApp', [])
  .controller('gameCtrl', ['searchSvs', function searchCtrl(searchSvs) {
    this.searchTerm = '';
    this.gameList = '';
    this.getResults = (data) => {
      this.gameList = data;
      console.log(this.gameList, 'gameList');
    }
    this.getSearch = (searchTerm) => {
      console.log(searchTerm, 'search term');
      searchSvs.fetchSearch(searchTerm, this.getResults);
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
