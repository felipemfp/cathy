(function() {
  'use_strict';

  angular
    .module('cathy')
    .factory('personService', personService);

  /** @ngInject */
  function personService($rootScope, $http, $log, catherineAPI) {
    var apiHost = catherineAPI.apiHost;

    var service = {
      addPerson: add,
      updatePerson: update,
      removePerson: remove,
      getPeople: get
    };

    return service;

    function add(name) {
      return $http.post(apiHost + '/api/people/' + $rootScope.globals.currentUser.username + '/', {
        name: name
      }).then(addComplete).catch(addFailed);

      function addComplete(response) {
        return response.data;
      }

      function addFailed(error) {
        $log.error('XHR Failed for add.\n' + angular.toJson(error.data, true));
      }
    }

    function get(id) {
      if (id) {
        return $http.get(apiHost + '/api/people/' + $rootScope.globals.currentUser.username + '/' + id + '/')
          .then(getComplete).catch(getFailed);
      } else {
        return $http.get(apiHost + '/api/people/' + $rootScope.globals.currentUser.username + '/')
          .then(getComplete).catch(getFailed);
      }

      function getComplete(response) {
        return response.data;
      }

      function getFailed(error) {
        $log.error('XHR Failed for get.\n' + angular.toJson(error.data, true));
      }
    }

    function remove(id) {
      return $http.delete(apiHost + '/api/people/' + $rootScope.globals.currentUser.username + '/' + id + '/')
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

    function update(id, person) {
      return $http.put(apiHost + '/api/people/' + $rootScope.globals.currentUser.username + '/' + id + '/',
          person)
        .then(updateComplete).catch(updateFailed);

      function updateComplete(response) {
        return response.data;
      }

      function updateFailed(error) {
        $log.error('XHR Failed for update.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();
