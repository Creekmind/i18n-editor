package cmd

import (
	"fmt"
	"github.com/beego/beego/v2/server/web"
	"github.com/spf13/cobra"
	"i18n-editor/api"
	"i18n-editor/internal/storage"
)

var (
	serverCmd = &cobra.Command{
	  Use:   "server",
	  Short: "HTTP server for i18n-editor",
	}
)

func startWebServer() {
	api.StartRouter()

	if err := storage.Init(dbFile); err != nil {
		fmt.Println(err.Error())
		return
	}

	web.Run(fmt.Sprintf("%s:%d", serverAddr, serverPort))
}

func init() {
	startCmd := &cobra.Command{
		Use:   "start",
		Short: "Start the server",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println("Starting the server on: ", fmt.Sprintf("%s:%d", serverAddr, serverPort))
			startWebServer()
		},
	}

	startCmd.Flags().StringVarP(&serverAddr, "host", "", defaultServerAddr, "Server host")
	startCmd.Flags().IntVarP(&serverPort, "port", "p", defaultServerPort, "Server port")
	startCmd.Flags().IntVarP(&metricsPort, "metrics", "m", defaultMetricsPort, "Metrics port")
	startCmd.Flags().StringVarP(&dbFile, "db", "d", defaultDbFile, "Data file")

	serverCmd.AddCommand(startCmd)
}
