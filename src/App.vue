<template>
  <div>zero hooks{{ show }}</div>
  <button @click="() => toggle()">toggle</button>
  <div>
    <div style="width: 100px; height: 100px;" v-wrap-loading="show">dsadsadas</div>
    <input
      type="text"
      v-model="formData.name"
      @blur="triggerValidProp('name', formData.name)"
    />
    <p>{{ validResult["name"]?.message }}</p>
    <input
      type="text"
      v-model="formData.phone"
      @blur="triggerValidProp('phone', formData.phone)"
    />
    {{ validResult }}
    <button @click="valid">valid all</button>
    <p>{{ type }}----{{ size }}</p>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useToggle, useValid, useViewSize } from "./package/index";
const [type, size] = useViewSize();

const [show, toggle] = useToggle<boolean>([false, true]);
const formData = reactive({
  name: "",
  phone: "",
});
const rules = {
  name: [{ required: true, message: "请输入姓名" }],
  phone: [
    { required: true, message: "请输入手机号" },
    { pattern: /^1[3456789]\d{9}$/, message: "请输入正确的手机号" },
  ],
};
const [validResult, triggerValidProp, triggerValidAll] = useValid(rules);
function valid() {
  const c = triggerValidAll(formData);
  console.log(c);
}
</script>
<style lang="scss" scoped></style>
