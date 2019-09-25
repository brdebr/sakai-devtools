import inquirer from 'inquirer';
import getToolNames from './functions/getTools';
let tools : string[] = getToolNames('L:\\DESARROLLO\\Sakai\\source\\master');
console.log(tools);

async function app() {
    var promptData = await inquirer.prompt(
        {
            type: "checkbox",
            name: 'selectedTools',
            message: 'Which tools do you want to compile?',
            choices: tools
          }
    )
    console.log({promptData});
}


app()