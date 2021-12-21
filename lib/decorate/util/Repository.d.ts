import { UnwrapNestedRefs } from '@vue/reactivity';
export declare function Repository<Entity>(target: {
    new (): Entity;
}): {
    Get: (value: Partial<Entity>) => UnwrapNestedRefs<Entity>;
    Delete: (value: Entity) => boolean;
    Save: (value: Partial<Entity>) => UnwrapNestedRefs<Entity>;
    Insert: (value: Partial<Entity>) => UnwrapNestedRefs<Entity>;
};
