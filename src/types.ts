export type Path<T> = T extends object
    ? {
          [K in keyof T]: K extends string
              ? T[K] extends Array<infer U>
                  ? `${K}` | `${K}.${Path<U>}`
                  : T[K] extends object
                    ? `${K}` | `${K}.${Path<T[K]>}`
                    : `${K}`
              : never;
      }[keyof T]
    : never;
