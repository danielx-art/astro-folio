import { defineCollection, z } from "astro:content";

const projectsColletion = defineCollection({
  schema: z.object({
    draft: z.boolean().default(true),
    title: z.record(z.string(), z.string()),
    description: z.record(z.string(), z.string()),
    techs: z.array(z.string()),
    link: z.string().optional(),
  }),
});

export const collections = {
  projects: projectsColletion,
};
