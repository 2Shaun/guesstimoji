$proxies = netsh interface portproxy show all | ConvertFrom-String -PropertyNames ListenAddress, ListenPort, ConnectAddress, ConnectPort

foreach ($proxy in $proxies) {
  $listenAddress = $proxy.ListenAddress
  $listenPort = $proxy.ListenPort
  Write-Host "Removing port proxy for address $listenAddress and port $listenPort"
  netsh interface portproxy delete v4tov4 listenaddress=$listenAddress listenport=$listenPort
}