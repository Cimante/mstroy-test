<script setup lang="ts">
import { reactive } from 'vue';
import type { TreeNode } from '@/utils/TreeStore';

const defaultState = {
  id: '1',
  parent: null,
  label: ''
};

const state = reactive<TreeNode>({ ...defaultState });

const emit = defineEmits<{
  (e: 'addItem', item: TreeNode): void;
}>();

const addItemValidation = () => {
  if (!(state.id || false)) {
    alert('ID не может быть пустым');
    return;
  }

  if (!isNaN(Number(state.id))) state.id = Number(state.id);
  if (!isNaN(Number(state.parent))) state.parent = Number(state.parent);

  emit('addItem', { ...state });

  Object.assign(state, defaultState);
};
</script>

<template>
  <form action="" class="form">
    <div class="form-item">
      <label for="item-id">ID:</label>
      <input id="item-id" type="text" v-model.lazy="state.id" />
    </div>
    <div class="form-item">
      <label for="item-parent">Parent:</label>
      <input id="item-parent" type="text" v-model.lazy="state.parent" />
    </div>
    <div class="form-item">
      <label for="item-label">Label:</label>
      <input id="item-label" type="text" v-model.lazy.trim="state.label" />
    </div>
    <button type="submit" @click.prevent="addItemValidation">Добавить айтем</button>
  </form>
</template>

<style>
.form {
  display: inline-flex;
  align-items: baseline;
  gap: 0.75rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  font-family: sans-serif;
  font-size: 0.8rem;
  border: 1px solid lightgray;
  border-radius: 0.25rem;
}

.form .form-item {
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;
}
</style>
