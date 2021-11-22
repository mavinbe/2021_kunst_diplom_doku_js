#!/bin/bash
# taken from https://gist.github.com/mplinuxgeek/dcbc3a4d0f51f2b445608e3da832ebb5
# rev 4 - changes suggested by KownBash https://www.reddit.com/r/bash/comments/5cxfqw/i_wrote_a_simple_video_to_gif_bash_script_thought/da19gjz/
# rev 5 - made the script more verbose
# rev 6 - fixed an issue with a variable not displaying correctly
# rev 7 - added option to change dither level
# rev 8 - rewrote usage function
# Usage function, displays valid arguments
usage() {
echo "Usage: $(basename ${0}) [arguments] inputfile" 1>&2
echo "  -f  fps, defaults to 15" 1>&2
echo "  -w  width, defaults to 480" 1>&2
echo "  -d  dither level, value between 0 and 5, defaults to 5" 1>&2
echo "                    0 is no dithering and large file" 1>&2
echo "                    5 is maximum dithering and smaller file" 1>&2
echo -e "\nExample: $(basename ${0}) -w 320 -f 10 -d 1" 1>&2
exit 1
}
# Default variables
fps=15
width=480
dither=5
# getopts to process the command line arguments
while getopts ":f:w:d:" opt; do
case "${opt}" in
        f) fps=${OPTARG};;
        w) width=${OPTARG};;
        d) dither=${OPTARG};;
*) usage;;
esac
done
# shift out the arguments already processed with getopts
shift "$((OPTIND - 1))"
if (( $# == 0 )); then
printf >&2 'Missing input file\n'
    usage >&2
fi
# set input variable to the first option after the arguments
input="$1"
# Extract filename from input file without the extension
filename=$(basename "${input}")
#extension="${filename##*.}"
filename="${filename%.*}.gif"
# Debug display to show what the script is using as inputs
echo "Input: ${1}"
echo "Output: ${filename}"
echo "FPS: ${fps}"
echo "Width: ${width}"
echo "Dither Level: ${dither}"
# temporary file to store the first pass pallete
palette="/tmp/palette.png"
# options to pass to ffmpeg
filters="fps=${fps},scale=${width}:-1:flags=lanczos"
# ffmpeg first pass
echo -ne "\nffmpeg 1st pass... "
ffmpeg -v warning -i "${input}" -vf "${filters},palettegen=stats_mode=diff" -y "${palette}" && echo "done"
# ffmpeg second pass
echo -ne "ffmpeg 2nd pass... "
ffmpeg -v warning -i "${input}" -i "${palette}" -lavfi "${filters} [x]; [x][1:v] paletteuse=dither=bayer:bayer_scale=${dither}" -y "${filename}" && echo "done"
# display output file size
filesize=$(du -h "${filename}" | cut -f1)
echo -e "\nOutput File Name: ${filename}"
echo "Output File Size: ${filesize}"
