#!/bin/bash
rm -rf build
rm build.tar.gz
npm run build
tar czvf build.tar.gz build
scp build.tar.gz pi@192.168.50.110:/myProjects/python/rasiberry_pi_gpio_ui.tar.gz
