export type SetState<T> = (state: T | ((prev: T) => T)) => void;
