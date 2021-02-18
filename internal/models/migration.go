package models

import (
    "github.com/boltdb/bolt"
    "i18n-editor/internal/storage"
)

func Migrate() error {
    return createCollections()
}

func createCollections() error {
    if err := createProjects(); err != nil {
        return err
    }

    if err := createTranslations(); err != nil {
        return err
    }

    return nil
}

func createProjects() error {
    return storage.Connection.Update(func(tx *bolt.Tx) error {
        _, err := tx.CreateBucketIfNotExists([]byte(collectionProjects))
        return err
    })
}

func createTranslations() error {
    return storage.Connection.Update(func(tx *bolt.Tx) error {
        _, err := tx.CreateBucketIfNotExists([]byte(collectionProjects))
        return err
    })
}
