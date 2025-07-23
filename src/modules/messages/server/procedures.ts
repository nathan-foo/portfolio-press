import { prisma } from "@/lib/db";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const messagesRouter = createTRPCRouter({
    // Returns messages associated with a Project ID
    getMany: protectedProcedure
        .input(
            z.object({
                projectId: z.string().min(1, { message: "Project ID is required" }),
            }),
        )
        .query(async ({ input, ctx }) => {
            const messages = await prisma.message.findMany({
                where: {
                    projectId: input.projectId,
                    project: {
                        userId: ctx.auth.userId, // userId from Clerk auth
                    }
                },
                include: {
                    sandbox: true,
                },
                orderBy: {
                    updatedAt: "asc"
                },
            });

            return messages;
        }),
    // Create a new message within a project
    create: protectedProcedure
        .input(
            z.object({
                value: z.string()
                    .min(1, { message: "Value is required" })
                    .max(10000, { message: "Value exceeds maximum length" }),
                projectId: z.string().min(1, { message: "Project ID is required" }),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const project = await prisma.project.findUnique({
                where: {
                    id: input.projectId,
                    userId: ctx.auth.userId, // userId from Clerk auth
                }
            });

            if (!project) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });
            }

            // Create new message and store in db
            const message = await prisma.message.create({
                data: {
                    content: input.value,
                    role: "USER",
                    type: "RESULT",
                    projectId: project.id,
                }
            });

            return message;
        })
})