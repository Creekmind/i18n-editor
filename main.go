package main

import "fmt"
import "i18n-editor/cmd"

func main() {
	if err := cmd.Execute(); err != nil {
		fmt.Printf("command line initilialization error: %s", err.Error())
	}
}
