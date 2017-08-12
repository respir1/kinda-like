const gameApp = angular.module('gameApp', [])
  .controller('searchCtrl', ['searchSvs', function searchCtrl(searchSvs) {
    this.searchTerm = '';
    this.getSearch = (search) => {
      this.searchTerm = search;
      console.log(this.searchTerm);
      searchSvs.fetchSearch(this.searchTerm);
    };
  }])
  .directive('search', () => {
    return {
      scope: {},
      controller: 'searchCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: 'components/search.html',
    };
  });
