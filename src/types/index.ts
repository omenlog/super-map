type Predicate<K, V> = (value: V, key: K, m: ISuperMap<K, V>) => boolean
type Reducer<K, V, I, R = I extends undefined ? V : I> = (acc: R, value: V, key: K, m: ISuperMap<K, V>) => R
type Mapper<K, V, R> = (v: V, k: K, m: ISuperMap<K, V>) => Exclude<NonNullable<R>, void>

interface ISuperMap<K, V> extends Map<K, V> {
    get(k: K, defaultValue?: V): V | undefined;
    update(k: K, newValue: V | ((arg?: V) => V)): this;
    map<R>(mapper: Mapper<K, V, R>): ISuperMap<K, R>;
    filter(predicate: Predicate<K, V>): ISuperMap<K, V>;
    reduce<I = undefined>(reducer: Reducer<K, V, I>, initialValue?: I): I extends undefined ? V : I;
}

export { ISuperMap, Reducer, Predicate, Mapper }

