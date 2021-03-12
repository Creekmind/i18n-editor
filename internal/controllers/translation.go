package controllers

import (
    "encoding/json"
    "fmt"
    "github.com/beego/beego/v2/server/web"
    "github.com/boltdb/bolt"
    "i18n-editor/internal/models"
    "i18n-editor/internal/storage"
)

type translationsController struct {
    web.Controller
}

func (r *translationsController) GetKeys() {
    projectID := r.Ctx.Input.Param(":id")

    var keys []models.Translations
    err := storage.Connection.View(func(tx *bolt.Tx) (err error) {
        keys, err = models.GetKeys(tx, projectID)
        return
    })

    if err != nil {
        r.CustomAbort(500, err.Error())
        return
    }

    r.Data["json"] = keys

    if err := r.ServeJSON(); err != nil {
        fmt.Println(err)
        r.CustomAbort(500, err.Error())
        return
    }
}

func (r *translationsController) UpsertTranslations() {
    projectID := r.Ctx.Input.Param(":id")
    key := r.Ctx.Input.Param(":key")

    translations := new(models.Translations)
    if err := json.Unmarshal(r.Ctx.Input.RequestBody, translations); err != nil {
        fmt.Println(err.Error())
        r.Abort("400")
        return
    }

    err := storage.Connection.Update(func(tx *bolt.Tx) (err error) {
        return translations.Upsert(tx, projectID, key)
    })

    if err != nil {
        r.CustomAbort(500, err.Error())
        return
    }

    r.Data["json"] = translations

    if err := r.ServeJSON(); err != nil {
        fmt.Println(err)
        r.CustomAbort(500, err.Error())
        return
    }
}

func (r *translationsController) GetTranslations() {
    projectID := r.Ctx.Input.Param(":id")
    key := r.Ctx.Input.Param(":key")

    var translations *models.Translations
    err := storage.Connection.View(func(tx *bolt.Tx) (err error) {
        translations, err = models.GetTranslations(tx, projectID, key)

        return err
    })

    if err != nil {
        r.CustomAbort(500, err.Error())
        return
    }

    r.Data["json"] = translations

    if err := r.ServeJSON(); err != nil {
        fmt.Println(err)
        r.CustomAbort(500, err.Error())
        return
    }
}

func NewTranslationsController() *translationsController {
    return &translationsController{}
}
