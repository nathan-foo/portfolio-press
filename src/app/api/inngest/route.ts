import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { agentFunction } from "@/inngest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    /* your functions will be passed here later! */
    agentFunction,
  ],
});