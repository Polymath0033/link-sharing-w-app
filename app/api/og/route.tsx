import { ImageResponse } from "next/og";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const firstName = searchParams.get("first_name") || "User";
  const lastName = searchParams.get("last_name") || "Profile";
  const userImage = searchParams.get("user_image") || "";
  console.log(userImage);
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          color: "white",
          background: "linear-gradient(135deg, #2C003E, #633CFF)",
          width: "100%",
          height: "100%",
          display: "flex",
          // flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            //   gap: "20px",
            alignItems: "center",
          }}
        ></div>
        {/* https://vtttlvlxaekgkwrkhwhx.supabase.co/storage/v1/object/public/user_image/user_image/5c13442b-d4cf-4438-b5a6-da1a56a79f95/IMG_20210912_174535_290.jpg */}
        <img
          src={`https://vtttlvlxaekgkwrkhwhx.supabase.co/storage/v1/object/public/user_image/user_image/5c13442b-d4cf-4438-b5a6-da1a56a79f95/${userImage}`}
          alt={`${firstName} ${lastName}`}
          width="200"
          height="200"
          tw={`rounded-[50%] mb-5`}
          style={{
            borderRadius: "50%",
            marginBottom: "20px",
          }}
        />
        <h2 style={{ fontSize: 72, fontWeight: "bold" }}>
          {" "}
          {`${firstName} ${lastName}`}
        </h2>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
