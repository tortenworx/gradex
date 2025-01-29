import { Body } from "#build/components";
import auth from '@/server/utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const data = await auth.attemptCredentials(event, body.username, body.password);
  return data
});