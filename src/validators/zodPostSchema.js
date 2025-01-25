import { z } from "zod";

const ACCEPTED_IMAGE_TYPE = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const zodPostSchema = z.object({
  caption: z.string({ message: "caption is missing" }).min(1),
  // Check if `req.file` exists and validate its mimetype
  image: z.custom(
    (file) => !!file && ACCEPTED_IMAGE_TYPE.includes(file.mimetype),
    {
      message: ".jpg, .jpeg, .png, and .webp files are accepted",
    }
  ),
});
