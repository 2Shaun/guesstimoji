#!/bin/bash -xv

str0="test"

echo $str0 | grep test 1>/dev/null 2>&1
if $?; then
  echo "str0 did not contain test"
else
  echo "str0 did contain test"
fi

echo $str0 | grep dumb 1>/dev/null 2>&1
if $?; then
  echo "str0 did not contain dumb"
else
  echo "str0 did contain dumb"
fi