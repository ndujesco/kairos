-- Kairos Stage
-- Opens the two halves of the live demo and tiles them side by side.
--   left  : Microsoft Edge  -> sign-in, prefilled as @ugo   (the organiser)
--   right : Google Chrome   -> sign-in, prefilled as @abby   (the donor)
--
-- Both land on a filled-in form. Press Sign in on each, then send Edge to
-- /wallet and Chrome to the cause page.
--
-- These are tiled windows, not macOS Split View. Split View is fullscreen and
-- macOS gets unreliable about drawing notification banners over a fullscreen
-- app, which is the one thing this demo cannot lose.

set siteURL to "https://kairos-community.vercel.app"
set leftURL to siteURL & "/login?as=ugo"
set rightURL to siteURL & "/login?as=abby"

tell application "Finder" to set screenBounds to bounds of window of desktop
set screenW to item 3 of screenBounds
set screenH to item 4 of screenBounds

set menuBar to 25
set halfW to screenW div 2
set usableH to screenH - menuBar

tell application "Microsoft Edge"
	activate
	if (count of windows) is 0 then
		make new window
	end if
	set URL of active tab of front window to leftURL
end tell

tell application "Google Chrome"
	activate
	if (count of windows) is 0 then
		make new window
	end if
	set URL of active tab of front window to rightURL
end tell

delay 1.5

tell application "System Events"
	tell process "Microsoft Edge"
		set position of front window to {0, menuBar}
		set size of front window to {halfW, usableH}
	end tell
	tell process "Google Chrome"
		set position of front window to {halfW, menuBar}
		set size of front window to {halfW, usableH}
	end tell
end tell

-- Edge on the left ends up in front, which is where the talking starts
tell application "Microsoft Edge" to activate
