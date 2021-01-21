export interface ConstructorFor<T> {
  new (...args: any[]): T;
}

export interface DynamicObject<T> {
  [key: string]: T
}