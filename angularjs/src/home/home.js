import angular from 'angular';

import template from './home.html';
import controller from './home.controller';

angular.module('angularjs')
    .config($stateProvider => {
        $stateProvider.state("home", {
            url: '/',
            template,
            controller,
        });
    });