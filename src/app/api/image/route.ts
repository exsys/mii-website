import { ITEM_Z_INDEX } from "@/assets/character";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import fs from "fs";
import path from "path";

type zlayer = keyof typeof ITEM_Z_INDEX;
const imageWidth = 240;
const imageHeight = 380;
const imagePath = path.join(process.cwd(), "/public/images/character.png");

export async function POST(req: NextRequest) {
    const items = await req.json();

    // sort item types by correct z-index (so sharp can layer them correctly)
    items.sort((a: any, b: any) => {
        return ITEM_Z_INDEX[a.itemType as zlayer] - ITEM_Z_INDEX[b.itemType as zlayer];
    });

    await sharp({
        create: {
            width: imageWidth,
            height: imageHeight,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
    })
        .composite(items.map((item: any, index: number) => ({
            input: path.join(process.cwd(), `/public${item.src}`),
            left: item.position.left,
            top: item.position.top,
            width: imageWidth,
            height: imageHeight,
        })))
        .toFormat("png", { quality: 100 })
        .toFile(imagePath);

    const imageBuffer = fs.readFileSync(imagePath);
    return new NextResponse(imageBuffer, { headers: { 'Content-Type': 'image/png' } });
}