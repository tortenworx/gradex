import * as toast from "@zag-js/toast"
import { normalizeProps, useActor, useMachine } from "@zag-js/vue"
import { computed, inject, reactive } from "vue"

const [state, send] = useMachine(toast.group.machine({ id: "1" }))
const toastApi = toast.group.connect(state.value, send, normalizeProps)

// E.g. Store
export const store = reactive({
  toast: toastApi,
})