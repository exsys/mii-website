import { MiiCharacter } from "@/interfaces/mii-character";

export const DEFAULT_CHARACTER: MiiCharacter = {
    skin_color: 1,
    hair_color: 1,
    eye_color: 1,
    outfit_color: 1,
    head: 1,
    hair: 1,
    eyes: 1,
    eyebrows: 1,
    wrinkles: 1,
    makeup: 1,
    nose: 1,
    mouth: 1,
    glasses: 1,
    beard: 1,
    hat: 1,
    outfit: 1,
    accessory: 1,
};


// layer order of the different item types
export const ITEM_Z_INDEX = {
    outfit: 1,
    head: 2,
    makeup: 3,
    wrinkles: 4,
    eyebrows: 5,
    eyes: 6,
    mouth: 7,
    nose: 8,
    beard: 9,
    glasses: 10,
    hair: 11,
    hat: 12,
    accessory: 13,
};

export const RACIST_LUFFY = "00407010101010f0101010b1701010e0108";