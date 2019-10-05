import inquirer from 'inquirer';
import ToolManager from './functions/ToolManager';

async function app() {
    let sakaiPath: string = 'L:\\DESARROLLO\\Sakai\\source\\master'

    let promptData = await inquirer.prompt(
        {
            type: "checkbox",
            name: 'selectedTools',
            message: 'Which tools do you want to compile?',
            choices: ToolManager.getToolNames(sakaiPath)
        }
    )
    for (const toolName of promptData.selectedTools) {
        let success = await ToolManager.deployTool(toolName,sakaiPath)
        if(!success){
            console.log('Skipping tool : '+toolName);
            break
        }
    }
}


app()