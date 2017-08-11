angular.module('gameApp', [])
  .controller('appCtrl', function(){
  })
  .directive('app', () => {
    return {
      scope:{},
      controller:'appCtrl',
      controllerAs: 'ctrl',
      bindToController: true,
      templateUrl: 'app/search.html',
    }
  });