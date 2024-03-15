import { MiiCharacter } from "@/interfaces/mii-character";

export const DEFAULT_CHARACTER: MiiCharacter = {
    skin_color: 1,
    hair_color: 1,
    eye_color: 1,
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
};


// layer order of the different item types
export const ITEM_Z_INDEX = {
    outfit: 1,
    head: 2,
    eyes: 3,
    mouth: 4,
    nose: 5,
    eyebrows: 6,
    makeup: 7,
    wrinkles: 8,
    beard: 9,
    glasses: 10,
    hair: 11,
    hat: 12,
};