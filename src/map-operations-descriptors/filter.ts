import { SuperMap } from "../";
import { ISuperMap, Predicate } from "src/types";

const filterDescriptor = {
  enumerable: false,
  value<K, V>(this: ISuperMap<K, V>, p: Predicate<K, V>) {
    const newMap = SuperMap<K, V>();

    for (const [key, value] of this.entries()) {
      if (p(value, key, this) === true) {
        newMap.set(key, value);
      }
    }

    return newMap;
  }
}

export default filterDescriptor;