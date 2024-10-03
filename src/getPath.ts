import { Path } from './types';

/**
 * Safely retrieves a nested property from an object based on a string path.
 * The path is type-checked, but if the path does not exist, a fallback value
 * can be returned instead. If the path is known, TypeScript will provide autocomplete
 * and type-checking. If the path is unknown, the fallback value must be provided.
 *
 * @template T - The type of the object from which the property is being accessed.
 * @template P - The type-safe string path within the object.
 * @template F - The fallback value type, which is returned if the path does not exist.
 * @param {T} obj - The object to retrieve the nested property from.
 * @param {P} path - A string path representing the nested property (type-safe).
 * @param {F} [defaultValue] - A default fallback value returned if the path does not exist.
 * @returns {T[P] | F} - The value at the specified path if it exists, otherwise the fallback value.
 */
export function getPath<T, P extends Path<T> | string, F>(
    obj: T,
    path: P,
    defaultValue?: F,
): P extends Path<T> ? any : F {
    const keys = path.split('.') as Array<keyof any>;
    let result: any = obj;

    for (const key of keys) {
        result = result?.[key];
        if (result === undefined) return defaultValue as F;
    }

    return result ?? defaultValue;
}
