
var myApp = angular.module("myApp", ["ngRoute"]);
myApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "./views/home.html",
    })
    .when("/shop", {
      templateUrl: "./views/shop.html",
    })
    .when("/contact", {
      templateUrl: "./views/contact.html",
    })
    .when("/blog", {
      templateUrl: "./views/blog.html",
    })
    .when("/about", {
      templateUrl: "./views/about.html",
    })
    .when("/detail", {
      templateUrl: "./views/detail.html",
    });
});
myApp.run(function ($rootScope, $http) {
  var vm = this;

  $http({
    method: 'GET',
    url: 'https://raw.githubusercontent.com/chhotboy000.github.io/front-end/data/data.json'
  }).then(function successCallback(response) {
    // Xử lý phản hồi thành công từ server
    $rootScope.data = response.data.details;
    console.log($rootScope.data);
  }, function errorCallback(response) {
    // Xử lý phản hồi thất bại từ server
    console.log('Lỗi khi lấy dữ liệu:');
  });

});
// factory
myApp.factory("myService", function () {
  var savedData = {};
  var saveType = "";
  // set data product
  function set(data) {
    savedData = data;
  }
  function get() {
    return savedData;
  }
  myApp.config(['$provide', function ($provide) {
    $provide.decorator('$templateRequest', ['$delegate', function ($delegate) {

      var fn = $delegate;

      $delegate = function (tpl) {

        for (var key in fn) {
          $delegate[key] = fn[key];
        }

        return fn.apply(this, [tpl, true]);
      };

      return $delegate;
    }]);
  }]);
  // save type product
  function setTypeProduct(type) {
    saveType = type;
  }
  function getTypeproduct() {
    return saveType;
  }

  return {
    set: set,
    get: get,
    setTypeProduct: setTypeProduct,
    getTypeproduct: getTypeproduct,
  };
});
// nav constroller
myApp.controller("navCtrl", function ($scope) {
  $scope.showNavbar = function () {
    $(".nav").hide();
    $(".nav-sidebar").show();

  }
  $scope.hidenNavbar = function () {
    $(".nav").show();
    $(".nav-sidebar").hide();

  }
})
// home controller
myApp.controller("homeCtrl", function ($scope, myService) {
  let fade = document.querySelectorAll(".fade");

  let index = 0;

  $scope.next = function () {
    fade[index].classList.remove("show");
    index = (index + 1) % fade.length;
    fade[index].classList.add("show");
  };

  $scope.prev = function () {
    fade[index].classList.remove("show");
    index = (index - 1 + fade.length) % fade.length;
    fade[index].classList.add("show");
  };
  // save data to myService
  $scope.saveData = function (data) {
    myService.set(data);
  };
  // save type to myserevice
  $scope.saveType = function (type) {
    myService.setTypeProduct(type);
  };
});
// shop controller
myApp.controller("shopCtrl", function ($scope, $http, myService) {
  // get type from myservice
  $scope.typeProduct = myService.getTypeproduct();
  $scope.filter = "";
  // get data from filr json
  $http({
    method: 'GET',
    url: 'https://raw.githubusercontent.com/chhotboy000.github.io/front-end/data/data.json'
  }).then(function successCallback(response) {
    // Xử lý phản hồi thành công từ server
    $scope.listProduct = response.data.details;

  }, function errorCallback(response) {
    // Xử lý phản hồi thất bại từ server
    console.log('Lỗi khi lấy dữ liệu:');
  });





  // varible nagination page
  ($scope.listProduct = []);
  ($scope.currentPage = 1),
    ($scope.pageSize = 12)





  // get type from myservice

  $scope.filter = $scope.typeProduct;
  console.log($scope.filter)
  $scope.getType = function (typeProduct) {
    console.log(typeProduct);
    $scope.type = typeProduct
  }
  $scope.orderfilEgg = function (egg) {
    $scope.egg = egg
  }

  //




  // save item data  myservice
  $scope.saveData = function (item) {
    myService.set(item);
  };

  // range input change background by price
  const rangeInputs = document.querySelectorAll('input[type="range"]');

  function handleInputChange(e) {
    let target = e.target;
    if (e.target.type !== "range") {
      target = document.getElementById("range");
    }
    const min = target.min;
    const max = target.max;
    const val = target.value;

    target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
  }

  rangeInputs.forEach((input) => {
    input.addEventListener("input", handleInputChange);
  });
  // filter product from data
});

// contact controller
myApp.controller("contactCtrl", function ($scope) { });
// detail controller
myApp.controller("detailCtrl", function ($scope, myService) {
  // get  data from myservice
  $scope.data = myService.get();

  $scope.data.image == null
    ? ($scope.data.image =
      "../images/Cute_girl_bakery_logo_homemade_bakery_shop_hand_drawn_cartoon_art_illustration.jpg")
    : null;

  // get by class tag
  let contentBody = document.querySelector(".content-product-body");
  let btnDown = document.querySelector(".content-product__down");
  let btnUp = document.querySelector(".content-product__up");
  // show hiden content  body Product
  $scope.showContent = function () {
    contentBody.classList.add("product-active");

    btnDown.classList.add("hiden-btn");

    btnUp.classList.remove("hiden-btn");
    btnUp.classList.add("show-btn");
  };
  $scope.hidenContent = function () {
    contentBody.classList.remove("product-active");

    btnDown.classList.add("show-btn");
    btnDown.classList.remove("hiden-btn");

    btnUp.classList.add("hiden-btn");
    btnUp.classList.remove("show-btn");
  };
  // zoom img product

  let magnifying_area = document.getElementById("magnifying_area");
  let magnifying_img = document.getElementById("magnifying_img");
  magnifying_area.addEventListener("mousemove", function (event) {
    let clientX = event.clientX - magnifying_area.offsetLeft;
    let clinetY = event.clientY - magnifying_area.offsetTop;

    mWidth = magnifying_area.offsetWidth;
    mHeight = magnifying_area.offsetHeight;

    clientX = (clientX / mWidth) * 100;
    clinetY = (clinetY / mWidth) * 100;

    magnifying_img.style.transform =
      "translate(-" + clientX + "%,-" + clinetY + "%) scale(2.4)";
  });
  magnifying_area.addEventListener("mouseleave", function () {
    magnifying_img.style.transform = "translate(-50%,-50%) scale(1)";
  });
});
myApp.controller("aboutCtrl", function ($scope) {

})

// //about (bien cua danh)
myApp.controller("aboutCtrl", function ($scope) {
  // get by class tag
  let btnDown1 = document.querySelector("#btn-down1");
  let btnDown2 = document.querySelector("#btn-down2");
  let btnDown3 = document.querySelector("#btn-down3");

  let btnUp1 = document.querySelector("#btn-up1");
  let btnUp2 = document.querySelector("#btn-up2");
  let btnUp3 = document.querySelector("#btn-up3");

  let showtask2 = document.querySelector("#task2");
  let showtask3 = document.querySelector("#task3");
  let showtask1 = document.querySelector("#task1");
  // show hiden content  body Product
  $scope.showContent1 = function () {
    btnDown1.classList.add("hiden-btn");

    btnUp1.classList.remove("hiden-btn");
    showtask1.classList.add("show-btn");

  };
  $scope.hidenContent1 = function () {
    btnDown1.classList.add("show-btn");
    btnDown1.classList.remove("hiden-btn");

    btnUp1.classList.add("hiden-btn");
    btnUp1.classList.remove("show-btn");
    showtask1.classList.remove("show-btn");
  };


  $scope.showContent2 = function () {
    btnDown2.classList.add("hiden-btn");

    btnUp2.classList.remove("hiden-btn");
    btnUp2.classList.add("show-btn");
    showtask2.classList.add("show-btn");
  };
  $scope.hidenContent2 = function () {
    btnDown2.classList.add("show-btn");
    btnDown2.classList.remove("hiden-btn");

    btnUp2.classList.add("hiden-btn");
    btnUp2.classList.remove("show-btn");
    showtask2.classList.remove("show-btn");
  };


  $scope.showContent3 = function () {
    btnDown3.classList.add("hiden-btn");

    btnUp3.classList.remove("hiden-btn");
    btnUp3.classList.add("show-btn");
    showtask3.classList.add("show-btn");
  };
  $scope.hidenContent3 = function () {
    btnDown3.classList.add("show-btn");
    btnDown3.classList.remove("hiden-btn");

    btnUp3.classList.add("hiden-btn");
    btnUp3.classList.remove("show-btn");
    showtask3.classList.remove("show-btn");
  };
});

;

//scroll to top
const button = document.querySelector('button')
const div = document.querySelector('div')
button.addEventListener('click', () => {
  window.scrollTo(0, 0);
})

button.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: `smooth`
  })
})
