export const portalsForceUpdate = { callback: null };
export const componentsPortalsData = {};
export const loadedComponents = {};

export function setPortalsForceUpdate(portalsComponentForceUpdate) {
  portalsForceUpdate.callback = portalsComponentForceUpdate;
}

export function renderForDev(componentData, id, destroy) {
  componentData.firstRender = !componentsPortalsData[id];
  componentsPortalsData[id] = componentData;

  if (portalsForceUpdate.callback) {
    portalsForceUpdate.callback();
  }

  return () => {
    destroy(componentData.domElement);
    delete componentsPortalsData[id];
  };
}
