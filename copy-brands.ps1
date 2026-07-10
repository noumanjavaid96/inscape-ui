# Copy brand images from "Featured Partners Btands" to public/brand/partners with slug-friendly names
$src = "Featured Partners Btands"
$dst = "public\brand\partners"

if (-not (Test-Path $dst)) { New-Item -ItemType Directory -Path $dst -Force }

$mapping = @()
Get-ChildItem $src | ForEach-Object {
    $original = $_.Name
    $baseName = $_.BaseName
    $ext = $_.Extension.ToLower()
    
    # Create slug: lowercase, remove apostrophes/special chars, replace spaces/non-alphanum with hyphens
    $slug = $baseName.ToLower()
    $slug = $slug -replace "['\u2019]", ""         # remove apostrophes
    $slug = $slug -replace "\+", "plus"            # + -> plus
    $slug = $slug -replace "\&", "and"             # & -> and  
    $slug = $slug -replace "[^a-z0-9]+", "-"       # non-alphanum -> hyphen
    $slug = $slug -replace "^-|-$", ""             # trim leading/trailing hyphens
    
    # Force png extension for consistency
    $destFile = "$dst\$slug.png"
    
    Copy-Item $_.FullName -Destination $destFile -Force
    Write-Output "$original -> $slug.png"
    
    $mapping += [PSCustomObject]@{
        Original = $baseName
        Slug = $slug
        Extension = $ext
    }
}

Write-Output ""
Write-Output "Total files copied: $($mapping.Count)"
Write-Output ""
Write-Output "// JS data for offers.js:"
foreach ($m in $mapping | Sort-Object Slug) {
    Write-Output "  slug: '$($m.Slug)', brand: '$($m.Original)'"
}
