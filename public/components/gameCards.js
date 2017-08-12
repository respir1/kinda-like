gameApp.controller('gameCardsCtrl', [ 'searchSvs', function(searchSvs){
  this.gameList = '';
  this.getResults = (data) => {
    console.log(data, 'in search');
    this.gameList = data;
  }
  searchSvs.fetchSearch(null, this.getResults);  
})
.directives('gameCards', () => {
  return {
    scope: {},
    controller: 'gameCardsCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'component/gameCards.html',
  }
});