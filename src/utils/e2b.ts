import Sandbox from "@e2b/code-interpreter";

export const SANDBOX_TIMEOUT = 60_000 * 15;

export async function getSandbox(sandboxId: string) {
    // Return sandbox instance from sandbox id
    const sandbox = await Sandbox.connect(sandboxId);
    await sandbox.setTimeout(SANDBOX_TIMEOUT);
    return sandbox;
}