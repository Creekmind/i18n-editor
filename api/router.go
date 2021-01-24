package api

import (
	"github.com/beego/beego/v2/server/web"
	"i18n-editor/api/controllers"
)

func StartRouter() {
	// https://beego.me/docs/mvc/controller/params.md#retrieving-data-from-request-body
	web.BConfig.CopyRequestBody = true

	web.Router("/api/projects", controllers.NewProjectController())
}
