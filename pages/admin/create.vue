<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="onSubmit"
  >
    <h1 class="mb">Создать новый пост</h1>

    <el-form-item label="Введите название поста" prop="title">
      <el-input v-model.trim="controls.title" />
    </el-form-item>

    <el-form-item label="Текст в формате .md или .html" prop="text">
      <el-input
        type="textarea"
        v-model="controls.text"
        resize="none"
        :rows="10"
      />
    </el-form-item>

    <el-button class="mb" type="success" plain @click="previewDialog = true">
      Предпросмотр
    </el-button>

    <el-dialog title="Предпросмотр" :visible.sync="previewDialog">
      <div :key="controls.text">
        <vue-markdown>{{ controls.text }}</vue-markdown>
      </div>
    </el-dialog>

    <el-upload
      class="mb"
      drag
      :limit="1"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleImageChange"
      :auto-upload="false"
      :on-remove="handleImageDelete"
      
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        Перетащите картинку <em>или нажмите</em>
      </div>
      <div class="el-upload__tip" slot="tip">файлы с расширением jpg/png</div>
    </el-upload>

    <el-form-item>
      <el-button type="primary" native-type="submit" round :loading="loading">
        Создать пост
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["admin-auth"],
  data() {
    return {
      image: null,
      previewDialog: false,
      loading: false,
      controls: {
        title: "",
        text: "",
      },
      rules: {
        text: [
          {
            required: true,
            message: "Текст не должен быть пустым",
            trigger: "blur",
          },
        ],
        title: [
          {
            required: true,
            message: "Название поста не может быть пустым",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleImageDelete(file, fileList) {
      this.image = null;
    },
    handleImageChange(file, fileList) {
      this.image = file.raw
    },
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid && this.image) {
          this.loading = true;

          const formData = {
            title: this.controls.title,
            text: this.controls.text,
            image: this.image,
          };

          try {
            console.log(this.image);
            await this.$store.dispatch("post/create", formData);
            this.controls.text = "";
            this.controls.title = "";
            this.image = null;
            this.$refs.upload.clearFiles();
            this.$message.success("Пост создан");
          } catch (e) {
          } finally {
            this.loading = false;
          }
        } else {
          this.$message.warning("Форма не валидна");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  width: 600px;
}
.mb {
  margin-bottom: 10px;
}
</style>


