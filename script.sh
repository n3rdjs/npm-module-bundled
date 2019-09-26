#!/bin/zsh
trap "exit" INT

while IFS= read -r LINE; do
    echo "[*] ${LINE}"
    if test -f "${LINE}.js"; then
        echo "PASS"
    else
    if python ../npm-module-bundler/main.py -o "${LINE}.js" $LINE; then
        echo "OK"
    else echo "ERROR"
    fi
    fi
done < TOP1000.txt
