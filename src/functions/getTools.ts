import fs, { PathLike } from "fs";

function getToolNames(directory:PathLike) : string[] {
    let directories : string[] = [];
    fs.readdirSync(directory, { withFileTypes: true })
        .filter(element => element.isDirectory() && !element.name.startsWith('.'))
        .forEach(file => {
            directories.push(file.name)
        });
    return directories;
}

export default getToolNames;