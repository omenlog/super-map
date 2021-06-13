import { AsyncReducer, ISuperMap } from "src/types";

const reduceAsyncDescriptor = {
  enumerable: false,
  value<K, V>(this: ISuperMap<K, V>, asyncReducer: AsyncReducer<K, V>, initialValue?: V) {
    if (this.size === 0) {
      return Promise.resolve(initialValue) as Promise<V>;
    }

    const entriesIterator = this.entries();
    let accumulator = (Promise.resolve(initialValue ?? entriesIterator.next().value[1])) as Promise<V>;

    for (const [key, value] of entriesIterator) {
      accumulator = accumulator.then(acc => asyncReducer(acc, value, key, this));
    }

    return accumulator;
  }
}

export default reduceAsyncDescriptor;