angular.module('gameApp')
  .service('searchSvs', function ($http) {
    this.fetchSearch = ((searchTerm, cb) => {
      $http.post('/search', { searchTerm })
        .then(function success({ data }){
            if(cb){
              cb(data);
            }
          }, function error(err){
              console.error(err);
          });
        });
    });

