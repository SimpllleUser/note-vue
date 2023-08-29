<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';
import { defineProps, ref } from 'vue';

interface Props {
  editor: Editor;
}

const props = defineProps<Props>();

interface ButtonConfig {
  label: string;
  icon: string;
  action: string;
  params?: any;
  attr?: string;
  attrValue?: string | number;
}

const buttonConfigs: ButtonConfig[] = [
  {
    icon: 'table',
    label: 'Insert Table',
    action: 'insertTable',
    params: { rows: 3, cols: 3, withHeaderRow: true },
  },
  {
    icon: 'add_to_queue',
    label: 'Add Column Before',
    action: 'addColumnBefore',
  },
  {
    icon: 'queue_play_next',
    label: 'Add Column After',
    action: 'addColumnAfter',
  },
  {
    icon: 'indeterminate_check_box',
    label: 'Delete Column',
    action: 'deleteColumn',
  },
  { icon: 'add_box', label: 'Add Row Before', action: 'addRowBefore' },
  { icon: 'add_to_photos', label: 'Add Row After', action: 'addRowAfter' },
  { icon: 'delete_sweep', label: 'Delete Row', action: 'deleteRow' },
  { icon: 'delete', label: 'Delete Table', action: 'deleteTable' },
  { icon: 'call_merge', label: 'Merge Cells', action: 'mergeCells' },
  { icon: 'call_split', label: 'Split Cell', action: 'splitCell' },
  {
    icon: 'view_column',
    label: 'Toggle Header Column',
    action: 'toggleHeaderColumn',
  },
  {
    icon: 'view_headline',
    label: 'Toggle Header Row',
    action: 'toggleHeaderRow',
  },
  {
    icon: 'view_compact',
    label: 'Toggle Header Cell',
    action: 'toggleHeaderCell',
  },
  { icon: 'compare_arrows', label: 'Merge or Split', action: 'mergeOrSplit' },
  {
    icon: 'format_paint',
    label: 'Set Cell Color',
    action: 'setCellAttribute',
    params: { backgroundColor: '#FAF594' },
  },
  { icon: 'build', label: 'Fix Tables', action: 'fixTables' },
  {
    icon: 'keyboard_arrow_right',
    label: 'Go to Next Cell',
    action: 'goToNextCell',
  },
  {
    icon: 'keyboard_arrow_left',
    label: 'Go to Previous Cell',
    action: 'goToPreviousCell',
  },
];

const runEditorCommand = (config: ButtonConfig) => {
  const chain = props.editor.chain().focus();
  if (config.attr) {
    chain[config.action](config.attr, config.attrValue).run();
  } else {
    chain[config.action](config.params).run();
  }
};

const canRunEditorCommand = (config: ButtonConfig) => {
  return config.attr
    ? props.editor.can(config.action, config.attr, config.attrValue)
    : props.editor.can(config.action, config.params);
};
</script>

<template>
  <div v-if="props.editor" class="row justify-center">
    <div class="q-pa-sm" v-for="config in buttonConfigs" :key="config.action">
      <q-btn
        no-caps
        color="primary"
        unelevated
        outline
        size="sm"
        @click="runEditorCommand(config)"
        :disabled="!canRunEditorCommand(config)"
        :icon="config.icon"
      >
        <q-tooltip>
          {{ config.label }}
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<style lang="scss">
/* ваш CSS код */
</style>
