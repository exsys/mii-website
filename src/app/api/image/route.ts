import { ITEM_Z_INDEX } from "@/assets/character";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";
import got from "got";
import { ITEMS_FEMALE, ITEMS_MALE } from "@/assets/items";
import {
    ACCESSORYCOLOR_MAPPING,
    ACCESSORYGAMMA_MAPPING_1,
    ACCESSORYGAMMA_MAPPING_2,
    EYECOLOR_MAPPING, EYEGAMMA_MAPPING_1, EYEGAMMA_MAPPING_2,
    HAIRCOLOR_MAPPING, HAIRGAMMA_MAPPING_1, HAIRGAMMA_MAPPING_2,
    SHIRTCOLOR_MAPPING, SHIRTGAMMA_MAPPING_1, SHIRTGAMMA_MAPPING_2,
} from "@/assets/mappings";
import { BASE_URL } from "@/config/config";

type zlayer = keyof typeof ITEM_Z_INDEX;
const imageWidth = 240;
const imageHeight = 380;
const isProduction = process.env.NODE_ENV === "production";

export async function POST(req: NextRequest) {
    try {
        const character = await req.json();

        let allItems: any;
        switch (character.gender) {
            case "male":
                allItems = { ...ITEMS_MALE };
                break;
            case "female":
                allItems = { ...ITEMS_FEMALE };
                break;
            default:
                console.log("Error: gender is not defined");
                break;
        }

        delete character["gender"];

        // iterate through each item type (like hair, eyes, etc)
        let items: any[] = [];
        let ignoreList = ["beard"];
        for (let i = 0; i < Object.keys(character).length; i++) {
            const itemType = Object.keys(character)[i] as zlayer;
            const itemId: any = character[itemType];
            if (ignoreList.includes(itemType) || itemType.includes("color")) {
                continue;
            }

            const item: any = allItems[itemType].find((item: any) => item.id === itemId); // item object of each item type
            const copy = { ...item }; // copy needed because else nextjs will use the reference when multiple calls occur. it will just add to the string instead of replace it.
            if (itemType === "head") {
                copy.src = copy.src.replace(`head${copy.id}`, `head${copy.id}-${character.skin_color}`);
            }

            // TODO: this can be changed from cdn to local storage. performance would increase if images are stored on local server
            const imgSrc = isProduction ? `${BASE_URL}${copy.src}` : path.join(process.cwd(), `/public${copy.src}`);
            if (isProduction) {
                const imgBuffer = await got(imgSrc).buffer();
                copy.src = imgBuffer;
            } else {
                copy.src = imgSrc;
            }

            items.push({ ...copy });
        }

        // replace color related items with the correct color
        if (character.hair_color !== 1) {
            const hairObject = items.find((item: any) => item.itemType === "hair");
            const eyebrowsObject = items.find((item: any) => item.itemType === "eyebrows");
            hairObject.src = await sharp(hairObject.src)
                .gamma(
                    HAIRGAMMA_MAPPING_1[character.hair_color as keyof typeof HAIRGAMMA_MAPPING_1],
                    HAIRGAMMA_MAPPING_2[character.hair_color as keyof typeof HAIRGAMMA_MAPPING_2]
                )
                .tint(HAIRCOLOR_MAPPING[character.hair_color as keyof typeof HAIRCOLOR_MAPPING])
                .toBuffer();
            eyebrowsObject.src = await sharp(eyebrowsObject.src)
                .gamma(
                    HAIRGAMMA_MAPPING_1[character.hair_color as keyof typeof HAIRGAMMA_MAPPING_1],
                    HAIRGAMMA_MAPPING_2[character.hair_color as keyof typeof HAIRGAMMA_MAPPING_2]
                )
                .tint(HAIRCOLOR_MAPPING[character.hair_color as keyof typeof HAIRCOLOR_MAPPING])
                .toBuffer();
        }

        if (character.eye_color !== 1) {
            const eyesObject = items.find((item: any) => item.itemType === "eyes");
            eyesObject.src = await sharp(eyesObject.src)
                .gamma(
                    EYEGAMMA_MAPPING_1[character.eye_color as keyof typeof EYEGAMMA_MAPPING_1],
                    EYEGAMMA_MAPPING_2[character.eye_color as keyof typeof EYEGAMMA_MAPPING_2]
                )
                .tint(EYECOLOR_MAPPING[character.eye_color as keyof typeof EYECOLOR_MAPPING])
                .toBuffer();
        }

        if (character.outfit_color !== 1) {
            const outfitObject = items.find((item: any) => item.itemType === "outfit");
            outfitObject.src = await sharp(outfitObject.src)
                .gamma(
                    SHIRTGAMMA_MAPPING_1[character.outfit_color as keyof typeof SHIRTGAMMA_MAPPING_1],
                    SHIRTGAMMA_MAPPING_2[character.outfit_color as keyof typeof SHIRTGAMMA_MAPPING_2]
                )
                .tint(SHIRTCOLOR_MAPPING[character.outfit_color as keyof typeof SHIRTCOLOR_MAPPING])
                .toBuffer();
        }

        if (character.accessory_color !== 1) {
            const accessoryObject = items.find((item: any) => item.itemType === "accessory");
            accessoryObject.src = await sharp(accessoryObject.src)
                .gamma(
                    ACCESSORYGAMMA_MAPPING_1[character.accessory_color as keyof typeof ACCESSORYGAMMA_MAPPING_1],
                    ACCESSORYGAMMA_MAPPING_2[character.accessory_color as keyof typeof ACCESSORYGAMMA_MAPPING_2]
                )
                .tint(ACCESSORYCOLOR_MAPPING[character.accessory_color as keyof typeof ACCESSORYCOLOR_MAPPING])
                .toBuffer();
        }

        // sort item types by correct z-index (so sharp can layer them correctly)
        items.sort((a: any, b: any) => {
            return ITEM_Z_INDEX[a.itemType as zlayer] - ITEM_Z_INDEX[b.itemType as zlayer];
        });

        const imageBuffer = await sharp({
            create: {
                width: imageWidth,
                height: imageHeight,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        })
            .composite(items.map((item: any, index: number) => ({
                input: item.src,
                left: item.position.left,
                top: item.position.top,
                width: imageWidth,
                height: imageHeight,
            })))
            .toFormat("png", { quality: 100 })
            .toBuffer();

        return new NextResponse(imageBuffer, { headers: { 'Content-Type': 'image/png' } });
    } catch (error: any) {
        console.log(error)
        return new NextResponse({ ...error }, { status: 500 });
    }
}