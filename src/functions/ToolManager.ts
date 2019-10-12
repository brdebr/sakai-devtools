import fs, { PathLike } from "fs";
import path from 'path';
import { SakaiTool } from '../models/SakaiTool';
const child_process = require('child_process');
var convert = require('xml-js');
const consola = require('consola')

class ToolManager {
    static getToolNames(sakaiPath: PathLike) : string[] {
        let directories : string[] = [];
        fs.readdirSync(sakaiPath, { withFileTypes: true })
            .filter(element => element.isDirectory() && !element.name.startsWith('.'))
            .forEach(file => {
                directories.push(file.name)
            });
        return directories;
    }
    static getToolXmlObject(location: string,toolName: string) : any{
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
    static getToolInfo(location: string,toolName: string): SakaiTool{
        try {
            var tool = ToolManager.getToolXmlObject(location, toolName)
            var auxAttributes = tool.elements[0].elements[0].attributes
            /* This syntax --->| elements.map((el: { attributes: { name: string; }; }) => { ... } |<--- means :
                   The variable "el" will be type Object with the structure specified inline */
            var categories = tool.elements[0].elements[0].elements.map((el: { attributes: { name: string; }; }) => el.attributes.name )
            var auxTool : SakaiTool = {
                id: auxAttributes.id,
                title: auxAttributes.title,
                description: auxAttributes.description,
                categories
            }
            return auxTool
        } catch (error) {
            return {
                id: toolName + '-Error',
                title: toolName,
                description: error,
            }
            // console.log({error});
        }
    }
    static async deployTool(toolName:string, sakaiPath:string): Promise<boolean>{
        const execCommand = `mvn clean install sakai:deploy -Dmaven.tomcat.home=%CATALINA_BASE% -Djava.net.preferIPv4Stack=true -Dmaven.test.skip=true -Dsakai.cleanup=true`
        consola.info(`-- Deploying tool: > ${toolName} < --`)
        // const exec = 
        return new Promise((resolve,reject) => {
            var mvnProcess = child_process.spawn("cmd.exe", ["/c", execCommand], {cwd: path.join(sakaiPath,toolName), stdio: "inherit"});
            mvnProcess.on('close', function(code:any) {
                var succeded = code === 0;
                if(succeded){
                    consola.success(`--Finished deployment of tool: > ${toolName} < --`)
                }else{
                    consola.error(`--FAILED deployment of tool: > ${toolName} < --`);
                }
                resolve(succeded)
            })
            mvnProcess.on('error', function(code:any) {
                consola.error(`--ERROR on tool: > ${toolName} < --`);
                reject()
            })
        })
    }
}
export default ToolManager;