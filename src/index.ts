import {
    filterDescriptor,
    getDescriptor,
    mapDescriptor,
    reduceAsyncDescriptor,
    reducerDescriptor,
    updateDescriptor
} from './map-operations-descriptors';
import { ISuperMap } from './types';
import { defineProperty } from './utils';

function SuperMap<K, V>(args?: [K, V][]): ISuperMap<K, V> {
    const map = new Map<K, V>(args) as ISuperMap<K, V>;

    defineProperty(map, 'get', getDescriptor(map.get));
    defineProperty(map, 'update', updateDescriptor);
    defineProperty(map, 'map', mapDescriptor);
    defineProperty(map, 'filter', filterDescriptor);
    defineProperty(map, 'reduce', reducerDescriptor);
    defineProperty(map, 'reduceAsync', reduceAsyncDescriptor);

    return map;
}

export { SuperMap };