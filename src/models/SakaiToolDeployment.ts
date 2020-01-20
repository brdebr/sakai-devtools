export interface SakaiToolDeployment {
    name: string
    state: DeploymentState
    log?: string
  }

export enum DeploymentState {
    "initial",
    "deploying",
    "success",
    "error",
    "warning"
}