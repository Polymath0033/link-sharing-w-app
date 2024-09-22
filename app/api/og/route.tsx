//  const username = searchParams.get("username");
//const length = username ? username.length : 0;
//   const username_image = username?.substring(0, length - 4);
//   const username_extension =
//     username && length >= 4 ? username.substring(length - 4, length) : "";
// import { NextResponse } from "next/og";
// export const runtime = "edge";
// import { CustomSelectIcon } from "@/components/molecules/custom-svg";
// export const GET = async (req: Request) => {
//   try {
//       const { searchParams, protocol, host } = new URL(req.url);
//       const first_name = searchParams.get("first_name") || "World";
//       const last_name = searchParams.get("last_name") || "";
//       const email = searchParams.get("email") || "";
//       const icons = searchParams.get("icons") || "";
//   } catch (e) {
//     console.error("Error generating image", e);
//     return new Response("Failed to generate og:image", { status: 500 });
//   }
// };
// "https://vtttlvlxaekgkwrkhwhx.supabase.co/storage/v1/object/public/user_image/user_image/5c13442b-d4cf-4438-b5a6-da1a56a79f95/
import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");
  const length = username ? username.length : 0;
  const username_image = username?.substring(0, length - 4);
  const username_extension =
    username && length >= 4 ? username.substring(length - 4, length) : "";

  if (!username) {
    return new ImageResponse(<>Visit with &quot;?username=vercel&quot;</>, {
      width: 1200,
      height: 630,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 60,
          color: "black",
          background: "#f6f6f6",
          width: "100%",
          height: "100%",
          paddingTop: 50,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          width="256"
          height="256"
          src={`https://vtttlvlxaekgkwrkhwhx.supabase.co/storage/v1/object/public/user_image/user_image/5c13442b-d4cf-4438-b5a6-da1a56a79f95/${username_image}${username_extension}`}
          style={{
            borderRadius: 128,
          }}
        />

        <p>github.com/{username} </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
