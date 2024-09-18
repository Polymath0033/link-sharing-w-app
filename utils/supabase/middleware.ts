import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Logging the user object for debugging
  if (!user) {
    console.log("No user found, redirecting to login");
  } else {
    console.log("Authenticated user:", user);
  }

  // Temporary bypass of redirection to login for debugging
  if (
    !user &&
    !request.nextUrl.pathname.startsWith("/login") &&
    !request.nextUrl.pathname.startsWith("/sign-up")
  ) {
    // Commenting out the redirection for now to debug further
    /*
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
    */
    console.log("Bypassing redirect to login for debugging.");
  }

  // Returning the supabase response as required
  return supabaseResponse;
}
