package models

import (
    "github.com/boltdb/bolt"
    "i18n-editor/internal/storage"
)

func Migrate() error {
    return createCollections()
}

func createCollections() error {
    return storage.Connection.Update(func(tx *bolt.Tx) error {
        _, err := tx.CreateBucketIfNotExists([]byte(collectionProjects))
        return err
    })
}
