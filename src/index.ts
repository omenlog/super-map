import { ISuperMap, Reducer, Predicate, Mapper } from './types';

function SuperMap<K, V>(args?: [K, V][]): ISuperMap<K, V> {
    const map = new Map<K, V>(args) as ISuperMap<K, V>;

    const getter = map.get;

    Object.defineProperty(map, 'get', {
        enumerable: false,
        value(key: K, defaultValue: V) {
            let value = getter.call(map, key);

            if (value === undefined && defaultValue !== undefined) {
                map.set(key, defaultValue);
                value = defaultValue;
            }

            return value;
        }
    });

    Object.defineProperty(map, 'update', {
        enumerable: false,
        value(key: K, newValue: V) {
            if (typeof newValue === "function") {
                const oldValue = map.get(key);
                map.set(key, newValue(oldValue));
            } else {
                map.set(key, newValue);
            }

            return this;
        }
    });

    Object.defineProperty(map, 'filter', {
        value(p: Predicate<K, V>) {
            const newMap = SuperMap<K, V>();

            for (const [key, value] of map.entries()) {
                if (p(value, key, map) === true) {
                    newMap.set(key, value);
                }
            }

            return newMap;
        }
    });

    Object.defineProperty(map, 'reduce', {
        enumerable: false,
        value<I = undefined>(reducer: Reducer<K, V, I>, initialValue?: I) {
            const entriesIterator = map.entries();
            let accumulator = initialValue ?? entriesIterator.next().value[1];
            for (const [key, value] of entriesIterator) {
                accumulator = reducer(accumulator, value, key, map);
            }

            return accumulator;
        }
    });

    Object.defineProperty(map, "map", {
        enumerable: false,
        value<R>(mapper: Mapper<K, V, R>): ISuperMap<K, R> {
            const newSuperMap = SuperMap<K, R>();

            for (const [key, value] of map.entries()) {
                const newValue = mapper(value, key, map);
                newSuperMap.set(key, newValue);
            }

            return newSuperMap;
        }
    });

    return map;
}

export { SuperMap };