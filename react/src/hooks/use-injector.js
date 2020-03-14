import { useContext } from 'react';

import { InjectorContext } from '../providers/injector.provider'

export const useInjector = (dependencies) => {
    const injector = useContext(InjectorContext);

    return dependencies.reduce((result, dependency) => {
        result[dependency] = injector.get(dependency);

        return result;
    }, {});
};