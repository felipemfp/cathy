(function() {
  'use strict';

  angular
    .module('cathy')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController($log, categoryService) {
    var vm = this;

    vm.category = {
      name: "",
      icon: ""
    };
    vm.categories = [];
    vm.newCategory = newCategory;

    function newCategory() {
      var name = vm.category.name;
      var icon = vm.category.icon;
      categoryService.addCategory(name, icon).then(function() {
        vm.category = {
          name: "",
          icon: ""
        };
        getCategories();
      });
    }

    function getCategories() {
      categoryService.getCategories().then(function(dataFetched) {
        vm.categories = dataFetched.categories;
      });
    }

    getCategories();
  }
})();
