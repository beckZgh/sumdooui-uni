import type { InjectionKey, ComponentInternalInstance } from 'vue'
import { inject, getCurrentInstance, onUnmounted, computed, ref  } from 'vue'

type ParentProvide<T> = T & {
    add(child: ComponentInternalInstance): void
    remove(child: ComponentInternalInstance): void
    internal_children: ComponentInternalInstance[]
}

export function useInject<T>(key: InjectionKey<ParentProvide<T>>) {
    const parent = inject(key, null)

    if (parent) {
        const instance = getCurrentInstance()!
        parent.add(instance)

        onUnmounted(() => {
            parent.remove(instance)
        })

        const index = computed(() => parent.internal_children.indexOf(instance))
        return { parent, index }
    }

    return {
        parent: null,
        index : ref(-1),
    }
}
