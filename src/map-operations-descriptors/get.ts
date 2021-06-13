import { ISuperMap } from '../types';

function getDescriptor<K, V>(getter: (k: K) => V) {
  return {
    enumerable: false,
    value(this: ISuperMap<K, V>, key: K, defaultValue: V) {
      let value = getter.call(this, key);

      if (value === undefined && defaultValue !== undefined) {
        this.set(key, defaultValue);
        value = defaultValue;
      }

      return value;
    }
  }
}

export default getDescriptor;