export { default } from "next-auth/middleware";

// import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";

// const middleWre = async (request: NextRequest) => {
//   return NextResponse.redirect(new URL("/", request.url));
// };

export const config = {
  matcher: ["/dashboard", "/dashboard/user-posts"],
};

// export default middleWre;
