package cmd

import "github.com/spf13/cobra"

var rootCmd = &cobra.Command{
	Short: "Console for Mirror Worlds backend",
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
