// It must be imported before react-dom and react even if not used here
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import "react-hot-loader";
import React, { lazy } from "react";
import ReactDOM from "react-dom";

import { renderForProd } from "./services/react-api/RenderForProd";
import { renderForDev } from "./services/react-api/render-for-dev";

import App from "./services/react-api/hot-reload/App";

function renderComponent(
  id,
  domElement,
  componentName,
  Component,
  props,
  injector,
  isPropUpdate
) {
  if (process.env.NODE_ENV === "production") {
    return renderForProd({
      domElement,
      Component,
      props,
      injector,
      routeParams
    });
  }

  return renderForDev(
    { componentName, props, isPropUpdate, domElement },
    id,
    destroy
  );
}

export function bootstrap(componentName) {
  let Component = null;
  if (process.env.NODE_ENV === "production") {
    Component = lazy(() =>
      import(`./components/AngularEntries/${componentName}`)
    );

    return;
  }

  return (id, domElement, props, injector, isPropUpdate) =>
    renderComponent(
      id,
      domElement,
      componentName,
      Component,
      props,
      injector,
      isPropUpdate
    );
}

export function destroy(domElement) {
  ReactDOM.unmountComponentAtNode(domElement);
}

export function renderRoot(domElement, injector) {
  ReactDOM.render(<App injector={injector} />, domElement);

  return () => destroy(domElement);
}
