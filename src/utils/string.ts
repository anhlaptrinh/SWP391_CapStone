export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
type GenericObject<T extends string, U extends Record<string, any>> = {
  [K in T]: string | number;
} & U;

type TransformedObject<T extends string, U extends Record<string, any>> = {
  [K in T]: string | number;
} & Record<string, number | string>;

export const transformObject = <T extends string, U extends Record<string, any>>(
  obj: GenericObject<T, U>,
  ...nestedKeys: (keyof U)[]
): TransformedObject<T, U> => {
  const result: any = {
    ...obj,
  };

  for (const key in obj) {
    if (!nestedKeys.includes(key as keyof U)) {
      result[key] = obj[key];
    }
  }

  nestedKeys.forEach((key) => {
    Object.assign(result, obj[key]);
  });

  return result as TransformedObject<T, U>;
};

