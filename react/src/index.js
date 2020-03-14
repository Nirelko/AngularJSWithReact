import React, { lazy } from 'react';
import ReactDOM from 'react-dom';

import EntryWrapper from './components/EntryWrapper';

function renderComponent(
    domElement,
    Component, 
    props,
    injector
) {
    ReactDOM.render(<EntryWrapper 
        Component={Component} {...props} injector={injector}/>, domElement)
}

export function bootstrap(componentName) {
    const Component = lazy(() =>
            import(
                `./components/AngularEntries/${componentName}`
            )
        );

    return (
        domElement,
        props,
        injector
    ) =>
        renderComponent(
            domElement,
            Component,
            props,
            injector
        );
}

export function destroy(domElement) {
    ReactDOM.unmountComponentAtNode(domElement);
}