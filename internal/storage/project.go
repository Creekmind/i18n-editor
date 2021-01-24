package storage

import (
	"encoding/json"
	"github.com/boltdb/bolt"
	uuid "github.com/satori/go.uuid"
	"time"
)

const (
	CollectionProjects = "projects"
)

type Project struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	CreateDate int64  `json:"createDate"`
	UpdateDate int64  `json:"updateDate"`
}

func GetProjects() ([]Project, error) {
	projects := make([]Project, 0)
	err := db.View(func(tx *bolt.Tx) error {
		return getProjectBucket(tx).ForEach(func(key, value []byte) error {
			project := Project{}
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
	return db.Update(func(tx *bolt.Tx) error {
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
	return tx.Bucket([]byte(CollectionProjects))
}
