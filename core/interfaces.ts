export interface ConstructorFor<T> extends Function {
  new (...args: any[]): T;
}

export interface DynamicObject<T> {
  [key: string]: T
}