import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // adjust the path to your db.ts file

export async function POST(request: Request) {
  const { name } = await request.json();

  const response = await db.uRInterest.create({
    data: { name },
  });

  return NextResponse.json(response);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const response = await db.uRInterest.delete({
    where: { id: id },
  });

  return NextResponse.json(response);
}
