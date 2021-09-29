export declare function CustomStatus<IConfig extends {
    [key: string]: Readonly<[string | number, unknown]>;
}>(config: IConfig): {
    <IKey extends keyof IConfig>(keyOrValue: IKey): IConfig[IKey][1];
    <IValue extends IConfig[keyof IConfig][0]>(keyOrValue: IValue): IConfig[keyof IConfig] extends readonly [IValue, infer R] ? R : never;
    values: () => {
        key: string;
        value: string | number;
        label: unknown;
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
    values: () => {
        key: string;
        value: string | number;
        label: unknown;
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
        values: () => {
            key: string;
            value: string | number;
            label: unknown;
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
    [key: string]: readonly [infer R_1, unknown];
} ? R_1 : never]: keyof IConfig; };
/**
 *
 * @example
```js
enum LiquidUnitEnum {
    ML = 1,
    OZ_UA = 2,
}
const LiquidUnitLabel = DefineEnumLabel(() => {
    return {
        Enum: LiquidUnitEnum,
        Values: [
            { value: LiquidUnitEnum.ML, label: 'ml' },
            { value: LiquidUnitEnum.OZ_UA, label: 'oz_ua' },
        ] as const,
    }
})
```
 *
 */
export declare function DefineEnumLabel<E extends {
    [key: string]: any;
}, V extends Readonly<{
    value: string | number;
    label: unknown;
}[]>>(callback: (() => {
    Enum: E;
    Values: V;
}) | {
    Enum: E;
    Values: V;
}): {
    <T extends V[number]["value"]>(v: T): V[number] extends {
        value: T;
        label: infer R;
    } ? R : never;
    values: () => V[number][];
} & { [key in keyof E]: V[number]; };
