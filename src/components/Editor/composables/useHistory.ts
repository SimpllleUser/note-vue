// import { Editor } from "@tiptap/vue-3";
// import { computed } from "vue";

// export function useHistory(editor: Editor) {
//   const editorEntity = computed(() => editor)
//   const makeUndo = () => {
//     editorEntity.value.chain().focus()?.undo().run()
//   }
//   const makeRedo = () => {
//     editorEntity.value.chain().focus()?.redo().run()
//   }


//   const disableUndo = computed(() => !editor.can().undo())
//   const disableRedo = computed(() => !editor.can().redo())

//   return {
//     makeRedo,
//     makeUndo,
//     disableUndo,
//     disableRedo,
//   }
// }
