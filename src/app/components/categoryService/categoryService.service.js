(function() {
  'use_strict';

  angular
    .module('cathy')
    .factory('categoryService', categoryService);

  /** @ngInject */
  function categoryService($rootScope, $http, $log, catherineAPI) {
    var apiHost = catherineAPI.apiHost;

    var service = {
      addCategory: add,
      updateCategory: update,
      removeCategory: remove,
      getCategories: get
    };

    return service;

    function add(name, icon) {
      if (!icon) {
        icon = 'label';
      }

      return $http.post(apiHost + '/api/categories/' + $rootScope.globals.currentUser.username + '/', {
        name: name,
        icon: icon
      }).then(addComplete).catch(addFailed);

      function addComplete(response) {
        $log.info(response.data);
        return response.data;
      }

      function addFailed(error) {
        $log.error('XHR Failed for add.\n' + angular.toJson(error.data, true));
      }
    }

    function get(id) {
      if (id) {
        return $http.get(apiHost + '/api/categories/' + $rootScope.globals.currentUser.username + '/' + id + '/')
          .then(getComplete).catch(getFailed);
      } else {
        return $http.get(apiHost + '/api/categories/' + $rootScope.globals.currentUser.username + '/')
          .then(getComplete).catch(getFailed);
      }

      function getComplete(response) {
        $log.info(response.data);
        return response.data;
      }

      function getFailed(error) {
        $log.error('XHR Failed for get.\n' + angular.toJson(error.data, true));
      }
    }

    function remove(id) {
      return $http.delete(apiHost + '/api/categories/' + $rootScope.globals.currentUser.username + '/' + id + '/')
        .then(removeComplete).catch(removeFailed);

      function removeComplete(response) {
        if (response.status == 200) {
          return true;
        }
        else {
          return false;
        }
      }

      function removeFailed(error) {
        $log.error('XHR Failed for remove.\n' + angular.toJson(error.data, true));
      }
    }

    function update(id, category) {
      if (!category.icon) {
        category.icon = 'label';
      }

      return $http.put(apiHost + '/api/categories/' + $rootScope.globals.currentUser.username + '/' + id + '/',
          category)
        .then(updateComplete).catch(updateFailed);

      function updateComplete(response) {
        return response.data;
        $log.info(response.data);
      }

      function updateFailed(error) {
        $log.error('XHR Failed for update.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();
