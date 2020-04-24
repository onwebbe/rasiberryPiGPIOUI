#!/bin/bash
rm -rf build
rm build.tar.gz
npm run build
tar czvf build.tar.gz build