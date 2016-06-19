(function() {
  'use strict';

  angular
    .module('cathy')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController($log, $mdToast, categoryService, personService) {
    var vm = this;

    vm.person = {
      name: ""
    };
    vm.category = {
      name: "",
      icon: ""
    };
    vm.people = [];
    vm.categories = [];
    vm.newPerson = newPerson;
    vm.newCategory = newCategory;

    function newCategory() {
      var name = vm.category.name;
      var icon = vm.category.icon;
      categoryService.addCategory(name, icon).then(function(dataFetched) {
        if (dataFetched) {
          vm.category = {
            name: "",
            icon: ""
          };
          getCategories();
        } else {
          $mdToast.show(
            $mdToast.simple()
            .textContent('Something is wrong!')
            .hideDelay(3000)
          );
        }
      });
    }

    function getCategories() {
      categoryService.getCategories().then(function(dataFetched) {
        if (dataFetched) {
          vm.categories = dataFetched.categories;
        } else {
          $mdToast.show(
            $mdToast.simple()
            .textContent('Something is wrong!')
            .hideDelay(3000)
          );
        }
      });
    }

    function newPerson() {
      var name = vm.person.name;
      personService.addPerson(name).then(function(dataFetched) {
        if (dataFetched) {
          vm.person = {
            name: ""
          };
          getPeople();
        } else {
          $mdToast.show(
            $mdToast.simple()
            .textContent('Something is wrong!')
            .hideDelay(3000)
          );
        }
      });
    }

    function getPeople() {
      personService.getPeople().then(function(dataFetched) {
        if (dataFetched) {
          vm.people = dataFetched.people;
        } else {
          $mdToast.show(
            $mdToast.simple()
            .textContent('Something is wrong!')
            .hideDelay(3000)
          );
        }
      });
    }

    getPeople();
    getCategories();
  }
})();
