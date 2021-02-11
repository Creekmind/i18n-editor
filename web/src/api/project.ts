import { Project } from '@/classes/project';
import { BaseApiService } from '@/api/base';

class ProjectApiService extends BaseApiService<Project> {
  baseURL = '/api/projects';

  protected cls = Project;
}

export const projectsAPI = new ProjectApiService();
