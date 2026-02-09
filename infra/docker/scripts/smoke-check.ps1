$ErrorActionPreference = "Stop"

function Assert-Status {
  param(
    [Parameter(Mandatory = $true)][string]$Name,
    [Parameter(Mandatory = $true)][string]$Url,
    [Parameter(Mandatory = $true)][int]$Expected
  )

  $status = curl.exe -s -o NUL -w "%{http_code}" $Url
  if ([int]$status -ne $Expected) {
    throw "Check failed: $Name ($Url) returned $status, expected $Expected"
  }

  Write-Output ("PASS {0}: {1}" -f $Name, $status)
}

function Assert-Contains {
  param(
    [Parameter(Mandatory = $true)][string]$Name,
    [Parameter(Mandatory = $true)][string]$Url,
    [Parameter(Mandatory = $true)][string]$Pattern
  )

  $body = curl.exe -s $Url
  if (-not ($body -match $Pattern)) {
    throw "Check failed: $Name ($Url) does not contain pattern '$Pattern'"
  }

  Write-Output ("PASS {0}: pattern found" -f $Name)
}

Write-Output "Running smoke checks..."

# Gateway + service checks
Assert-Status -Name "catalog health" -Url "http://127.0.0.1:8081/health" -Expected 200
Assert-Status -Name "media health" -Url "http://127.0.0.1:8082/health" -Expected 200
Assert-Status -Name "gateway health" -Url "http://127.0.0.1:8080/health" -Expected 200
Assert-Status -Name "gateway home en" -Url "http://127.0.0.1:8080/api/v1/home?locale=en" -Expected 200
Assert-Status -Name "gateway catalog ru" -Url "http://127.0.0.1:8080/api/v1/catalog?locale=ru" -Expected 200
Assert-Status -Name "gateway visual ru" -Url "http://127.0.0.1:8080/api/v1/visual-research?locale=ru" -Expected 200
Assert-Status -Name "gateway invalid locale" -Url "http://127.0.0.1:8080/api/v1/home?locale=de" -Expected 400

# Frontend route checks
Assert-Status -Name "root redirect" -Url "http://127.0.0.1:3000/" -Expected 307
Assert-Status -Name "ru home" -Url "http://127.0.0.1:3000/ru" -Expected 200
Assert-Status -Name "en home" -Url "http://127.0.0.1:3000/en" -Expected 200
Assert-Status -Name "en catalog" -Url "http://127.0.0.1:3000/en/catalog" -Expected 200
Assert-Status -Name "ru visual research" -Url "http://127.0.0.1:3000/ru/visual-research" -Expected 200
Assert-Contains -Name "en content marker" -Url "http://127.0.0.1:3000/en" -Pattern "Metamorphosis and Silence"

Write-Output "Smoke checks completed successfully."

