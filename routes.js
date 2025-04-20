(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        template: '<h1>Welcome to our Restaurant</h1>'
      })

      .state('categories', {
        url: '/categories',
        template: '<categories categories="catCtrl.categories"></categories>',
        controller: 'CategoriesController as catCtrl',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      .state('items', {
        url: '/items/{categoryShortName}',
        template: '<items items="itemCtrl.items"></items>',
        controller: 'ItemsController as itemCtrl',
        resolve: {
          items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
        }
      });
  }
})();
