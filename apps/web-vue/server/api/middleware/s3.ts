import { getMeta } from "#s3";

export default defineEventHandler(async (event) => {
  const { pathname } = getRequestURL(event);
  const isS3Mutation = pathname.startsWith("/api/s3/mutation");

  if (isS3Mutation) {
    const meta = await getMeta(event);
  }
});
