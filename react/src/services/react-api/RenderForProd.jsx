import React from "react";

import ReactDOM from "react-dom";
import ProdEntryWrapper from "./ProdEntryWrapper";

export function renderForProd({
  domElement,
  Component,
  props,
  injector,
  routeParams
}) {
  ReactDOM.render(
    <ProdEntryWrapper
      injector={injector}
      Component={Component}
      {...props}
      {...routeParams}
    />,
    domElement
  );
}
