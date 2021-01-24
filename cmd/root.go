package cmd

import "github.com/spf13/cobra"

var rootCmd = &cobra.Command{
	Short: "i18n-editor",
}

func Execute() error {
	if err := rootCmd.Execute(); err != nil {
		return err
	}

	return nil
}

func init() {
	rootCmd.AddCommand(serverCmd)
}
