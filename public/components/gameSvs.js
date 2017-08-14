gameApp.service('gameSvs', function ($http) {
    this.fetchSearch = ((searchTerm, cb) => {
      $http.post('/search', { searchTerm })
        .then(({ data }) => {
          if(cb){
            cb(data);
            }
          }, (err) => {
          console.error(err);
        });
    });

    this.postScore = (scoreData, cb) => {
      console.log(scoreData, 'in service')
      $http.post('/scores', scoreData)
        .then(({ data }) => {
          cb(data);
        }, (err) => {
        console.error(err);
        });
    }

    this.getScore = (userID, cb) => {
      $http.get('/scores', {
        params: { userId: userID },
      }).then(({ data }) => {
        cb(data);
      }, (err) => {
        console.error(err);
      });
    };

  });

