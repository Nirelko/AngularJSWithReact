import angular from 'angular';
import 'angular-ui-router';
import 'angular-aria';
import 'angular-animate';
import 'angular-messages';
import 'angular-resource';
import ngSantinize from 'angular-sanitize';

angular.module('angularjs', ['ngMessages', 'ui.router', 'ngResource', ngSantinize]);

angular.module('angularjs')
    .config(($locationProvider, $urlRouterProvider) => {
            $locationProvider.html5Mode(true);
            $urlRouterProvider.otherwise('/');
        }
    );

require('./home/home');
require('./directives/react/react.directive');