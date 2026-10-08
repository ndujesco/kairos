-- Kairos Stage
-- Opens both halves of the live demo and fills the screen with them.
--   left  : Microsoft Edge  -> sign-in, prefilled as @ugo   (the organiser)
--   right : Google Chrome   -> sign-in, prefilled as @abby   (the donor)
--
-- Press Sign in on each, then send Edge to /wallet and Chrome to the cause.
--
-- The menu bar and Dock are set to auto-hide so the two windows go edge to
-- edge, but the windows themselves stay ORDINARY windows. That is the whole
-- trick: macOS Split View would look the same and is fullscreen, and macOS is
-- unreliable about drawing notification banners over a fullscreen app. This
-- gets the same picture and keeps the alerts.
--
-- Positions come from each browser's own AppleScript dictionary, so this needs
-- no Accessibility permission.

set siteURL to "https://kairos-community.vercel.app"
set leftURL to siteURL & "/login?as=ugo"
set rightURL to siteURL & "/login?as=abby"

-- hide the menu bar and Dock, and only restart the Dock if something changed
set changed to false
try
	set mb to do shell script "defaults read NSGlobalDomain _HIHideMenuBar 2>/dev/null || echo 0"
	if mb is not "1" then
		do shell script "defaults write NSGlobalDomain _HIHideMenuBar -bool true"
		set changed to true
	end if
end try
try
	set dk to do shell script "defaults read com.apple.dock autohide 2>/dev/null || echo 0"
	if dk is not "1" then
		do shell script "defaults write com.apple.dock autohide -bool true"
		set changed to true
	end if
end try
if changed then
	do shell script "killall Dock"
	delay 2
end if

tell application "Finder" to set screenBounds to bounds of window of desktop
set screenW to item 3 of screenBounds
set screenH to item 4 of screenBounds
set halfW to screenW div 2

tell application "Microsoft Edge"
	activate
	if (count of windows) is 0 then make new window
	set URL of active tab of front window to leftURL
end tell

tell application "Google Chrome"
	activate
	if (count of windows) is 0 then make new window
	set URL of active tab of front window to rightURL
end tell

delay 1.5

-- edge to edge, top to bottom
tell application "Microsoft Edge" to set bounds of front window to {0, 0, halfW, screenH}
tell application "Google Chrome" to set bounds of front window to {halfW, 0, screenW, screenH}
delay 0.5
tell application "Microsoft Edge" to set bounds of front window to {0, 0, halfW, screenH}
tell application "Google Chrome" to set bounds of front window to {halfW, 0, screenW, screenH}

tell application "Microsoft Edge" to activate
