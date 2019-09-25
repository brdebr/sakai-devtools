import fs, { PathLike } from "fs";
import path from 'path';
var convert = require('xml-js');

class ToolManager {
    static getToolNames(directory:PathLike) : string[] {
        let directories : string[] = [];
        fs.readdirSync(directory, { withFileTypes: true })
            .filter(element => element.isDirectory() && !element.name.startsWith('.'))
            .forEach(file => {
                directories.push(file.name)
            });
        return directories;
    }
    static getToolObject(location: string,toolName: string) : any{
        try {
            var toolDir = path.join(location,toolName)
            var defaultToolPath = "tool/src/webapp/tools"
            var toolXmlFile = fs.readdirSync(path.join(toolDir,defaultToolPath))[0]
            var xmlFile = fs.readFileSync(path.join(toolDir,defaultToolPath,toolXmlFile), 'utf8');
            var result = convert.xml2js(xmlFile, {
                ignoreComment: true,
                alwaysChildren: true
            });
            // console.log(result);
            return result
        } catch (error) {
            // console.log({ERROR: {
            //     from: __filename + ' -> ' + 'getToolObject()',
            //     error
            // }});
        }
    }
}


export default ToolManager;