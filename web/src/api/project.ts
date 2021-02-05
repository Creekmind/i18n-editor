import { Project } from '@/classes/project';
import { BaseApiService } from '@/api/base';

export class ProjectApiService extends BaseApiService<Project> {
  private static instance: ProjectApiService;

  baseURL = '/api/projects'

  protected cls = Project;

  static new() {
    if (!this.instance) {
      this.instance = new ProjectApiService();
    }

    return this.instance;
  }
}
