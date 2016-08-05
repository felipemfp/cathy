!function(){"use strict";angular.module("cathy",["ngCookies","ngRoute","ngMaterial","ngMessages","angular-loading-bar","ngAnimate"])}(),function(){"use_strict";function e(e,t,n,a){function o(n,o,i,l){function c(e){200==e.status?a.login(o,i,l):l(!1)}function s(e){t.error("XHR Failed for register.\n"+angular.toJson(e.data,!0)),l(!1)}return e.post(r+"/api/users/",{name:n,username:o,password:i}).then(c)["catch"](s)}var r=n.apiHost,i={register:o};return i}e.$inject=["$http","$log","catherineAPI","authenticationService"],angular.module("cathy").factory("userService",e)}(),function(){"use_strict";function e(e,t,n,a){function o(a){function o(e){return e.data}function r(e){n.error("XHR Failed for add.\n"+angular.toJson(e.data,!0))}return t.post(c+"/api/people/"+e.globals.currentUser.username+"/",{name:a}).then(o)["catch"](r)}function r(a){function o(e){return e.data}function r(e){n.error("XHR Failed for get.\n"+angular.toJson(e.data,!0))}return a?t.get(c+"/api/people/"+e.globals.currentUser.username+"/"+a+"/").then(o)["catch"](r):t.get(c+"/api/people/"+e.globals.currentUser.username+"/").then(o)["catch"](r)}function i(a){function o(e){return 200==e.status?!0:!1}function r(e){n.error("XHR Failed for remove.\n"+angular.toJson(e.data,!0))}return t["delete"](c+"/api/people/"+e.globals.currentUser.username+"/"+a+"/").then(o)["catch"](r)}function l(a,o){function r(e){return e.data}function i(e){n.error("XHR Failed for update.\n"+angular.toJson(e.data,!0))}return t.put(c+"/api/people/"+e.globals.currentUser.username+"/"+a+"/",o).then(r)["catch"](i)}var c=a.apiHost,s={addPerson:o,updatePerson:l,removePerson:i,getPeople:r};return s}e.$inject=["$rootScope","$http","$log","catherineAPI"],angular.module("cathy").factory("personService",e)}(),function(){"use strict";function e(){function e(e,t){function n(){t.clearToken(),e.path("/")}var a=this;a.signOut=n}e.$inject=["$location","authenticationService"];var t={restrict:"E",templateUrl:"app/components/navbar/navbar.html",controller:e,controllerAs:"navbar",bindToController:!0};return t}angular.module("cathy").directive("cathyNavbar",e)}(),function(){"use_strict";function e(){var e="http://catherine-api.herokuapp.com",t={apiHost:e};return t}angular.module("cathy").factory("catherineAPI",e)}(),function(){"use_strict";function e(e,t,n,a){function o(a,o){function r(e){return e.data}function i(e){n.error("XHR Failed for add.\n"+angular.toJson(e.data,!0))}return o||(o="label"),t.post(c+"/api/categories/"+e.globals.currentUser.username+"/",{name:a,icon:o}).then(r)["catch"](i)}function r(a){function o(e){return e.data}function r(e){n.error("XHR Failed for get.\n"+angular.toJson(e.data,!0))}return a?t.get(c+"/api/categories/"+e.globals.currentUser.username+"/"+a+"/").then(o)["catch"](r):t.get(c+"/api/categories/"+e.globals.currentUser.username+"/").then(o)["catch"](r)}function i(a){function o(e){return 200==e.status?!0:!1}function r(e){n.error("XHR Failed for remove.\n"+angular.toJson(e.data,!0))}return t["delete"](c+"/api/categories/"+e.globals.currentUser.username+"/"+a+"/").then(o)["catch"](r)}function l(a,o){function r(e){return e.data}function i(e){n.error("XHR Failed for update.\n"+angular.toJson(e.data,!0))}return o.icon||(o.icon="label"),t.put(c+"/api/categories/"+e.globals.currentUser.username+"/"+a+"/",o).then(r)["catch"](i)}var c=a.apiHost,s={addCategory:o,updateCategory:l,removeCategory:i,getCategories:r};return s}e.$inject=["$rootScope","$http","$log","catherineAPI"],angular.module("cathy").factory("categoryService",e)}(),function(){"use_strict";function e(e,t,n,a,o,r){function i(n,a,o){function r(e){var t=e.data.token;l(t),o(!0)}function i(e){t.error("XHR Failed for login.\n"+angular.toJson(e.data,!0)),o(!1)}return e.post(d+"/api/login/",{username:n,password:a}).then(r)["catch"](i)}function l(t){var o=s(t);a.globals={currentUser:{name:o.name,username:o.username,token:t}},e.defaults.headers.common.Authorization="Bearer "+t,n.putObject("globals",a.globals)}function c(){a.globals={},e.defaults.headers.common.Authorization="",n.remove("globals")}function s(e){var t=e.split(".")[1],n=t.replace("-","+").replace("_","/");return angular.fromJson(o.atob(n))}var d=r.apiHost,m={login:i,setToken:l,clearToken:c,parseJwt:s};return m}e.$inject=["$http","$log","$cookies","$rootScope","$window","catherineAPI"],angular.module("cathy").factory("authenticationService",e)}(),function(){"use strict";function e(e,t,n,a,o,r){function i(){var e=c.register.name,r=c.register.username,i=c.register.password;e&&r&&i?o.register(e,r,i,function(e){e===!0?(t.show(t.simple().textContent(a.globals.currentUser.name+" registered and logged.").hideDelay(3e3)),n.path("/dashboard")):t.show(t.simple().textContent("Something is wrong!").hideDelay(3e3))}):t.show(t.simple().textContent("Both name, username and password are required.").hideDelay(3e3))}function l(){var e=c.username,o=c.password;e&&o?r.login(e,o,function(e){e===!0?(t.show(t.simple().textContent(a.globals.currentUser.name+" logged.").hideDelay(3e3)),n.path("/dashboard")):t.show(t.simple().textContent("Username and password does not match.").hideDelay(3e3))}):t.show(t.simple().textContent("Both username and password are required.").hideDelay(3e3))}var c=this;c.register={},c.signUp=i,c.signIn=l}e.$inject=["$log","$mdToast","$location","$rootScope","userService","authenticationService"],angular.module("cathy").controller("MainController",e)}(),function(){"use strict";function e(e,a,o,r,i){function l(){var e=g.category.name,t=g.category.icon;r.addCategory(e,t).then(function(e){e?(g.category={name:"",icon:""},c()):a.show(a.simple().textContent("Something is wrong!").hideDelay(3e3))})}function c(){r.getCategories().then(function(e){e?g.categories=e.categories:a.show(a.simple().textContent("Something is wrong!").hideDelay(3e3))})}function s(){var e=g.person.name;i.addPerson(e).then(function(e){e?(g.person={name:""},d()):a.show(a.simple().textContent("Something is wrong!").hideDelay(3e3))})}function d(){i.getPeople().then(function(e){e?g.people=e.people:a.show(a.simple().textContent("Something is wrong!").hideDelay(3e3))})}function m(e){o.show({controller:t,controllerAs:"categoryDialog",templateUrl:"app/dashboard/categorydialog.tmpl.html",parent:angular.element(document.body),clickOutsideToClose:!0,locals:{category:e}}).then(function(t){if(t)e.name=t,r.updateCategory(e.category_id,e);else{var n=o.confirm().title("Would you like to delete this category?").textContent('All of the transactions with "'+e.name+'" category will be removed too.').ariaLabel("Delete Category").ok("Yes, sure").cancel("Cancel");o.show(n).then(function(){r.removeCategory(e.category_id).then(function(){o.hide(),c()})},function(){o.cancel()})}})}function u(e){o.show({controller:n,controllerAs:"personDialog",templateUrl:"app/dashboard/persondialog.tmpl.html",parent:angular.element(document.body),clickOutsideToClose:!0,locals:{person:e}}).then(function(t){if(t)e.name=t,i.updatePerson(e.person_id,e);else{var n=o.confirm().title("Would you like to delete this person?").textContent('All of the transactions with "'+e.name+'" person will be removed too.').ariaLabel("Delete Person").ok("Yes, sure").cancel("Cancel");o.show(n).then(function(){i.removePerson(e.person_id).then(function(){o.hide(),d()})},function(){o.cancel()})}})}var g=this;g.person={name:""},g.category={name:"",icon:""},g.people=[],g.categories=[],g.newPerson=s,g.newCategory=l,g.showCategoryDialog=m,g.showPersonDialog=u,d(),c()}function t(e,t,n){var a=this;a.currentName=n.name,a.updateName=n.name,a.cancel=function(){t.cancel()},a.update=function(){t.hide(a.updateName)},a.remove=function(){t.hide()}}function n(e,t,n){var a=this;a.currentName=n.name,a.updateName=n.name,a.cancel=function(){t.cancel()},a.update=function(){t.hide(a.updateName)},a.remove=function(){t.hide()}}e.$inject=["$log","$mdToast","$mdDialog","categoryService","personService"],t.$inject=["$log","$mdDialog","category"],n.$inject=["$log","$mdDialog","person"],angular.module("cathy").controller("DashboardController",e)}(),function(){"use strict";function e(e,t,n,a,o,r){if(t.globals=a.getObject("globals")||{},t.globals.currentUser){var i=t.globals.currentUser.token,l=r.parseJwt(i);Math.round((new Date).getTime()/1e3)<=l.exp&&(o.defaults.headers.common.Authorization="Bearer "+i)}t.$on("$locationChangeStart",function(e,a,o){var r="/"!=n.path(),i=t.globals.currentUser;r&&!i?n.path("/"):"/"==n.path()&&i&&n.path("/dashboard")}),e.debug("runBlock end")}e.$inject=["$log","$rootScope","$location","$cookies","$http","authenticationService"],angular.module("cathy").run(e)}(),function(){"use strict";function e(e){e.when("/",{templateUrl:"app/main/main.html",controller:"MainController",controllerAs:"ctrl"}).when("/dashboard",{templateUrl:"app/dashboard/dashboard.html",controller:"DashboardController",controllerAs:"ctrl"}).otherwise({redirectTo:"/"})}e.$inject=["$routeProvider"],angular.module("cathy").config(e)}(),function(){"use strict";angular.module("cathy")}(),function(){"use strict";function e(e,t,n,a){e.debugEnabled(!0),t.theme("default").primaryPalette("purple").accentPalette("green"),n.html5Mode(!0),a.includeSpinner=!1}e.$inject=["$logProvider","$mdThemingProvider","$locationProvider","cfpLoadingBarProvider"],angular.module("cathy").config(e)}(),angular.module("cathy").run(["$templateCache",function(e){e.put("app/dashboard/categorydialog.tmpl.html",'<md-dialog aria-label="Category name"><md-dialog-content><div class=md-dialog-content><h2 class=md-title>What would you name this category?</h2><p>{{categoryDialog.currentName}} is the current name.</p><md-input-container><label>Name</label><input ng-model=categoryDialog.updateName type=text></md-input-container></div></md-dialog-content><md-dialog-actions><md-button ng-click=categoryDialog.update() class=md-primary>Update</md-button><md-button ng-click=categoryDialog.remove()>Remove</md-button><md-button ng-click=categoryDialog.cancel()>Cancel</md-button></md-dialog-actions></md-dialog>'),e.put("app/dashboard/dashboard.html",'<cathy-navbar></cathy-navbar><main layout=row layout-padding layout-align="center start"><md-content flex=30><md-tabs md-dynamic-height md-border-bottom><md-tab label=Categories><md-content class=md-padding><md-list flex><form ng-submit=ctrl.newCategory() layout=column><md-input-container><label>Name</label><input ng-model=ctrl.category.name type=text></md-input-container></form><md-list-item ng-repeat="category in ctrl.categories | filter: ctrl.category.name" class=md-2-line><md-icon aria-label={{category.icon}} ng-if=category.icon>{{category.icon}}</md-icon><div class=md-list-item-text><h3>{{ category.name }}</h3><p>0 transactions</p></div><md-button class="md-secondary md-icon-button" ng-click=ctrl.showCategoryDialog(category) aria-label=edit><md-icon>edit</md-icon></md-button><!-- <md-button class="md-secondary md-icon-button" ng-click="null" aria-label="remove">\n                <md-icon>remove_circle</md-icon>\n              </md-button> --></md-list-item></md-list></md-content></md-tab><md-tab label=People><md-content class=md-padding><md-list flex><form ng-submit=ctrl.newPerson() layout=column><md-input-container><label>Name</label><input ng-model=ctrl.person.name type=text></md-input-container></form><md-list-item ng-repeat="person in ctrl.people | filter: ctrl.person.name" class=md-2-line><md-icon aria-label=face>face</md-icon><div class=md-list-item-text><h3>{{ person.name }}</h3><p>R$ 0,00</p></div><md-button class="md-secondary md-icon-button" ng-click=ctrl.showPersonDialog(person) aria-label=edit><md-icon>edit</md-icon></md-button></md-list-item></md-list></md-content></md-tab></md-tabs></md-content><md-content flex=70><h2>Transactions</h2></md-content></main>'),e.put("app/dashboard/persondialog.tmpl.html",'<md-dialog aria-label="Person name"><md-dialog-content><div class=md-dialog-content><h2 class=md-title>What would you name this person?</h2><p>{{personDialog.currentName}} is the current name.</p><md-input-container><label>Name</label><input ng-model=personDialog.updateName type=text></md-input-container></div></md-dialog-content><md-dialog-actions><md-button ng-click=personDialog.update() class=md-primary>Update</md-button><md-button ng-click=personDialog.remove()>Remove</md-button><md-button ng-click=personDialog.cancel()>Cancel</md-button></md-dialog-actions></md-dialog>'),e.put("app/main/main.html",'<a href=https://github.com/felipemfp/cathy class=github-corner><svg width=80 height=80 viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill=currentColor style="transform-origin: 130px 106px" class=octo-arm></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill=currentColor class=octo-body></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style><main layout=row layout-padding layout-align="center start"><md-content flex=90 flex-gt-xs=60 flex-md=40 flex-gt-md=25><md-content layout=row layout-align="center center"><h1 class=heavy>Cathy</h1></md-content><md-tabs md-dynamic-height md-border-bottom><md-tab label="Sign In"><md-content class=md-padding><form name=signInForm ng-submit=ctrl.signIn()><md-input-container class=md-block><label>Username</label><input name=username ng-model=ctrl.username type=text required><div ng-messages=signInForm.username.$error><div ng-message=required>Username is required.</div></div></md-input-container><md-input-container class=md-block><label>Password</label><input name=password ng-model=ctrl.password type=password required><div ng-messages=signInForm.password.$error><div ng-message=required>Password is required.</div></div></md-input-container><md-button type=submit class="md-raised md-primary">Sign In</md-button></form></md-content></md-tab><md-tab label="Sign Up"><md-content class=md-padding><form name=signUpForm ng-submit=ctrl.signUp()><md-input-container class=md-block><label>Name</label><input name=name ng-model=ctrl.register.name type=text required><div ng-messages=signUpForm.name.$error><div ng-message=required>Name is required.</div></div></md-input-container><md-input-container class=md-block><label>Username</label><input name=username ng-model=ctrl.register.username type=text required><div ng-messages=signUpForm.username.$error><div ng-message=required>Username is required.</div></div></md-input-container><md-input-container class=md-block><label>Password</label><input name=password ng-model=ctrl.register.password type=password required><div ng-messages=signUpForm.password.$error><div ng-message=required>Password is required.</div></div></md-input-container><md-button type=submit class="md-raised md-primary">Sign Up</md-button></form></md-content></md-tab></md-tabs></md-content></main>'),e.put("app/components/navbar/navbar.html",'<header><md-toolbar layout=row layout-align="center center"><div class=md-toolbar-tools><a href=#/ >Cathy</a><section flex layout=row layout-align="end center"><small>Logged as {{globals.currentUser.name}}</small><md-button ng-click=navbar.signOut()>Sign Out</md-button></section></div></md-toolbar></header>')}]);
//# sourceMappingURL=../maps/scripts/app-d8aa278b7f.js.map
