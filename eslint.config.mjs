import pluginVue from 'eslint-plugin-vue'
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript'

export default defineConfigWithVueTs(
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  {
    ignores: ['dist/', 'node_modules/', 'dragDropPolyfill.js'],
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  }
)
