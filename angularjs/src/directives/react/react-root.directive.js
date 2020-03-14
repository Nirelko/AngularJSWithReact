import angular from "angular";

import { getReactLib } from "./react-lib.provider";

angular.module("angularjs").directive("reactRoot", () => ({
  restrict: "E",
  template: "<span></span>",
  link(scope, element) {
    let rootReactUnrenderFunction = null;

    scope.$on("$destroy", () => {
      rootReactUnrenderFunction();
    });

    getReactLib().then(appReact => {
      rootReactUnrenderFunction = appReact.renderRoot(
        element[0],
        angular.injector()
      );
    });
  }
}));
