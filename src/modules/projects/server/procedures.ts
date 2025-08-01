import { prisma } from "@/lib/db";
import { protectedProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";
import { generateSlug } from "random-word-slugs";
import { TRPCError } from "@trpc/server";
import { inngest } from "@/inngest/client";

export const projectsRouter = createTRPCRouter({
    // Create a new project in the db
    create: protectedProcedure
        .input(
            z.object({
                value: z.string()
                    .min(1, { message: "Value is required" })
                    .max(5000, { message: "Value exceeds maximum length" }),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const project = await prisma.project.create({
                data: {
                    userId: ctx.auth.userId, // userId from Clerk auth
                    name: generateSlug(2, {
                        format: "kebab"
                    }),
                    messages: {
                        create: {
                            content: input.value,
                            role: "USER",
                            type: "RESULT",
                        }
                    }
                }
            })

            await inngest.send({
                name: "dev/ai.agent",
                data: {
                    value: input.value,
                    projectId: project.id,
                }
            });

            return project;
        }),
    // Delete a project by ID
    delete: protectedProcedure
        .input(
            z.object({
                id: z.string().min(1, { message: "Project ID is required" })
            })
        )
        .mutation(async ({ input, ctx }) => {
            const project = await prisma.project.findUnique({
                where: {
                    id: input.id,
                    userId: ctx.auth.userId,
                },
            });

            if (!project) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });
            }

            await prisma.project.delete({
                where: {
                    id: input.id,
                },
            });

            return { success: true };
        }),
    // Get a singular project by ID
    getOne: protectedProcedure
        .input(
            z.object({
                id: z.string().min(1, { message: "ID is required" })
            }),
        )
        .query(async ({ input, ctx }) => {
            const project = await prisma.project.findUnique({
                where: {
                    id: input.id,
                    userId: ctx.auth.userId, // userId from Clerk auth
                }
            });

            if (!project) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });
            }

            return project;
        }),
    // Retrieve all projects for a given user
    getMany: protectedProcedure
        .query(async ({ ctx }) => {
            const projects = await prisma.project.findMany({
                where: {
                    userId: ctx.auth.userId, // userId from Clerk auth
                },
                orderBy: {
                    updatedAt: "desc"
                },
            });

            return projects;
        })
})