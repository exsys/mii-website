import { ITEM_Z_INDEX } from "@/assets/character";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { ITEMS_FEMALE, ITEMS_MALE } from "@/assets/items";

type zlayer = keyof typeof ITEM_Z_INDEX;
const imageWidth = 240;
const imageHeight = 380;
const imagePath = path.join(process.cwd(), "/public/images/character.png");

export async function POST(req: NextRequest) {
    const character = await req.json();

    // TODO: handle color change

    let allItems: any;
    switch (character.gender) {
        case "male":
            allItems = ITEMS_MALE;
            break;
        case "female":
            allItems = ITEMS_FEMALE;
            break;
        default:
            console.log("Error: gender is not defined");
            break;
    }

    delete character["gender"];

    // iterate through each item type (like hair, eyes, etc)
    let items: any[] = [];
    let ignoreList = ["beard", "hat"];
    for (let i = 0; i < Object.keys(character).length; i++) {
        const itemType = Object.keys(character)[i] as zlayer;
        const itemId: any = character[itemType];
        if (itemType.includes("color") || ignoreList.includes(itemType)) {
            continue;
        }
        const item: any = allItems[itemType].find((item: any) => item.id === itemId); // item object of each item type
        items.push(item);
    }

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