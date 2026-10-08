-- Kairos Stage
-- Opens both halves of the live demo and tiles them side by side.
--   left  : Microsoft Edge  -> sign-in, prefilled as @ugo   (the organiser)
--   right : Google Chrome   -> sign-in, prefilled as @abby   (the donor)
--
-- Press Sign in on each, then send Edge to /wallet and Chrome to the cause.
--
-- The windows are positioned through each browser's own AppleScript dictionary
-- rather than System Events, so this needs no Accessibility permission at all.
--
-- These are tiled windows, not macOS Split View. Split View is fullscreen, and
-- macOS gets unreliable about drawing notification banners over a fullscreen
-- app, which is the one thing this demo cannot lose.

set siteURL to "https://kairos-community.vercel.app"
set leftURL to siteURL & "/login?as=ugo"
set rightURL to siteURL & "/login?as=abby"

tell application "Finder" to set screenBounds to bounds of window of desktop
set screenW to item 3 of screenBounds
set screenH to item 4 of screenBounds
set halfW to screenW div 2
set topY to 25

tell application "Microsoft Edge"
	activate
	if (count of windows) is 0 then make new window
	set URL of active tab of front window to leftURL
	set bounds of front window to {0, topY, halfW, screenH}
end tell

tell application "Google Chrome"
	activate
	if (count of windows) is 0 then make new window
	set URL of active tab of front window to rightURL
	set bounds of front window to {halfW, topY, screenW, screenH}
end tell

-- settle, then put them where they belong once more in case the page load
-- nudged anything, and leave Edge in front where the talking starts
delay 1
tell application "Microsoft Edge" to set bounds of front window to {0, topY, halfW, screenH}
tell application "Google Chrome" to set bounds of front window to {halfW, topY, screenW, screenH}
tell application "Microsoft Edge" to activate
