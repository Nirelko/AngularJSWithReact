import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { pickBy } from "lodash";

import { componentsPortalsData, loadedComponents } from "../render-for-dev";
import useForceUpdate from "./use-force-update";

// / This logic must be here for the HMR to work because the import must be inside the import tree below app.tsx
function createLazyComponent(
  componentName,
  props,
  routeParams,
  isPropUpdate,
  firstRender
) {
  if (!loadedComponents[componentName] || (!firstRender && !isPropUpdate)) {
    // In case of Hot Module Replacement no prop is updated
    loadedComponents[componentName] = lazy(() =>
      import(`../../../components/AngularEntries/${componentName}`)
    );
  }

  const Component = loadedComponents[componentName];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} {...routeParams} />
    </Suspense>
  );
}

function createComponentPortal(
  id,
  { componentName, props, routeParams, domElement, isPropUpdate, firstRender },
  newRenderedComponentsData
) {
  componentsPortalsData[id].isPropUpdate = false;
  componentsPortalsData[id].firstRender = false;
  let changedComponent = newRenderedComponentsData.find(x => x.id === id);
  if (!changedComponent) {
    changedComponent = { id };
    newRenderedComponentsData.push(changedComponent);
  }

  changedComponent.portal = createPortal(
    createLazyComponent(
      componentName,
      props,
      routeParams,
      isPropUpdate,
      firstRender
    ),
    domElement
  );
}

function createComponentsPortals(renderedComponentsData) {
  let changedComponents = pickBy(
    componentsPortalsData,
    ({ firstRender, isPropUpdate }) => firstRender || isPropUpdate
  );

  if (!Object.keys(changedComponents).length) {
    // In case of Hot Module Replacement no prop is updated
    changedComponents = componentsPortalsData;
  }

  const newRenderedComponentsData = [...renderedComponentsData];

  Object.keys(changedComponents).forEach(id => {
    createComponentPortal(id, changedComponents[id], newRenderedComponentsData);
  });

  return newRenderedComponentsData;
}

export default function Portals({ setPortalsForceUpdate }) {
  const [componentsPortals, setComponentsPortals] = useState([]);
  const [tick, forceUpdate] = useForceUpdate();

  useEffect(() => {
    setPortalsForceUpdate(forceUpdate);
  }, [forceUpdate, setPortalsForceUpdate]);

  useEffect(() => {
    setComponentsPortals(createComponentsPortals(componentsPortals));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentsPortalsData, setComponentsPortals, tick]);

  return (
    <Fragment>
      {componentsPortals.map(({ portal, id }) => (
        <Fragment key={id}>{portal}</Fragment>
      ))}
    </Fragment>
  );
}
