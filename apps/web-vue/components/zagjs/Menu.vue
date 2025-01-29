<script setup lang="ts">
import * as menu from "@zag-js/menu"
import { normalizeProps, useMachine } from "@zag-js/vue";
import { computed } from "vue";

const [state, send] = useMachine(menu.machine({ id: "1", "aria-label": "File" }));
const api = computed(() => menu.connect(state.value, send, normalizeProps));
</script>