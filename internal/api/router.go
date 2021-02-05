package api

import (
	"github.com/beego/beego/v2/server/web"
	"i18n-editor/internal/controllers"
)

func StartRouter() {
	// https://beego.me/docs/mvc/controller/params.md#retrieving-data-from-request-body
	web.BConfig.CopyRequestBody = true

	web.Router("/api/projects", controllers.NewProjectController(), "post:CreateProject")
	web.Router("/api/projects", controllers.NewProjectController(), "get:GetProjects")
	web.Router("/api/projects/:id", controllers.NewProjectController(), "get:GetProject")
	web.Router("/api/projects/:id", controllers.NewProjectController(), "put:UpdateProject")
	web.Router("/api/projects/:id", controllers.NewProjectController(), "delete:DeleteProject")
}
