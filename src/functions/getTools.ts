import fs, { PathLike } from "fs";

function getTools(directory:PathLike) : String[] {
    let directories : String[] = [];
    fs.readdirSync(directory, { withFileTypes: true })
        .filter(element => element.isDirectory() && !element.name.startsWith('.'))
        .forEach(file => {
            directories.push(file.name)
        });
    return directories;
}

export default getTools;