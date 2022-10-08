@REM @Author: mengyao
@REM @Date:   2020-04-15 09:00:00
@REM @Last Modified by:   mengyao
@REM @Last Modified time: 2020-04-15 09:00:00

@ECHO OFF

CD /D "%~dp0"

ECHO ========== pre-deploy BOF ========== task stat: %ERRORLEVEL%

IF %ERRORLEVEL% EQU 0 (
	ECHO.
	CALL npm rum lint
	ECHO.
)

IF %ERRORLEVEL% EQU 0 (
	ECHO.
	CALL npm rum build:dev
	ECHO.
)

ECHO ========== pre-deploy EOF ========== task stat: %ERRORLEVEL%

IF %ERRORLEVEL% NEQ 0 (
	ECHO pre-deploy end with error: %ERRORLEVEL%
	EXIT /B 255
)
