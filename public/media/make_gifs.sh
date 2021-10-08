#!/bin/bash

cd src

convert () {
  vid2gif.sh -f 1 -w 130 -d 5 "${1}"
}

for filename in ./*; do

        convert "$filename"
done