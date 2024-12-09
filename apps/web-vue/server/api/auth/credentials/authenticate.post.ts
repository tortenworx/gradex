import { Body } from "#build/components";
import auth from '@/server/utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await auth.attemptCredentials(event, body.username, body.password);
});