import { ISuperMap, Reducer } from "src/types";

const reducerDescriptor = {
  enumerable: false,
  value<K, V>(this: ISuperMap<K, V>, reducer: Reducer<K, V>, initialValue?: V) {
    if (this.size === 0) {
      return initialValue as V;
    }

    const entriesIterator = this.entries();
    let accumulator = (initialValue ?? entriesIterator.next().value[1]) as V;
    for (const [key, value] of entriesIterator) {
      accumulator = reducer(accumulator, value, key, this);
    }

    return accumulator;
  }
}

export default reducerDescriptor;