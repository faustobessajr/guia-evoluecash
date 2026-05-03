import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export function proxy(request: import("next/server").NextRequest) {
  const handleI18n = createMiddleware(routing);
  return handleI18n(request);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)", "/"],
};
