package models

import (
    "encoding/json"
    "github.com/boltdb/bolt"
    uuid "github.com/satori/go.uuid"
    "i18n-editor/internal/storage"
    "time"
)

type Project struct {
    ID         string     `json:"id"`
    Name       string     `json:"name"`
    Languages  []Language `json:"languages"`
    CreateDate int64      `json:"createDate"`
    UpdateDate int64      `json:"updateDate"`
}

func GetProjects() ([]Project, error) {
    projects := make([]Project, 0)
    err := storage.Connection.View(func(tx *bolt.Tx) error {
        return getProjectBucket(tx).ForEach(func(key, value []byte) error {
            project := newProject()

            if err := json.Unmarshal(value, &project); err != nil {
                return err
            }

            projects = append(projects, project)
            return nil
        })
    })

    return projects, err
}

func GetProject(id string) (*Project, error) {
    return nil, nil
}

func CreateProject(project *Project) error {
    return storage.Connection.Update(func(tx *bolt.Tx) error {
        id := uuid.NewV4()
        project.ID = id.String()
        project.CreateDate = time.Now().Unix()

        value, err := json.Marshal(project)
        if err != nil {
            return err
        }

        return getProjectBucket(tx).Put(id.Bytes(), value)
    })
}

func getProjectBucket(tx *bolt.Tx) *bolt.Bucket {
    return tx.Bucket([]byte(collectionProjects))
}

func newProject() Project {
    return Project{
        Languages: make([]Language, 0),
    }
}
