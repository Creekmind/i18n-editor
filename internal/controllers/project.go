package controllers

import (
    "encoding/json"
    "fmt"
    "github.com/beego/beego/v2/server/web"
    "github.com/boltdb/bolt"
    "i18n-editor/internal/models"
    "i18n-editor/internal/storage"
)

type projectController struct {
    web.Controller
}

func (r projectController) GetProject() {
    id := r.Ctx.Input.Param(":id")

    err := storage.Connection.View(func(tx *bolt.Tx) (err error) {
        r.Data["json"], err = models.GetProject(tx, id)
        return
    })

    if err != nil {
        r.CustomAbort(404, err.Error())
        return
    }

    if err := r.ServeJSON(); err != nil {
        fmt.Println(err)
        r.CustomAbort(500, err.Error())
        return
    }
}

func (r projectController) GetProjects() {
    err := storage.Connection.View(func(tx *bolt.Tx) (err error) {
        r.Data["json"], err = models.GetProjects(tx)
        return err
    })

    if err != nil {
        r.CustomAbort(500, err.Error())
        return
    }

    if err := r.ServeJSON(); err != nil {
        fmt.Println(err)
        r.CustomAbort(500, err.Error())
        return
    }
}

func (r projectController) CreateProject() {
    project := models.Project{}

    if err := json.Unmarshal(r.Ctx.Input.RequestBody, &project); err != nil {
        fmt.Println(err.Error())
        r.Abort("400")
        return
    }

    err := storage.Connection.Update(func(tx *bolt.Tx) error {
        return project.Create(tx)
    })

    if err != nil {
        r.CustomAbort(500, err.Error())
        return
    }

    r.Data["json"] = project

    if err := r.ServeJSON(); err != nil {
        fmt.Println(err)
        r.Abort("500")
        return
    }
}

func (r projectController) UpdateProject() {

}

func NewProjectController() *projectController {
    return &projectController{}
}
