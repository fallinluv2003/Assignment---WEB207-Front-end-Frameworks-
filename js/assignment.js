var app = angular.module("abc", ['angularUtils.directives.dirPagination']);
app.controller("abc-ctrl", function ($scope, $http) {
  // Tạo hàm lấy list sản phẩm
  var getProduct = function() {
    $http.get("https://63ec4e6531ef61473b2049bb.mockapi.io/ph28436/do-duong-da").then(function (response) {
      $scope.products = response.data;
    });
  }

  getProduct();

  $scope.getDetailProducts = function (id) {
    $http.get("https://63ec4e6531ef61473b2049bb.mockapi.io/ph28436/do-duong-da/" + id).then(function (response) {
        // Xem chi tiết theo Id
        $scope.getProductById = response.data;
      });
  };

  function getData() {
    var data = {
      "name": $scope.name,
      "price": $scope.price,
    }

    var isValid = true;
      if ($scope.name == "") {
        alert("Please enter a name");
        isValid = false;
      }
      if ($scope.price == null) {
        alert("Please enter a price");
        isValid = false;
      }
      if (isValid == true) {
        return data;
      } else {
        return null;
      }
  }
  
  $scope.add = function() {
    if(getData() != null) {
      $http.post("https://63ec4e6531ef61473b2049bb.mockapi.io/ph28436/do-duong-da", getData()).then(function(response) {  
        getProduct();
        alert("Added");
      });
      console.log(getData()); 
    }
  }

  $scope.update = function(id) {
    if(getData() != null) {
      $http.put("https://63ec4e6531ef61473b2049bb.mockapi.io/ph28436/do-duong-da/" + id, getData()).then(function(response) {
        getProduct();
        alert("Updated");
    });
    }
  }

  $scope.delete = function(id) {
    $http.delete("https://63ec4e6531ef61473b2049bb.mockapi.io/ph28436/do-duong-da/" + id).then(function(response) {
    $scope.products.splice(id, 1);
    alert("Deleted");    
    getProduct();
  });
  }

  $scope.products = [];

$scope.searchProductByName = function(name) {
  $http.get("https://63ec4e6531ef61473b2049bb.mockapi.io/ph28436/do-duong-da?name=" + name).then(function(response) {
    $scope.products = response.data;
  });
};

$scope.$watch('searchQuery', function(newVal, oldVal) {
  if (newVal !== oldVal) {
    $scope.searchProductByName(newVal);
  }
});

});