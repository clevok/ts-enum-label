/**
 *
 * @param config
 * @returns
 *
```js
enum LiquidUnitEnum {
        ML = 0,
        OZ_UA = 1,
        OZ_UK = 2,
    }

    const LiquidUnitEnumStatus = CustomStatus({

         ML: [LiquidUnitEnum.ML, 'milliliter'],

         OZ_UA: [LiquidUnitEnum.OZ_UA, 'ounce'],

         OZ_UK: [LiquidUnitEnum.OZ_UK, 'ounce'],
     } as const)

```
 */
export declare function CustomStatus<IConfig extends {
    [key: string]: Readonly<[string | number, any]>;
}>(config: IConfig): {
    <IKey extends keyof IConfig>(keyOrValue: IKey): IConfig[IKey][1];
    <IValue extends IConfig[keyof IConfig][0]>(keyOrValue: IValue): IConfig[keyof IConfig] extends readonly [IValue, infer R] ? R : never;
    values: <T extends keyof IConfig>() => {
        key: T;
        value: IConfig[T][0];
        label: IConfig[T][1];
    }[];
    find: {
        <IKey_1 extends keyof IConfig>(keyOrValue: IKey_1): {
            value: IConfig[IKey_1][0];
            label: IConfig[IKey_1][1];
        };
        <IValue_1 extends IConfig[keyof IConfig][0]>(keyOrValue: IValue_1): {
            value: IValue_1;
            label: IConfig[keyof IConfig] extends readonly [IValue_1, infer R] ? R : never;
        };
    };
    getLabel: any;
} & {
    values: <T extends keyof IConfig>() => {
        key: T;
        value: IConfig[T][0];
        label: IConfig[T][1];
    }[];
    find: {
        <IKey_1 extends keyof IConfig>(keyOrValue: IKey_1): {
            value: IConfig[IKey_1][0];
            label: IConfig[IKey_1][1];
        };
        <IValue_1 extends IConfig[keyof IConfig][0]>(keyOrValue: IValue_1): {
            value: IValue_1;
            label: IConfig[keyof IConfig] extends readonly [IValue_1, infer R] ? R : never;
        };
    };
    getLabel: {
        <IKey extends keyof IConfig>(keyOrValue: IKey): IConfig[IKey][1];
        <IValue extends IConfig[keyof IConfig][0]>(keyOrValue: IValue): IConfig[keyof IConfig] extends readonly [IValue, infer R] ? R : never;
        values: <T extends keyof IConfig>() => {
            key: T;
            value: IConfig[T][0];
            label: IConfig[T][1];
        }[];
        find: {
            <IKey_1 extends keyof IConfig>(keyOrValue: IKey_1): {
                value: IConfig[IKey_1][0];
                label: IConfig[IKey_1][1];
            };
            <IValue_1 extends IConfig[keyof IConfig][0]>(keyOrValue: IValue_1): {
                value: IValue_1;
                label: IConfig[keyof IConfig] extends readonly [IValue_1, infer R] ? R : never;
            };
        };
        getLabel: any;
    };
} & { [P in keyof IConfig]: IConfig[P][0]; } & { [F in IConfig extends {
    [key: string]: readonly [infer R_1, any];
} ? R_1 : never]: keyof IConfig; };
