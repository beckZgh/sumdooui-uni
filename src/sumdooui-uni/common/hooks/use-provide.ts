import type { ComponentInternalInstance, InjectionKey } from 'vue'
import { shallowReactive, markRaw, provide } from 'vue'

export function useProvide<ProvideValue>(key: InjectionKey<ProvideValue>) {
    const internal_children = shallowReactive<ComponentInternalInstance[]>([])

    const add = (child: ComponentInternalInstance) => {
        if (!child.proxy) return
        internal_children.push(markRaw(child))
    }

    const remove = (child: ComponentInternalInstance) => {
        internal_children.splice(internal_children.indexOf(markRaw(child)), 1)
    }

    return (value?: ProvideValue) => {
        provide(key, Object.assign({ add, remove, internal_children }, value))
    }
}
