angular.module('gameApp')
  .service('searchSvs', ($http) => {
    this.fetchSearch = (searchTerm) => {
      $http.post('/search', { searchTerm })
        .then(({ data }) => {
        console.log(data, 'api result');
            // cb(data);
        }, (err) => {
        console.error(err);
      });
    };
  });

