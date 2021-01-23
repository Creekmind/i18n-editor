import { Project } from '@/classes/project';
import { BaseApiService } from '@/api/base-api-service';

export class ProjectApiService extends BaseApiService<Project> {

  private static instance: ProjectApiService;

  baseURL = '/api/projects'

  private constructor() {
    super(Project);
  }

  static new() {
    if (!this.instance) {
      this.instance = new ProjectApiService();
    }

    return this.instance;
  }

}
