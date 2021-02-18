package models

import (
    "encoding/json"
    "fmt"
    "github.com/boltdb/bolt"
    "io"
)

type Translations struct {
    Key string `json:"key"`
    ProjectID string `json:"projectID"`
    Translations []translation `json:"translations"`
}

type translation struct {
    Language string `json:"language"`
    Value    string `json:"value"`
}

func GetTranslations(tx *bolt.Tx, project, key string) (*Translations, error) {
    translations := newTranslations(project, key)

    value := getTranslationBucket(tx).Get(translations.Hash())
    if value == nil {
        return nil, io.EOF
    }

    if err := json.Unmarshal(value, &translations); err != nil {
        return nil, err
    }

    return translations, nil
}

func (r *Translations) Upsert(tx *bolt.Tx, project, key string) error {
    translations, err := GetTranslations(tx, project, key)

    if err == io.EOF {
        return r.put(tx)
    }

    if err != nil {
        return err
    }

    if err := r.Merge(translations); err != nil {
        return err
    }


    return r.put(tx)
}

func (r *Translations) Merge(source *Translations) error {
    r.Translations = source.Translations
    return nil
}

func (r *Translations) put(tx *bolt.Tx) error {
    buffer, err := json.Marshal(r)
    if err != nil {
        return err
    }

    return getTranslationBucket(tx).Put(r.Hash(), buffer)
}

func (r Translations) Hash() []byte {
    return []byte(fmt.Sprintf("%s-%s", r.ProjectID, r.Key))
}

func newTranslations(project, key string) *Translations {
    return &Translations{
        ProjectID: project,
        Key: key,
        Translations: make([]translation, 0),
    }
}

func getTranslationBucket(tx *bolt.Tx) *bolt.Bucket {
    return tx.Bucket([]byte(collectionTranslations))
}
