type Predicate<K, V> = (value: V, key: K, m: ISuperMap<K, V>) => boolean
type Mapper<K, V, R> = (v: V, k: K, m: ISuperMap<K, V>) => Exclude<NonNullable<R>, void>
type Reducer<K, V> = (acc: V, value: V, key: K, m: ISuperMap<K, V>) => V
type AsyncReducer<K, V> = (acc: V, value: V, key: K, m: ISuperMap<K, V>) => Promise<V>

interface ISuperMap<K, V> extends Map<K, V> {
    get(k: K, defaultValue?: V): V | undefined;
    update(k: K, newValue: V | ((arg?: V) => V)): this;
    map<R>(mapper: Mapper<K, V, R>): ISuperMap<K, R>;
    filter(predicate: Predicate<K, V>): ISuperMap<K, V>;
    reduce(reducer: Reducer<K, V>, initialValue?: V): V;
    reduceAsync(asyncReducer: AsyncReducer<K, V>, initialValue?: V): Promise<V>
}

export { ISuperMap, Reducer, AsyncReducer, Predicate, Mapper }

