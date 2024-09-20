const fs = require('node:fs/promises');
const path = require('node:path');

const home = async () => {
    try {
        const pathToDir = path.join(__dirname, 'baseFolder');
        await fs.mkdir(pathToDir, {recursive:true});
//Create array folder and file
        const folderNames = ['folder-1', 'folder-2', 'folder-3', 'folder-4', 'folder-5'];
        const fileNames = ['file-1.txt', 'file-2.txt', 'file-3.txt', 'file-4.txt', 'file-5.txt'];

        await Promise.all(folderNames.map(async folder=>{
            const pathFolder = path.join(pathToDir, folder);
            await fs.mkdir(pathFolder,{recursive:true});

            await Promise.all(fileNames.map(async file =>{
                const pathFile = path.join(pathFolder, file);
                await fs.writeFile(pathFile, 'create file')
            }))
        }))

        const data = await fs.readdir(pathToDir);
        for (const folder of data) {
            const folderPath = path.join(pathToDir, folder);
            const stat = await fs.stat(folderPath);
            console.log(`Folder: ${folder}, isDirectory: ${stat.isDirectory()}`)

            const files = await fs.readdir(folderPath);
            for (const file of files) {
                const pathToFile = path.join(folderPath, file);
                const statFile = await fs.stat(pathToFile);
                console.log(`File: ${file}, isFile: ${statFile.isFile()}`)
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

void home();