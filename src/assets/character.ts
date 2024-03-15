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
    head: 2,
    hair: 8,
    eyes: 3,
    eyebrows: 4,
    wrinkles: 5,
    makeup: 5,
    nose: 3,
    mouth: 3,
    glasses: 7,
    beard: 6,
    hat: 9,
    outfit: 1,
};