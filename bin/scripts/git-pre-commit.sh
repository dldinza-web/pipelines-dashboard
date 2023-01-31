#!/bin/sh

# Run this script from .git/hooks/pre-commit
##
# !/bin/sh
#
#./bin/scripts/git-pre-commit.sh"
##

STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

if [[ "$STAGED_FILES" = "" ]]; then
  exit 0
fi

echo "\nAnalyzing the Source Code:\n"

yarn check-code
