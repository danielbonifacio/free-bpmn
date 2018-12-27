<template>
  <div class="box">
    <div class="mask elevation-5">
      <div class="description">
        Clique ou arraste um arquivo BPMN para fazer upload
      </div>
      <div class="icon">
        <v-icon>cloud_upload</v-icon>
      </div>
    </div>
    <input
      type="file"
      v-on:change="fileSelected"/>
  </div>
</template>

<script>
export default {
  name: 'upload-button',
  props: {
    selectedCallback: Function,
    title: String,
  },
  methods: {
    fileSelected(e) {
      if (this.selectedCallback) {
        if (e.target.files[0]) {
          this.selectedCallback(e.target.files[0]);
        } else {
          this.selectedCallback(null);
        }
      }
    },
  },
};
</script>

<style>
.box {
  position: relative;
  width: 100%;
  min-height: 300px;
}

input[type="file"] {
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.mask {
  content: '';
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  cursor: pointer;
  border-radius: 3px;
}

.mask .description {
  text-align: center;
  font-size: 1.3em;
  color: #999;
  width: 100%;
  margin-bottom: 1em;
}

.mask .material-icons {
  font-size: 3em;
}
</style>