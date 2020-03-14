import angular from "angular";
import { v4 as uuidv4 } from "uuid";

import { getReactLib } from "./react-lib.provider";

angular.module("angularjs").directive("react", () => ({
  restrict: "E",
  scope: {
    component: "@"
  },
  template: "<div></div>",
  link(scope, element, attrs) {
    let reactRenderFunction = null,
      reactUnrenderFunction = null;
    const $injector = angular.injector();
    const id = uuidv4();

    function getProps() {
      return Object.keys(attrs)
        .filter(key => key !== "component" && !key.startsWith("$"))
        .reduce((result, key) => {
          result[key] = attrs[key];

          return result;
        }, {});
    }

    function registerObservers(props) {
      Object.keys(props).forEach(propName => {
        attrs.$observe(propName, () => {
          const props = getProps();

          render(props, true);
        });
      });
    }

    function render(props, isPropUpdate) {
      if (!reactRenderFunction) {
        return;
      }

      reactUnrenderFunction = reactRenderFunction(
        id,
        element[0],
        props,
        $injector,
        isPropUpdate
      );
    }

    scope.$on("$destroy", () => {
      reactUnrenderFunction();
    });

    const props = getProps();
    registerObservers(props);
    getReactLib().then(appReact => {
      reactRenderFunction = appReact.bootstrap(scope.component);
      render(props);
    });
  }
}));
