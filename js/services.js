'use strict';

angular.module("customServices", [])
  .factory("sendOrder", function ($http) {
    return {
      post: function(data) {
        return $http.post("/order/create/", data)
      }
    }
  })
