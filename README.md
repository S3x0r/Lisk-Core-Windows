Tutorial how to install Lisk Core (from sources) on Windows 64bit machine 

1. Download and install nodejs 6.14.1:<br>
   https://nodejs.org/download/release/v6.14.1/node-v6.14.1-x64.msi

2. Download and install Git:<br>
   https://github.com/git-for-windows/git/releases/download/v2.19.1.windows.1/Git-2.19.1-64-bit.exe

3. Download and install Python 2.7.14:<br>
   https://www.python.org/ftp/python/2.7.14/python-2.7.14.amd64.msi
 
   choose - "Install for all users"
   choose - "Add python.exe to Path"

4. Download and install Microsoft Visual studio 2015 C++ compiler:<br>
   https://go.microsoft.com/fwlink/?LinkId=532606&clcid=0x409

   choose - "Custom" install
   choose - "Programming Languages" -> "Visual C++"

5. Download and install postgres:<br>
   https://oscg-downloads.s3.amazonaws.com/packages/PostgreSQL-10.5-1-win64-bigsql.exe

   choose - "pgAdmin3 LTS"

6. Run postgres server:<br>
   Press Windows+R keys
   cmd (enter)
   
   in console:
   cd C:\PostgreSQL
   pgc.bat start

7. Start -> Programs -> "PostgreSQL" -> "pgAdmin3 LTS by BigSQL"<br>
   connect to database
   create database: lisk_test
   create login roles: your windows account name

8. Start -> Programs -> "Node.js" -> "Node.js command prompt"<br>
   Now in consone:

   cd C:\
   git clone https://github.com/LiskHQ/lisk.git
   cd lisk
   git checkout testnet-master
   npm config set msvs_version 2015
   npm install

9. In file C:\lisk\logger.js:<br>
   change line:
   child_process.execSync(`mkdir -p ${path.dirname(config.filename)}`);
   to:
   //child_process.execSync(`mkdir -p ${path.dirname(config.filename)}`);


10. Create "logs" directory in C:\lisk\<br>

11. In lisk directory edit: config.json<br>
    change line:
    "consoleLogLevel": "none",
    to:
    "consoleLogLevel": "info",

12. Press Windows+R keys<br>
    cmd (enter)
    
    in console:
    cd C:\lisk

    and run Lisk Core:
    node app.js

Done!

