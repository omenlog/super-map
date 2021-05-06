type Predicate<K, V> = (value: V, key: K, m: SuperMap<K, V>) => boolean
type Reducer<K, V, I, R = I extends undefined ? V : I> = (acc: R, value: V, key: K, m: SuperMap<K, V>) => R

interface SuperMap<K, V> extends Map<K, V> {
    get(k: K, defaultValue?: V): V | undefined;
    update(k: K, newValue: V | ((arg?: V) => V)): this;
    filter(predicate: Predicate<K, V>): SuperMap<K, V>;
    reduce<I = undefined>(reducer: Reducer<K, V, I>, initialValue?: I): I extends undefined ? V : I;
}

const assertion = (v: any): v is Function => {
    return typeof v === "function";
}

function SuperMap<K, V>(args?: [K, V][]): SuperMap<K, V> {
    const map = new Map<K, V>(args) as SuperMap<K, V>;

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
            if (assertion(newValue)) {
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
        value<I = undefined>(reducer: Reducer<K,V,I>, initialValue ?: I){
            const entriesIterator = map.entries();
            let accumulator = initialValue ?? entriesIterator.next().value[1];
            for(const [key, value] of entriesIterator){
                accumulator = reducer(accumulator, value, key, map);
            }

            return accumulator;
        }
    });


    return map;
}

export { SuperMap };