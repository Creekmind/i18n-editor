package storage

import "github.com/boltdb/bolt"

var (
	db *bolt.DB
)

func Init(path string) error {
	if err := openConnection(path); err != nil {
		return err
	}

	return createCollections()
}

func openConnection(path string) error {
	var err error
	db, err = bolt.Open(path, 0600, nil)

	return err
}

func createCollections() error {
	return db.Update(func(tx *bolt.Tx) error {
		_, err := tx.CreateBucketIfNotExists([]byte(CollectionProjects))
		return err
	})
}
