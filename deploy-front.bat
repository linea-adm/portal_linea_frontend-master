@echo off
REM Define o caminho do diretório de origem
set SOURCE=D:\www\portal_linea_frontend-master\build\*

REM Define o caminho do diretório de destino
set DESTINATION=D:\docker\asslfront\src\portal_linea_frontend\public

echo Deletando arquivos existentes em %DESTINATION%...
del /Q /F %DESTINATION%\*
echo Arquivos deletados.


REM Copia todos os arquivos do diretório de origem para o diretório de destino
xcopy /s /i /y %SOURCE% %DESTINATION%

echo Copia concluida!

