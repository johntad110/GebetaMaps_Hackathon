import { NextRequest, NextResponse } from "next/server";

let locales = ['am', 'en']
let defaultLocales = locales[0]

export function middleware(request: NextRequest) {
    // Check if there's any locale in the path name
    const { pathname } = request.nextUrl

    if (pathname.startsWith('/images') || pathname.startsWith('/_next') || pathname.startsWith('/api')) {
        return
    }

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )
    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = defaultLocales

    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
    ]
}