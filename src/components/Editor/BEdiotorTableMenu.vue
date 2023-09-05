<script setup lang="ts">
import {Editor} from '@tiptap/vue-3';
import {defineProps, ref} from 'vue';
import {getIconFromPublicByFileName} from 'boot/tools';

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
  style?: string;
}

const buttonConfigs: ButtonConfig[] = [
  {
    icon: getIconFromPublicByFileName('table-plus'),
    label: 'Insert Table',
    action: 'insertTable',
  },
  {
    icon: getIconFromPublicByFileName('add-row-col'),
    label: 'Add Column Before',
    action: 'addColumnBefore',
    style: 'transform: rotate(180deg);'
  },
  {
    icon: getIconFromPublicByFileName('add-row-col'),
    label: 'Add Column After',
    action: 'addColumnAfter',
  },
  {
    icon: getIconFromPublicByFileName('remove-row-col'),
    label: 'Delete Column',
    action: 'deleteColumn',
  },
  {
    icon: getIconFromPublicByFileName('add-row-col'),
    label: 'Add Row Before',
    action: 'addRowBefore',
    style: 'transform: rotate(270deg);'
  },
  {
    icon: getIconFromPublicByFileName('add-row-col'),
    label: 'Add Row After',
    action: 'addRowAfter',
    style: 'transform: rotate(90deg);'
  },
  {
    icon: getIconFromPublicByFileName('remove-row-col'),
    label: 'Delete Row',
    action: 'deleteRow',
    style: 'transform: rotate(90deg);'
  },
  {icon: getIconFromPublicByFileName('table-remove'), label: 'Delete Table', action: 'deleteTable'},
  {icon: getIconFromPublicByFileName('merge-cell'), label: 'Merge Cells', action: 'mergeCells'},
  {icon: getIconFromPublicByFileName('split-cell'), label: 'Split Cell', action: 'splitCell'},
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
  {icon: 'compare_arrows', label: 'Merge or Split', action: 'mergeOrSplit'},
  {
    icon: getIconFromPublicByFileName('color-fill'),
    label: 'Set Cell Color',
    action: 'setCellAttribute',
  },
  {icon: getIconFromPublicByFileName('table-setting'), label: 'Fix Tables', action: 'fixTables'},
  {
    icon: 'keyboard_arrow_left',
    label: 'Go to Previous Cell',
    action: 'goToPreviousCell',
  },
  {
    icon: 'keyboard_arrow_right',
    label: 'Go to Next Cell',
    action: 'goToNextCell',
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
    <q-btn :icon="getIconFromPublicByFileName('table-edit')">
      <q-menu max-height="130px">
        <q-list>
          <q-item clickable v-for="config in buttonConfigs" :key="config.action" @click="runEditorCommand(config)">
            <q-item-section>
              <q-icon :name="config.icon" :style="config.style"/>
              <q-tooltip>
                {{ config.label }}
              </q-tooltip>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    <!--    <div class="q-pa-sm" v-for="config in buttonConfigs" :key="config.action">-->
    <!--      <q-btn-->
    <!--        no-caps-->
    <!--        color="primary"-->
    <!--        unelevated-->
    <!--        outline-->
    <!--        size="sm"-->
    <!--        @click="runEditorCommand(config)"-->
    <!--        :disabled="!canRunEditorCommand(config)"-->
    <!--      >-->
    <!--        <q-icon :name="config.icon" :style="config.style" />-->
    <!--        <q-tooltip>-->
    <!--          {{ config.label }}-->
    <!--        </q-tooltip>-->
    <!--      </q-btn>-->
    <!--    </div>-->
  </div>
</template>

<style lang="scss">
/* ваш CSS код */
img.icon {
  color: #222;
  background-color: red;
  margin-left: 12px;
}
</style>
