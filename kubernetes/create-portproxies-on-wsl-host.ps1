$portRegex = "[1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]"
$ipv4Regex = "(?:[0-9]{1,3}\.){3}[0-9]{1,3}"

# this assumes the machine running the script is hosting WSL 
#   and WSL is running minikube with docker engine
# this represents SSH sessions into the minikube cluster node
#   by the WSL docker user
$wslProcesses = wsl bash -c "ps -eo cmd | grep docker@127.0.0.1"

$wslPortsToProxy = @()

foreach ($wslProcess in $wslProcesses) {
  # this assumes minikube is running a NodePort svc
  $tunnelPortIpPortRegex = "(?<WSLPort>$portRegex):(?<NodePortIp>$ipv4Regex):(?<PodPort>$portRegex)"

  if ($wslProcess -Match $tunnelPortIpPortRegex) {
    $wslPortsToProxy += $Matches.WSLPort
  }
}

foreach ($wslPort in $wslPortsToProxy) {
  # set up port proxy on WSL host
  #   Windows Server --portproxy--> WSL VM --SSH tunnel--> Minikube Node --NodePort--> Pod
  Write-Host "Creating port proxy for address 0.0.0.0 and port $wslPort"
  netsh interface portproxy set v4tov4 `
    listenport=$wslPort `
    listenaddress=0.0.0.0 `
    connectport=$wslPort `
    connectaddress=$(wsl hostname -I)
}