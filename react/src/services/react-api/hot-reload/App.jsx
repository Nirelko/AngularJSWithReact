import { hot } from "react-hot-loader/root";
import React from "react";

import { setPortalsForceUpdate } from "../render-for-dev";
import { InjectorProvider } from "../../../providers/injector.provider";

import Portals from "./Portals";

function App({ injector }) {
  return (
    <InjectorProvider injector={injector}>
      <Portals setPortalsForceUpdate={setPortalsForceUpdate} />
    </InjectorProvider>
  );
}

export default hot(App);
