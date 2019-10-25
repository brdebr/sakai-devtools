import fs, { PathLike } from "fs";
import path from "path";
import { SakaiTool } from "../models/SakaiTool";
const child_process = require("child_process");
const convert = require("xml-js");
const consola = require("consola");

export interface FileData {
  name: string
  path: string
  type?: 'file' | 'folder'
  extension?: string
  children: Array<FileData>
}

class ToolManager {
  static getToolNames(sakaiPath: PathLike): string[] {
    let directories: string[] = [];
    fs.readdirSync(sakaiPath, { withFileTypes: true })
      .filter(element => element.isDirectory() && !element.name.startsWith("."))
      .forEach(file => {
        directories.push(file.name);
      });
    return directories;
  }
  static getFilesTree(dirPath: string, currentLevel: number, maxLevel: number): FileData {
    let data: FileData = {
        name: path.basename(dirPath),
        path: dirPath,
        type: 'folder',
        children: []
    }
    if (currentLevel > maxLevel){
        return data;
    }
    fs.readdirSync(dirPath,{ withFileTypes: true }).forEach(function(element: {name:string, isDirectory: Function}) {
        let filepath = path.join(dirPath , element.name);
        if (!element.isDirectory()) {
          if (!path.basename(filepath).startsWith('.')) {
            data.children.push({
                name: path.basename(filepath),
                path: filepath,
                type: 'file',
                children: []
            })
          }
        } else {
            if(element.name !== 'target' && !element.name.startsWith('.')){
              let aux = ToolManager.getFilesTree(filepath, currentLevel + 1, maxLevel)
              if(aux.children.length > 0){
                data.children.push(aux)
              }
            }
        }
    });
    return data;
  }
  static getToolXmlObject(location: string, toolName: string): any {
    try {
      var toolDir = path.join(location, toolName);
      var defaultToolPath = "tool/src/webapp/tools";
      var toolXmlFile = fs.readdirSync(path.join(toolDir, defaultToolPath))[0];
      var xmlFile = fs.readFileSync(
        path.join(toolDir, defaultToolPath, toolXmlFile),
        "utf8"
      );
      var result = convert.xml2js(xmlFile, {
        ignoreComment: true,
        alwaysChildren: true
      });
      // console.log(result);
      return result;
    } catch (error) {
      // console.log({ERROR: {
      //     from: __filename + ' -> ' + 'getToolObject()',
      //     error
      // }});
    }
  }
  static getToolInfo(location: string, toolName: string): SakaiTool {
    try {
      var tool = ToolManager.getToolXmlObject(location, toolName);
      var auxAttributes = tool.elements[0].elements[0].attributes;
      /* This syntax --->| elements.map((el: { attributes: { name: string; }; }) => { ... } |<--- means :
                   The variable "el" will be type Object with the structure specified inline */
      var categories = tool.elements[0].elements[0].elements.map(
        (el: { attributes: { name: string } }) => el.attributes.name
      );
      var auxTool: SakaiTool = {
        id: auxAttributes.id,
        title: auxAttributes.title,
        description: auxAttributes.description,
        categories
      };
      return auxTool;
    } catch (error) {
      return {
        id: toolName + "-Error",
        title: toolName,
        description: error
      };
      // console.log({error});
    }
  }
  static async deployTool(
    toolName: string,
    sakaiPath: string
  ): Promise<boolean> {
    const execCommand = `mvn clean install sakai:deploy -Dmaven.tomcat.home=%CATALINA_BASE% -Djava.net.preferIPv4Stack=true -Dmaven.test.skip=true -Dsakai.cleanup=true`;
    consola.info(`-- Deploying tool: > ${toolName} < --`);
    // const exec =
    return new Promise((resolve, reject) => {
      var mvnProcess = child_process.spawn("cmd.exe", ["/c", execCommand], {
        cwd: path.join(sakaiPath, toolName),
        stdio: "inherit"
      });
      mvnProcess.on("close", function(code: any) {
        var succeded = code === 0;
        if (succeded) {
          consola.success(`--Finished deployment of tool: > ${toolName} < --`);
        } else {
          consola.error(`--FAILED deployment of tool: > ${toolName} < --`);
        }
        resolve(succeded);
      });
      mvnProcess.on("error", function(code: any) {
        consola.error(`--ERROR on tool: > ${toolName} < --`);
        reject();
      });
    });
  }
}
export default ToolManager;
