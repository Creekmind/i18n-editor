package cmd

var (
	defaultServerAddr = "127.0.0.1"
	defaultServerPort = 8081
	defaultMetricsPort = 2112

	defaultDbFile = "/tmp/i18n.db"

	serverPort int
	serverAddr string

	dbFile string

	metricsPort int
)
