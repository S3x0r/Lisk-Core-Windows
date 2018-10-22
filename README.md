<h2>Tutorial how to install Lisk Core (from sources) on Windows 64bit machine</h2>

1. Download and install nodejs 6.14.1:<br>
   https://nodejs.org/download/release/v6.14.1/node-v6.14.1-x64.msi

2. Download and install Git:<br>
   https://github.com/git-for-windows/git/releases/download/v2.19.1.windows.1/Git-2.19.1-64-bit.exe

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

8. Start -> Programs -> "Node.js" -> "Node.js command prompt"<br>
   Now in consone:

   cd C:'\
   git clone https://github.com/LiskHQ/lisk.git<br>
   cd lisk<br>
   git checkout testnet-master<br>
   npm config set msvs_version 2015<br>
   npm install<br>

9. In file C:\lisk\logger.js:<br>
   change line:<br>
   child_process.execSync(`mkdir -p ${path.dirname(config.filename)}`);<br>
   to:<br>
   //child_process.execSync(`mkdir -p ${path.dirname(config.filename)}`);<br>

10. Create "logs" directory in C:\lisk\

11. In lisk directory edit: config.json<br>
    change line:<br>
    "consoleLogLevel": "none",<br>
    to:<br>
    "consoleLogLevel": "info",<br>

12. Press Windows+R keys<br>
    cmd (enter)
    <br>
    in console:<br>
    cd C:\lisk<br>

    and run Lisk Core:<br>
    node app.js<br>

Done!
