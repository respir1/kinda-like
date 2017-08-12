angular.module('gameApp')
  .service('searchSvs', function ($http) {
    this.fetchSearch = ((searchTerm, cb) => {
      $http.post('/search', { searchTerm })
        .then(function success({ data }){
            if(cb){
              cb(data);
            }
          }, (err) => {
          console.error(err);
        });
    });

      this.postScore = (scoreData) => {
        console.log(scoreData, 'in service')
        $http.post('/scores', scoreData)
          .then((data) => {
            console.log(data);
          }, (err) => {
            console.error(err);
          })
      }

  });

