#!/usr/bin/env bash

DEST="docs/tutorial"
mkdir -p "$DEST"

if [ -d "./XRSDK/docs" ]; then
	echo "start cp ./XRSDK/docs to $DEST ..."

	cp -Rf "./XRSDK/docs/." "$DEST/"

	echo "sync finish"
	exit 0
else
	echo "./XRSDK/docs not exist, abort sync"
	exit 1
fi
