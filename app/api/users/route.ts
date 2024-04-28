import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``

interface Data {
    id: string
    first_name: string
    last_name: string
    image_url: string
    has_image: boolean
}

async function validateRequest(request: Request){
    const payloadString = await request.text()
    const headerPayload = headers()

    const svixHeaders = {
        'svix-id': headerPayload.get('svix-id')!,
        'svix-timestamp': headerPayload.get('svix-timestamp')!,
        'svix-signature': headerPayload.get('svix-signature')!,
    }

    const wh = new Webhook(webhookSecret)
    return wh.verify(payloadString, svixHeaders) as WebhookEvent
}

export async function POST(request: Request) {
    const payload  = await validateRequest(request)
    const data = payload.data as Data

    try {
        await db.profile.update({
                where: {
                    userId: data.id
                },
                data: {
                    name: data.first_name + ' ' + data.last_name,
                    imageUrl: data.image_url
                }
            }
        )

        return new NextResponse("OK", { status: 200 });
    }
    catch (error) {
        return new NextResponse('Internal Error', { status: 400 });
    }
}