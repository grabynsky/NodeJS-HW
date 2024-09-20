const fs = require('node:fs/promises');
const path = require("node:path");

const homeWork = async () => {
    const baseFolder = path.join(__dirname, 'baseFolder')
    await fs.mkdir(baseFolder, {recursive: true});

    for (let i = 1; i < 6; i++) {
        const currentFolder = path.join(baseFolder, `folder-${i}`)

        await fs.mkdir(currentFolder, {recursive: true});

        const statCurrentFolder = (await fs.stat(currentFolder)).isDirectory()
        console.log(currentFolder, statCurrentFolder)

        for (let j = 1; j < 6; j++) {
            const currentFile = path.join(currentFolder, `baseFile-${j}`)
            await fs.writeFile(currentFile, `Create base file ${j}`)

            const statCurrentFile = (await fs.stat(path.join(currentFolder, `baseFile-${j}`))).isFile()
            console.log(currentFile,statCurrentFile)
        }
    }

}

void homeWork()