<template>
  <v-form v-if="project" label-width="120px">
    <v-form-item label="Name">
      <v-input v-model="project.name"></v-input>
    </v-form-item>

    <v-form-item label="Languages">

      <div v-for="(language, index) in project.languages" :key="index">
        <i class="el-icon-star-off trigger not-primary-language" v-if="!language.isPrimary" title="Make primary" @click.prevent="onStarClick(language)"></i>
        <i class="el-icon-star-on trigger primary-language" type="warning" v-if="language.isPrimary"></i>

        <v-select v-model="language.iso" filterable placeholder="Select">
          <v-option v-for="iso in languageISO" :key="iso" :label="iso" :value="iso"></v-option>
        </v-select>

        <i class="el-icon-delete delete-language" v-if="index" @click="onDeleteLanguageClick(language)" title="Delete language"></i>
      </div>
      <v-button type="primary" @click="onAddLanguageClick">Add language</v-button>
    </v-form-item>

    <v-form-item>
      <v-button type="primary" @click="onSave">Save</v-button>
      <v-button @click="onDelete">Delete</v-button>
    </v-form-item>
  </v-form>

</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import { ProjectApiService } from '@/api/project';
import { Project } from '@/classes/project';
import { Language } from '@/classes/language';

@Options({
  name      : 'i18n-project-form',
  props     : {
    id: String
  },
  watch     : {
    id: 'getProject'
  },
  components: {
  }
})
export default class ProjectForm extends Vue {
  id!: string;
  name!: string;
  project = new Project();

  readonly languageISO = [
    'en-EN',
    'ru-RU'
  ];

  private api = ProjectApiService.new();

  mounted() {
    this.getProject(this.id);
  }

  getProject(id: string) {
    this.api.findOne(id).subscribe(project => {
      this.project = project;
    });
  }

  onAddLanguageClick() {
    if (!this.project.languages.length) {
      const english = new Language(this.languageISO[0], true);
      this.project.languages.push(english);
      return;
    }

    const language = new Language('');
    this.project.languages.push(language);
  }

  onDeleteLanguageClick(language: Language) {
    const index = this.project.languages.indexOf(language);
    if (index >= 0) {
      this.project.languages.splice(index, 1);
    }
  }

  onSave() {
    this.api.save(this.project).subscribe((project) => {
      this.project = project;
    });
  }

  onDelete() {
    this.api.delete(this.project).subscribe(() => {
      // TODO redirect to list
    });
  }

  onStarClick(language: Language) {
    this.project.languages.forEach(l => {
      l.isPrimary = false
    });
    language.isPrimary = true;
  }
}
</script>

<style scoped lang="scss">
.trigger {
  margin-right: 8px;

  &.primary-language {
    color: #ffb42b;
  }

  &.not-primary-language {
    cursor: pointer;
  }
}

.delete-language {
  margin-left: 8px;
  cursor: pointer;
}
</style>
