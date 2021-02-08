package models

import (
    "encoding/json"
    "errors"
    "github.com/boltdb/bolt"
    uuid "github.com/satori/go.uuid"
    "i18n-editor/internal/helpers"
)

type Project struct {
    ID         string     `json:"id"`
    Name       string     `json:"name"`
    Languages  []Language `json:"languages"`
    CreateDate int64      `json:"createDate"`
    UpdateDate int64      `json:"updateDate"`
}

func GetProjects(tx *bolt.Tx) ([]Project, error) {
    projects := make([]Project, 0)

    err := getProjectBucket(tx).ForEach(func(key, value []byte) error {
        project := newProject()

        if err := json.Unmarshal(value, project); err != nil {
            return err
        }

        projects = append(projects, *project)
        return nil
    })

    return projects, err
}

func GetProject(tx *bolt.Tx, id string) (*Project, error) {
    project := newProject()

    key, err := uuid.FromString(id)
    if err != nil {
        return nil, err
    }

    value := getProjectBucket(tx).Get(key.Bytes())
    if value == nil {
        return nil, errors.New("not found")
    }

    if err := json.Unmarshal(value, &project); err != nil {
        return nil, err
    }

    return project, nil
}

func (r *Project) Create(tx *bolt.Tx) error {
    id := uuid.NewV4()
    r.ID = id.String()
    r.CreateDate = helpers.NowMillis()
    r.UpdateDate = r.CreateDate

    value, err := r.GetValue()
    if err != nil {
        return err
    }

    return getProjectBucket(tx).Put(id.Bytes(), value)
}

func (r *Project) Update(tx *bolt.Tx) error {
    r.UpdateDate = helpers.NowMillis()

    value, err := r.GetValue()
    if err != nil {
        return err
    }

    return getProjectBucket(tx).Put(r.GetKey(), value)
}

func (r *Project) GetKey() []byte {
    id, err := uuid.FromString(r.ID)
    if err != nil {
        return nil
    }

    return id.Bytes()
}

func (r *Project) GetValue() ([]byte, error) {
    return json.Marshal(r)
}

func (r *Project) Delete(tx *bolt.Tx) error {
    return getProjectBucket(tx).Delete(r.GetKey())
}

func (r *Project) Merge(project *Project) error {
    r.Name = project.Name
    r.Languages = project.Languages
    return nil
}

func getProjectBucket(tx *bolt.Tx) *bolt.Bucket {
    return tx.Bucket([]byte(collectionProjects))
}

func newProject() *Project {
    return &Project{
        Languages: make([]Language, 0),
    }
}
