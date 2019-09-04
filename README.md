<h2>Tutorial how to install Lisk Core (from sources) on Windows 64bit machine</h2>

1. Download and install nodejs 10.16.3:<br>
   https://nodejs.org/dist/v10.16.3/node-v10.16.3-x64.msi

2. Download and install Git:<br>
   https://github.com/git-for-windows/git/releases/download/v2.21.0.windows.1/Git-2.21.0-64-bit.exe

3. Download and install Python 2.7.14:<br>
   https://www.python.org/ftp/python/2.7.14/python-2.7.14.amd64.msi
 
   choose - "Install for all users"<br>
   choose - "Add python.exe to Path"<br>

4. Download and install Microsoft Visual studio 2015 C++ compiler:<br>
   https://go.microsoft.com/fwlink/?LinkId=532606&clcid=0x409

   choose - "Custom" install<br>
   choose - "Programming Languages" -> "Visual C++"

5. Download and install postgres:<br>
   https://oscg-downloads.s3.amazonaws.com/packages/PostgreSQL-10.5-1-win64-bigsql.exe

   choose - "pgAdmin3 LTS"<br>

6. Run postgres server:<br>
   Press Windows+R keys<br>
   cmd (enter)<br>
   
   in console:<br>
   cd C:\PostgreSQL<br>
   pgc.bat start<br>

7. Start -> Programs -> "PostgreSQL" -> "pgAdmin3 LTS by BigSQL"<br>
   connect to database<br>
   create database: lisk_test<br>
   create login roles: your windows account name<br>

8. Start -> Programs -> "Git" -> "Git Bash"<br>
   Now in console:

   cd C:&#92;<br>
   git clone https://github.com/LiskHQ/lisk-core.git<br>
   cd lisk-core<br>
   git checkout v2.1.1-rc.0 -b v2.1.1-rc.0<br>
   npm config set msvs_version 2015<br>
   npm ci<br>
   npm run build<br>

9. In directory "C:\lisk-core\config\testnet\" edit: config.json<br>
   add line in "logger" section:<br>
   "consoleLogLevel": "info"<br>

10. Press Windows+R keys<br>
    cmd (enter)
    <br>
    in console:<br>
    cd C:\lisk-core\dist<br>

    and run Lisk Core:<br>
    node index.js --network testnet<br>

Done!
