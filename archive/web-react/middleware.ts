import { auth } from "./auth"

export default auth((req) => {
  const allowedGuestRoutes = ['/accounts/login', '/accounts/reset-password', '/accounts/resend-invitation']
  const allowedGlobalRoutes = ['/about', '/legal/terms', '/legal/privacy']
  const path = req.nextUrl.pathname
  const isGuestRoute = allowedGuestRoutes.includes(path)
  const isGlobalRoute = allowedGlobalRoutes.includes(path)

  if (!isGuestRoute && !isGlobalRoute && !req.auth) {
    const newUrl = new URL('/accounts/login', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

  if (isGuestRoute && !isGlobalRoute && req.auth) {
    const newUrl = new URL('/', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}