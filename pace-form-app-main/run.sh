#!/bin/bash

# details: this code run the project (backend and front) at the same time open a new shell, when exit, kill the process
# date: 04/OCT/2022
# by: deliverst
# status: finish
# todo: nothing
# Note: for to works, needs to enable "Working directory or document" and "Paht" options in Preferences in tab window teminal

user=$(whoami)
host=$(hostname | sed s/\\.local//)
userAndHost="$user@$host"
pathCurrent=$(pwd)
pathHome=$(echo $HOME | sed -E 's/\//\\\//g')
pathFrontend=$((echo $pathCurrent/frontend) | sed -E "s/$pathHome/~/g")
pathTabTerminal="$pathFrontend — $userAndHost"

function stop() {
	kills
	sleep 1
	osascript -e "
	tell application \"Terminal\"
		set nameTab to get name of every window
		repeat with i in nameTab
			if i contains \"$pathTabTerminal\" then
				set iWindow to get the index of window i
				close window iWindow
			end if
		end repeat
	end tell
	"
	clear
	echo "byebye guapo :v"
	exit 1
}

function run() {
	echo "Starting..."
	npm run --prefix backend dev & #run in background server
	osascript -e "
	tell application \"Terminal\"
		activate
		tell application \"System Events\"
			keystroke \"t\" using {command down}
		end tell
		do script \"cd \" & \"$pathFrontend\" & \" && npm run dev\" in front window
	end tell

	do shell script \"sleep 1\"

	set leftt to 124
	tell application \"Terminal\"
		activate
		tell application \"System Events\"
			key code leftt using {command down, shift down}
		end tell
	end tell
	"
}

function kills() {
	lsof -i -P -n | grep LISTEN | grep -E '(3000|3001|5173)' | awk '{print $2 }' | while read pid; do kill -9 $pid; done
}

function status() {
	lsof -i -P -n | grep LISTEN | grep -E '(3000|3001|5173)'
}

"$@"