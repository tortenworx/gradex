import { Body } from "#build/components";
import auth from '@/server/utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body)
  await auth.attemptCredentials(event, body.username, body.password);
});