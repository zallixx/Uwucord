import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chats = await db.chat.findMany({
            where: {
                participants: {
                    some: {
                        id: profile.id
                    }
                }
            }
        });

        return NextResponse.json(chats);
    } catch (error) {
        console.error("[GET_CHATS]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
