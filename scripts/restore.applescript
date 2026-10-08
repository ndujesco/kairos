-- Kairos Restore
-- Puts the menu bar and the Dock back after the demo.
do shell script "defaults write NSGlobalDomain _HIHideMenuBar -bool false"
do shell script "defaults write com.apple.dock autohide -bool false"
do shell script "killall Dock"
display notification "Menu bar and Dock are back." with title "Kairos"
