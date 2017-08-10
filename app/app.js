var gameApp = angular.module('gameApp', [])
  .controller('searchCtrl', function($http){
    this.searchTerm;
    this.getSearch = (searchTerm) => {
      console.log('hit');
      this.searchTerm = searchTerm;
      console.log(this.searchTerm);
    }
    console.log(searchTerm, 'searchTerm');
    // $http.post
  })
  .directive('search', () => {
    return {
      controller:'logingController',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: 'public/home.html',
    }
  });