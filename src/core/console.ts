#!/usr/bin/env node
import inquirer from "inquirer";
import path from "path";
import ToolManager from "@/functions/ToolManager";
const consola = require("consola");

async function app() {
  let sakaiPath = process.cwd();

  let promptData = await inquirer.prompt({
    type: "checkbox",
    name: "selectedTools",
    message: "Which tools do you want to compile?",
    choices: ToolManager.getToolNames(sakaiPath)
  });
  let confirmation = await inquirer.prompt({
    type: "confirm",
    name: "value",
    message: `Compile this tools to '${
      process.env.CATALINA_BASE
    }' ? \n-${promptData.selectedTools.join("\n-")}\n`,
    default: true
  });
  if (!confirmation.value) {
    return;
  }
  let errors: string[] = [];
  for (const toolName of promptData.selectedTools) {
    let success = await ToolManager.deployTool(toolName, sakaiPath);
    if (!success) {
      errors.push(toolName);
      consola.warn("-Skipping tool : " + toolName);
    }
  }
  let successTotal = promptData.selectedTools.length - errors.length;
  consola.info(
    `-- Deployed ${successTotal}/${promptData.selectedTools.length} tools --`
  );
  if (errors.length > 0) {
    consola.warn(
      "Failed to deploy :\n" + errors.map(el => "- " + el).join("\n")
    );
  }
}

app();
