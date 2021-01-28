package models

type Language struct {
    ISO  string            `json:"iso"`
    Data map[string]string `json:"data"`
}
