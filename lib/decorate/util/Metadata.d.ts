export declare function Metadata(target: {
    new (): any;
}): ReturnType<typeof useMetadata>;
interface IMetadataCell {
    primary: boolean;
    column: string;
    transformer: Function[];
}
declare function useMetadata(): {
    addMetadata: (option: IMetadataCell) => number;
    findPrimary: () => IMetadataCell;
};
export {};
