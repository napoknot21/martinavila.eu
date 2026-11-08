#!/usr/bin/env bash
# Prepare a raw stock clip for the About page.
#
#   scripts/prepare-video.sh <input-video> <paris|brest|luxembourg|dublin> [start-seconds]
#
# Writes public/videos/<city>.mp4: a 5 s loop, 1920 px wide, 30 fps, no audio,
# H.264 (two-pass, ~2 Mb/s, under 1.5 MB), +faststart so it streams at once.
# It also saves three frames to /tmp so you can check there are no people in it.
set -euo pipefail

input="${1:?usage: prepare-video.sh <input> <paris|brest|luxembourg|dublin> [start]}"
city="${2:?city required: paris, brest, luxembourg or dublin}"
start="${3:-0}"
duration=5

case "$city" in
  paris | brest | luxembourg | dublin) ;;
  *) echo "Unknown city '$city' (paris, brest, luxembourg, dublin)" >&2; exit 1 ;;
esac

root="$(cd "$(dirname "$0")/.." && pwd)"
out="$root/public/videos/$city.mp4"
mkdir -p "$root/public/videos"
passlog="$(mktemp -d)/pass"

filters="scale=1920:-2:flags=lanczos,fps=30,format=yuv420p"
common=(-ss "$start" -t "$duration" -i "$input" -an -vf "$filters" -c:v libx264 -preset slow
  -b:v 2000k -maxrate 2300k -bufsize 4000k -profile:v high -movflags +faststart)

ffmpeg -hide_banner -loglevel error -y "${common[@]}" -pass 1 -passlogfile "$passlog" -f mp4 /dev/null
ffmpeg -hide_banner -loglevel error -y "${common[@]}" -pass 2 -passlogfile "$passlog" "$out"

size=$(stat -c %s "$out")
printf '✓ %s  %d kB\n' "${out#"$root"/}" $((size / 1024))
if [ "$size" -gt 1572864 ]; then
  echo "⚠ Over 1.5 MB: try a calmer clip or lower -b:v in this script." >&2
fi

for t in 0.5 2.5 4.5; do
  ffmpeg -hide_banner -loglevel error -y -ss "$t" -i "$out" -frames:v 1 "/tmp/${city}-check-${t}.jpg"
done
echo "  Frames to check for people: /tmp/${city}-check-{0.5,2.5,4.5}.jpg"
echo "  Rebuild (npm run build) so the About page picks the video up."
