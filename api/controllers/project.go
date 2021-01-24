package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/beego/beego/v2/server/web"
	"i18n-editor/internal/storage"
)

type projectController struct {
	web.Controller
}

func (r projectController) Get() {
	projects, err := storage.GetProjects()

	if err != nil {
		fmt.Println(err.Error())
		r.Abort("500")
		return
	}

	r.Data["json"] = projects
	if err := r.ServeJSON(); err != nil {
		fmt.Println(err)
		r.Abort("500")
		return
	}
}

func (r projectController) Post() {
	project := storage.Project{}

	if err := json.Unmarshal(r.Ctx.Input.RequestBody, &project); err != nil {
		fmt.Println(err.Error())
		r.Abort("400")
		return
	}

	if err := storage.CreateProject(&project); err != nil {
		r.Abort("500")
		return
	}

	r.Data["json"] = project

	if err := r.ServeJSON(); err != nil {
		fmt.Println(err)
		r.Abort("500")
		return
	}
}

func (r projectController) Put() {


}

func NewProjectController() *projectController {
	return &projectController{}
}
