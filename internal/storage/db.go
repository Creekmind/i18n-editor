package storage

import (
	"github.com/boltdb/bolt"
)

var (
	Connection *bolt.DB
)

func Init(path string) error {
	return openConnection(path)
}

func openConnection(path string) error {
	var err error
	Connection, err = bolt.Open(path, 0600, nil)

	return err
}

func closeConnection() error {
	return Connection.Close()
}
