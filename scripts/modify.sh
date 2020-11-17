#!/bin/sh

git filter-branch --env-filter '
OLD_EMAIL="chenzheng04@58.com"
CORRECT_NAME="artoriaschan"
CORRECT_EMAIL="544396118@qq.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags

# Rewrite 35c4d4c3e8b675d7b4b555dce3cff975366f5cf8 (3/4) (1 seconds passed, remaining 0 predicted)
# Ref 'refs/heads/master' was rewritten