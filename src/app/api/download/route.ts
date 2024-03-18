import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";
import { ITEMS_MALE, ITEMS_FEMALE } from "@/assets/items";
import { ITEM_Z_INDEX } from "@/assets/character";
import { HAIRGAMMA_MAPPING_1, HAIRGAMMA_MAPPING_2, HAIRCOLOR_MAPPING, EYEGAMMA_MAPPING_1, EYEGAMMA_MAPPING_2, EYECOLOR_MAPPING, SHIRTGAMMA_MAPPING_1, SHIRTGAMMA_MAPPING_2, SHIRTCOLOR_MAPPING } from "@/assets/mappings";

const charImageWidth = 240;
const charImageHeight = 350;
const imageWidth = 500;
const imageHeight = 350;
type zlayer = keyof typeof ITEM_Z_INDEX;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { character, background } = body;

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

        let result: any[] = [];

        if (background !== 0) {
            const backgroundSrc = path.join(process.cwd(), `/public/items/background/background${background}.png`);
            const backgroundComposite = {
                src: await sharp(backgroundSrc).resize({ width: imageWidth, height: imageHeight }).toBuffer(),
                position: { left: 0, top: 0 },
                width: imageWidth,
                height: imageHeight,
            };
            result.push(backgroundComposite);
        }

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
            copy.src = path.join(process.cwd(), `/public${item.src}`);
            items.push({ ...copy });
        }

        // replace color related items with the correct color
        const headObject = items.find((item: any) => item.itemType === "head");
        headObject.src = headObject.src.replace(`head${headObject.id}`, `head${headObject.id}-${character.skin_color}`);

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

        // sort item types by correct z-index (so sharp can layer them correctly)
        items.sort((a: any, b: any) => {
            return ITEM_Z_INDEX[a.itemType as zlayer] - ITEM_Z_INDEX[b.itemType as zlayer];
        });

        const characterBuffer = await sharp({
            create: {
                width: charImageWidth,
                height: charImageHeight,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        })
            .composite(items.map((item: any, index: number) => ({
                input: item.src,
                left: item.position.left,
                top: item.position.top,
                width: charImageWidth,
                height: charImageHeight,
            })))
            .toFormat("png", { quality: 100 })
            .toBuffer();

        const characterComposite = {
            src: characterBuffer,
            position: {
                left: imageWidth / 2 - charImageWidth / 2,
                top: 0,
            },
            width: imageWidth,
            height: imageHeight,
        };
        result.push(characterComposite);

        const imageBuffer = await sharp({
            create: {
                width: imageWidth,
                height: imageHeight,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 }
            }
        })
            .composite(
                result.map((buffer: any, index: number) => ({
                    input: buffer.src,
                    left: buffer.position.left,
                    top: buffer.position.top,
                    width: imageWidth,
                    height: imageHeight,
                }))
            )
            .toFormat("png", { quality: 100 })
            .toBuffer();

        return new NextResponse(imageBuffer, { headers: { 'Content-Type': 'image/png' } });
    } catch (error) {
        console.log(error)
        return new NextResponse(null, { status: 500 });
    }
};