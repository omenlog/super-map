import { ISuperMap } from "src/types";

function assertFn(v: any): v is Function {
  return typeof v === "function";
}

const updateDescriptor = {
  enumerable: false,
  value<K, V>(this: ISuperMap<K, V>, key: K, newValue: V | ((arg?: V) => V)) {
    if (assertFn(newValue)) {
      const oldValue = this.get(key);
      this.set(key, newValue(oldValue));
    } else {
      this.set(key, newValue);
    }

    return this;
  }
};

export default updateDescriptor;