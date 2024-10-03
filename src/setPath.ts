import { Path } from './types';

/**
 * Safely sets a nested property on an object based on a type-safe string path.
 * The path is validated based on the object's structure, ensuring correct assignment.
 *
 * @template T - The type of the object to which the property is being set.
 * @template P - The type-safe string path within the object.
 * @param {T} obj - The object on which the nested property will be set.
 * @param {P} path - A string path representing the nested property (type-safe).
 * @param {any} value - The value to set at the specified path.
 * @returns {void}
 */
export function setPath<T, P extends Path<T>>(obj: T, path: P, value: any): void {
    const keys = path.split('.') as Array<keyof any>;
    let current: any = obj;

    keys.forEach((key, index) => {
        if (index === keys.length - 1) {
            current[key] = value;
        } else {
            if (!current[key]) current[key] = {};
            current = current[key];
        }
    });
}
