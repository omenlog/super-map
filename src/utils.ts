type PropertyD<T> = {
  enumerable?: boolean,
  writable?: boolean,
  configurable?: boolean,
  value: T,
  get?(): T,
  set?(v: T): void,
}

function defineProperty<T, K extends string & keyof T>(target: T, propertyName: `${K}`, configObject: PropertyD<T[K]>) {
  return Object.defineProperty(target, propertyName, configObject);
}

export { defineProperty };