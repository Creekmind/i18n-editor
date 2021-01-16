package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
)

var (
	serverCmd = &cobra.Command{
	  Use:   "server",
	  Short: "Setup HTTP server for i18n-editor",
	}
)

func init() {
	startCmd := &cobra.Command{
		Use:   "start",
		Short: "Start the server",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("Starting the server...")
		},
	}

	startCmd.Flags().IntVarP(&serverPort, "port", "p", defaultServerPort, "Server port")
	startCmd.Flags().IntVarP(&metricsPort, "metrics", "m", defaultMetricsPort, "Metrics port")

	serverCmd.AddCommand(startCmd)
}
