'use strict';
var app = angular.module("spApp", ['ngRoute', 'ngMessages', 'LocalStorageModule', 'customServices'])
.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/step1', {
    templateUrl: "./samples/step1.html"
  });

  $routeProvider.when('/step2', {
    templateUrl: "/samples/step2.html"
  });

  $routeProvider.otherwise({
    template: '<h2 style="text-align: center;">Создайте, пожалуйста заявку: <a href="/step1">Создать</a></h2>'
  })

})
.config(function (localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('spApp');
})
.controller("step1Ctrl", ['$scope', '$location', 'localStorageService', function ($scope, $location, localStorageService) {

  var oldContact = localStorageService.get('contactValue');

  if (oldContact == null) {
    $scope.contact = {
      name: "",
      email: "",
      country: "",
      company: "",
      description: ""
    };
  } else {
    $scope.contact = oldContact;
  }



  $scope.saveToStorage = function () {
    localStorageService.set('contactValue', $scope.contact);
  };

  $scope.goToStep2 = function() {
    $scope.saveToStorage();
    $location.path('/step2');
  };

  $scope.selectUrl = "samples/countries-list.html";



}])

.controller("step2Ctrl", ['$scope', '$http', 'localStorageService', 'sendOrder', function ($scope, $http, localStorageService, sendOrder) {

  $scope.prods = [
    {
    title: "Cat in bag",
    about: "Mauris blandit aliquet elit, eget magna justo, lacinia eget consectetur sed, convallis at tellus. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
    price: 100
    },
    {
    title: "Pig in poke",
    about: "Mauris blandit aliquet elit, eget magna justo, lacinia eget consectetur sed, convallis at tellus. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
    price: 200
    },
    {
    title: "Pleasant surprise",
    about: "Mauris blandit aliquet elit, eget magna justo, lacinia eget consectetur sed, convallis at tellus. Vivamus suscipit tortor eget felis porttitor volutpat. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
    price: 300
    }
  ];

  $scope.currencies = ["USD", "UAH", "EUR"];

  $scope.selectedCurrency = $scope.currencies[0];

  $scope.convertPrice = function(currency, itemPrice) {
    switch (currency){
      case "USD":
        return "$" + (itemPrice * 1);
      case "EUR":
        return "€" + (itemPrice * 0.87);
      case "UAH":
        return "₴" + (itemPrice * 22.5);
    }
  }

  $scope.isDisabled = true;

  var orderName;
  $scope.chooseItem = function (item) {
    orderName = item;
    $scope.isDisabled = false;
  }
  var chooseBtns = document.getElementsByClassName('choose');
  for (var i = chooseBtns.length - 1; i >= 0; i--) {
    if(chooseBtns[i].addEventListener){
      chooseBtns[i].addEventListener('click', chooseBtnsHandler, false)
    } else if (chooseBtns[i].attachEvent){
      chooseBtns[i].attachEvent('onclick', chooseBtnsHandler);
    }
  };

  function chooseBtnsHandler(){

  }

  $scope.submitOrder = function () {
    var orderData = localStorageService.get('contactValue');
    orderData.currency = $scope.selectedCurrency;
    orderData.orderName = orderName;
    console.log(orderData);
    sendOrder.post(orderData).then(success, rejection)
  }

  $scope.orderStatus = "Сделайте выбор и отправьте заявку";

  function success () {
    $scope.orderStatus = "Заявка успешно отправлена"
  }

  function rejection () {
    $scope.orderStatus = "Заявка отправлена, но не доставлена... Попробуйте позже"
  }

}])
