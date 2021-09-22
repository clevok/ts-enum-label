export declare function DefineEnumLabel<E extends {
    [key: string]: any;
}, V extends Readonly<{
    value: any;
    label: any;
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
