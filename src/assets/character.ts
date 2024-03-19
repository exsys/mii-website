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

export const MII_STRING_ORDER = [
    "gender",
    "outfit_color",
    "skin_color",
    "eye_color",
    "hair_color",
    "outfit",
    "head",
    "makeup",
    "wrinkles",
    "eyebrows",
    "eyes",
    "mouth",
    "nose",
    "beard",
    "glasses",
    "hair",
    "hat",
    "accessory"
];

export const RACIST_LUFFY = "00104010701010103010f170b0101010e08";