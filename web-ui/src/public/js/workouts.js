angular.module('root', [])
  .factory('Workouts', ['$http',function($http) {
    return {
      get : function() {
        return $http.get('http://localhost:9000/workout');
      }
    }
  }])
.controller('workouts', ['$scope', '$http', 'Workouts', function ($scope, $http, Workouts) {

    Workouts.get()
      .success(function(data) {
        console.log('Workouts retrieved:', data);
        $scope.workouts = data;
      });
}]);
