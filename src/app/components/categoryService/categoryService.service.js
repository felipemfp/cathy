(function() {
  'use_strict';

  angular
    .module('cathy')
    .factory('categoryService', categoryService);

  /** @ngInject */
  function categoryService($rootScope, $http, $log, catherineAPI) {
    var apiHost = catherineAPI.apiHost;

    var service = {
      add: add,
      update: update,
      remove: remove,
      get: get
    };

    return service;

    function add(name, icon_id, callback) {
      return $http.post(apiHost + '/api/' + $rootScope.globals.currentUser.username + '/categories/', {
        name: name,
        icon_id: icon_id
      }).then(addComplete).catch(addFailed);

      function addComplete(response) {
        callback(response.data);
      }

      function addFailed(error) {
        $log.error('XHR Failed for add.\n' + angular.toJson(error.data, true));
        callback(error);
      }
    }

    function get(id, callback) {
      if (id) {
        return $http.get(apiHost + '/api/' + $rootScope.globals.currentUser.username + '/categories/' + id)
          .then(getComplete).catch(getFailed);
      } else {
        return $http.get(apiHost + '/api/' + $rootScope.globals.currentUser.username + '/categories/')
          .then(getComplete).catch(getFailed);
      }

      function getComplete(response) {
        callback(response.data);
      }

      function getFailed(error) {
        $log.error('XHR Failed for get.\n' + angular.toJson(error.data, true));
        callback(error);
      }
    }

    function remove(id, callback) {
      return $http.delete(apiHost + '/api/' + $rootScope.globals.currentUser.username + '/categories/' + id)
        .then(removeComplete).catch(removeFailed);

      function removeComplete(response) {
        if (response.status == 200) {
          callback(true);
        }
        else {
          callback(false);
        }
      }

      function removeFailed(error) {
        $log.error('XHR Failed for remove.\n' + angular.toJson(error.data, true));
        callback(error);
      }
    }

    function update(id, category, callback) {
      return $http.put(apiHost + '/api/' + $rootScope.globals.currentUser.username + '/categories/' + id,
          category)
        .then(updateComplete).catch(updateFailed);

      function updateComplete(response) {
        callback(response.data);
      }

      function updateFailed(error) {
        $log.error('XHR Failed for update.\n' + angular.toJson(error.data, true));
        callback(error);
      }
    }
  }
})();
