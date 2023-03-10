import { defineCollection, z } from "astro:content";

const projectsColletion = defineCollection({
  schema: z.object({
    draft: z.boolean().default(true),
    title: z.string(),
    description: z.string(),
    techs: z.array(z.string()),
    link: z.string().optional(),
  }),
});

export const collections = {
  projects: projectsColletion,
};
