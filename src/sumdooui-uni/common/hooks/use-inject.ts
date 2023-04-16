import type { InjectionKey, ComponentInternalInstance } from 'vue'
import { inject, getCurrentInstance, onUnmounted, computed, ref  } from 'vue'

type ParentProvide<T> = T & {
    add(child: ComponentInternalInstance): void
    remove(child: ComponentInternalInstance): void
    internal_children: ComponentInternalInstance[]
}

export function useInject<T>(key: InjectionKey<ParentProvide<T>>) {
    const parnet = inject(key, null)

    if (parnet) {
        const instance = getCurrentInstance()!
        parnet.add(instance)

        onUnmounted(() => {
            parnet.remove(instance)
        })

        const index = computed(() => parnet.internal_children.indexOf(instance))
        return { parnet, index }
    }

    return {
        parnet: null,
        index : ref(-1),
    }
}
