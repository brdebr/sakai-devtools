import inquirer from 'inquirer';
const xmlJs = require('xml-js');

import ToolManager from './functions/getTools';

interface SakaiTool{
    id: string,
    title: string,
    description?: string,
    categories ?: string[]
}

var toolPath: string = 'L:\\DESARROLLO\\Sakai\\source\\master'
let tools : string[] = ToolManager.getToolNames(toolPath);

async function app() {
    var promptData = await inquirer.prompt(
        {
            type: "checkbox",
            name: 'selectedTools',
            message: 'Which tools do you want to compile?',
            choices: tools
          }
    )
    // var tool = ToolManager.getToolObject(toolPath, promptData.selectedTools[0])
    // var auxAttributes = tool.elements[0].elements[0].attributes
    // var testTool : SakaiTool = {
    //     id: auxAttributes.id,
    //     title: auxAttributes.title,
    //     description: auxAttributes.description,
    //     categories: tool.elements[0].elements[0].elements.map(el => el.attributes.name )
    // }
    // console.log(testTool);
    var listOfToolsWithValidXml : SakaiTool[] = []
    promptData.selectedTools.forEach((el, index) => {
        try {
            var tool = ToolManager.getToolObject(toolPath, el)
            var auxAttributes = tool.elements[0].elements[0].attributes
            var testTool : SakaiTool = {
                id: auxAttributes.id,
                title: auxAttributes.title,
                description: auxAttributes.description,
                categories: tool.elements[0].elements[0].elements.map(el => el.attributes.name )
            }
            // console.log(`Tool #${index}:`);
            // console.log(testTool);
            listOfToolsWithValidXml.push(testTool)
        } catch (error) {
            // console.log('shit happens :'+el);
        }
    });
    console.log(listOfToolsWithValidXml);
    // console.log(tool.elements);
    // console.log(tool.elements[0].elements[0].attributes);
    // console.log(tool.elements[0].elements[0].elements.map(el => el.attributes.name )); // Categories
    
}


app()