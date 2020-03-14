import React, { createContext } from 'react';

export const InjectorContext = createContext(null);

export function InjectorProvider({children, injector}) {
    return <InjectorContext.Provider value={injector}>
        {children}
    </InjectorContext.Provider>
}