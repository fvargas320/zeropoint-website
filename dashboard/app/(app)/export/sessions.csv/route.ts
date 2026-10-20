import { NextResponse } from "next/server";
import { getViewer } from "@/lib/session";
import { sessionsCsv } from "@/lib/csv";

// Route handlers don't run the (app) layout, so this checks Pro itself.
export async function GET(request: Request) {
  const { repo, pro } = await getViewer();
  if (!pro.pro) return NextResponse.redirect(new URL("/upgrade", request.url));
  const csv = sessionsCsv(await repo.sessions());
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="zeropoint-sessions-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
