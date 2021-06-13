import { SuperMap } from "../";
import { ISuperMap, Mapper } from "src/types";

const mapDescriptor = {
  enumerable: false,
  value<K, V, R>(this: ISuperMap<K, V>, mapper: Mapper<K,V,R>) {
    const newSuperMap = SuperMap<K, R>();

    for (const [key, value] of this.entries()) {
      const newValue = mapper(value, key, this);
      newSuperMap.set(key, newValue);
    }

    return newSuperMap;

  }
};

export default mapDescriptor;