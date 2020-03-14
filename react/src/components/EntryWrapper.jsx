import React, { Suspense } from 'react';

import { InjectorProvider } from '../providers/injector.provider';

export default function EntryWrapper({
    Component,
    injector,
    ...props
}) {
    return (
        <InjectorProvider injector={injector}>
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...props} />
            </Suspense>
        </InjectorProvider>
    );
}