@echo off
title Creating necessary ressources
:top
cls
node launcher.js 
pause
    call npm init
    call npm i discord.js fs chalk
pause
exit 
goto :top