import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/contents/posts",
  }),
  schema: z.object({
    title: z.string(),
    published: z.preprocess((arg) => {
      if (typeof arg === "string") {
        // 尝试解析 "YYYY-MM-DD HH:mm" 格式
        const parts = arg.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})$/);
        if (parts) {
          // 注意: 直接用 new Date(string) 可能因时区问题产生偏差，
          // 但 Astro/Zod 通常在 UTC 或服务器本地时间处理，这里暂时简化处理。
          // 更健壮的方式是指定时区或使用库如 date-fns-tz。
          // 这里假设输入是本地时间。
          return new Date(parseInt(parts[1]), parseInt(parts[2]) - 1, parseInt(parts[3]), parseInt(parts[4]), parseInt(parts[5]));
        }
        // 如果不是目标格式，尝试标准 Date 解析
        return new Date(arg);
      }
      return arg; // 如果已经是 Date 对象或其他类型，直接传递
    }, z.date()), // 确保预处理后的结果是有效的 Date 对象
    draft: z.boolean().optional(),
    description: z.string().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional(),
    category: z.string().optional(),
    author: z.string().optional(),
    sourceLink: z.string().optional(),
    licenseName: z.string().optional(),
    licenseUrl: z.string().optional(),
  }),
});

const specs = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "src/contents/specs",
  }),
});

export const collections = { posts, specs };
