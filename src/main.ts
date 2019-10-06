import inquirer from 'inquirer';
import path from 'path';
import ToolManager from './functions/ToolManager';
const consola = require('consola')

async function app() {
    let argmts = process.argv.slice(2)
    let sakaiPath: string
    if(argmts.length === 0){
        let sakaiPrompt = await inquirer.prompt(
            {
                type: "input",
                name: 'value',
                message: 'Introduce sakai souce code path',
                validate: input => {
                    return !!input || 'Please introduce the path'
                }
            }
        )
        sakaiPath = path.normalize(sakaiPrompt.value)
    }else{
        sakaiPath = path.normalize(argmts[0])
    }

    let promptData = await inquirer.prompt(
        {
            type: "checkbox",
            name: 'selectedTools',
            message: 'Which tools do you want to compile?',
            choices: ToolManager.getToolNames(sakaiPath)
        }
    )
    let confirmation = await inquirer.prompt(
        {
            type: "confirm",
            name: 'value',
            message: `Compile this tools to '${process.env.CATALINA_BASE}' ? \n-${promptData.selectedTools.join('\n-')}\n`,
            default: true
        }
    )
    if(!confirmation.value){
        return
    }
    let errors: string[] = [];
    for (const toolName of promptData.selectedTools) {
        let success = await ToolManager.deployTool(toolName,sakaiPath)
        if(!success){
            errors.push(toolName)
            consola.warn('-Skipping tool : '+toolName);
        }
    }
    let successTotal = promptData.selectedTools.length - errors.length
    consola.info(`-- Deployed ${successTotal}/${promptData.selectedTools.length} tools --`)
    if(errors.length > 0){
        consola.warn('Failed to deploy :\n'+errors.map(el => '- '+el).join('\n'))
    }
}


app()