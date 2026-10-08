#!/bin/bash
# Lays the stage out: Ugo in Edge on the left, Abigail in Chrome on the right,
# each filling exactly half the screen.
#
#   npm run stage                 against the live site
#   SITE=http://localhost:3210 npm run stage
#
# These are TILED WINDOWS, not macOS Split View. Split View is fullscreen, and
# macOS refuses to draw notification banners over a fullscreen app, which is the
# one thing this demo cannot do without. Tiled windows look identical and still
# get notifications.

SITE="${SITE:-https://kairos-community.vercel.app}"
LEFT_URL="$SITE/wallet"            # Ugo, the organiser
RIGHT_URL="$SITE/cause/final-year-student-unilag-tuition-fees-aom2"

read -r SW SH < <(osascript -e 'tell application "Finder" to get bounds of window of desktop' \
  | awk -F', *' '{print $3" "$4}')

# leave the menu bar clear so notifications have somewhere to land
MENU=25
H=$((SH - MENU))
HALF=$((SW / 2))

open -a "Microsoft Edge" "$LEFT_URL"
open -a "Google Chrome"  "$RIGHT_URL"
sleep 2

osascript <<OSA
tell application "System Events"
  tell process "Microsoft Edge"
    set position of front window to {0, $MENU}
    set size of front window to {$HALF, $H}
  end tell
  tell process "Google Chrome"
    set position of front window to {$HALF, $MENU}
    set size of front window to {$HALF, $H}
  end tell
end tell
OSA

echo
echo "  Left  ${HALF}x${H}  Microsoft Edge  ->  $LEFT_URL        (sign in as @ugo)"
echo "  Right ${HALF}x${H}  Google Chrome   ->  $RIGHT_URL  (sign in as @abby)"
echo
echo "  Do NOT press the green button or use Split View: that is fullscreen,"
echo "  and macOS hides notification banners over fullscreen apps."
echo
