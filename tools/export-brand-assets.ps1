param([string]$BrandRoot = (Join-Path $PSScriptRoot '..\assets\brand'))

Add-Type -AssemblyName System.Drawing

function Export-SquarePng {
  param([string]$Source,[string]$Destination,[int]$Size)
  $image = [System.Drawing.Image]::FromFile($Source)
  try {
    $bitmap = New-Object System.Drawing.Bitmap($Size,$Size,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $bitmap.SetResolution(96,96)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
      $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $graphics.DrawImage($image,0,0,$Size,$Size)
      $bitmap.Save($Destination,[System.Drawing.Imaging.ImageFormat]::Png)
    } finally { $graphics.Dispose(); $bitmap.Dispose() }
  } finally { $image.Dispose() }
}

function Export-WidthPng {
  param([string]$Source,[string]$Destination,[int]$Width)
  $image = [System.Drawing.Image]::FromFile($Source)
  try {
    $height = [Math]::Max(1,[int][Math]::Round($Width * $image.Height / $image.Width))
    $bitmap = New-Object System.Drawing.Bitmap($Width,$height,[System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
      $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $graphics.DrawImage($image,0,0,$Width,$height)
      $bitmap.Save($Destination,[System.Drawing.Imaging.ImageFormat]::Png)
    } finally { $graphics.Dispose(); $bitmap.Dispose() }
  } finally { $image.Dispose() }
}

function New-MultiSizeIco {
  param([string]$Source,[string]$Destination,[int[]]$Sizes)
  $pngPayloads = @()
  foreach($size in $Sizes){
    $tempFile = Join-Path ([System.IO.Path]::GetTempPath()) ("gobilling-icon-$size-" + [guid]::NewGuid().ToString('N') + '.png')
    Export-SquarePng -Source $Source -Destination $tempFile -Size $size
    $pngPayloads += ,([System.IO.File]::ReadAllBytes($tempFile))
    Remove-Item -LiteralPath $tempFile -Force
  }
  $stream = [System.IO.File]::Open($Destination,[System.IO.FileMode]::Create)
  $writer = New-Object System.IO.BinaryWriter($stream)
  try {
    $writer.Write([uint16]0); $writer.Write([uint16]1); $writer.Write([uint16]$Sizes.Count)
    $offset = 6 + (16 * $Sizes.Count)
    for($i=0;$i -lt $Sizes.Count;$i++){
      $size = $Sizes[$i]
      $writer.Write([byte]($(if($size -ge 256){0}else{$size})))
      $writer.Write([byte]($(if($size -ge 256){0}else{$size})))
      $writer.Write([byte]0); $writer.Write([byte]0)
      $writer.Write([uint16]1); $writer.Write([uint16]32)
      $writer.Write([uint32]$pngPayloads[$i].Length); $writer.Write([uint32]$offset)
      $offset += $pngPayloads[$i].Length
    }
    foreach($payload in $pngPayloads){ $writer.Write($payload) }
  } finally { $writer.Dispose(); $stream.Dispose() }
}

$masters = Join-Path $BrandRoot 'masters'
$website = Join-Path $BrandRoot 'website'
$application = Join-Path $BrandRoot 'application'
New-Item -ItemType Directory -Path $website,$application -Force | Out-Null

$mark = Join-Path $masters 'gobilling-mark-gold-master.png'
$app = Join-Path $masters 'gobilling-app-icon-master.png'
$dark = Join-Path $masters 'gobilling-wordmark-dark-master.png'
$light = Join-Path $masters 'gobilling-wordmark-light-master.png'

foreach($size in 16,32,48,64,128,180,192,256,512){
  Export-SquarePng -Source $app -Destination (Join-Path $website "favicon-$size.png") -Size $size
}
Copy-Item -LiteralPath (Join-Path $website 'favicon-180.png') -Destination (Join-Path $website 'apple-touch-icon.png') -Force
Copy-Item -LiteralPath (Join-Path $website 'favicon-192.png') -Destination (Join-Path $website 'pwa-icon-192.png') -Force
Copy-Item -LiteralPath (Join-Path $website 'favicon-512.png') -Destination (Join-Path $website 'pwa-icon-512.png') -Force
New-MultiSizeIco -Source $app -Destination (Join-Path $website 'favicon.ico') -Sizes @(16,32,48,256)

foreach($size in 16,24,32,48,64,128,256,512,1024){
  Export-SquarePng -Source $app -Destination (Join-Path $application "gobilling-app-icon-$size.png") -Size $size
}
New-MultiSizeIco -Source $app -Destination (Join-Path $application 'gobilling-app.ico') -Sizes @(16,24,32,48,64,128,256)

foreach($size in 32,64,128,256,512,1024){
  Export-SquarePng -Source $mark -Destination (Join-Path $application "gobilling-transparent-mark-$size.png") -Size $size
}

foreach($width in 360,720,1440){
  Export-WidthPng -Source $dark -Destination (Join-Path $website "gobilling-wordmark-dark-$width.png") -Width $width
  Export-WidthPng -Source $light -Destination (Join-Path $website "gobilling-wordmark-light-$width.png") -Width $width
}

Write-Output "Brand asset export complete: $BrandRoot"
