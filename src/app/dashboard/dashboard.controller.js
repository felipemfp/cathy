(function() {
  'use strict';

  angular
    .module('cathy')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController($log, $mdToast, $mdDialog, categoryService, personService) {
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
    vm.showCategoryDialog = showCategoryDialog;

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

    function showCategoryDialog(category) {
      $mdDialog.show({
          controller: CategoryDialogController,
          controllerAs: 'categoryDialog',
          templateUrl: 'app/dashboard/categorydialog.tmpl.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          locals: {
            category: category
          }
        })
        .then(function(updateName) {
          if (updateName) {
            category.name = updateName;
            categoryService.updateCategory(category.category_id, category);
          } else {
            var confirm = $mdDialog.confirm()
              .title('Would you like to delete this category?')
              .textContent('All of the transactions with "' + category.name + '" category will be removed too.')
              .ariaLabel('Delete Category')
              .ok('Yes, sure')
              .cancel('Cancel');
            $mdDialog.show(confirm).then(function() {
              categoryService.removeCategory(category.category_id).then(function() {
                $mdDialog.hide();
                getCategories();
              });
            }, function() {
              $mdDialog.cancel();
            });
          }
        });
    }

    getPeople();
    getCategories();
  }

  function CategoryDialogController($log, $mdDialog, categoryService, category) {
    var vm = this;

    vm.currentName = category.name;
    vm.updateName = category.name;

    vm.cancel = function() {
      $mdDialog.cancel();
    };

    vm.update = function() {
      $mdDialog.hide(vm.updateName);
    };

    vm.remove = function() {
      $mdDialog.hide();
    };
  }
})();
