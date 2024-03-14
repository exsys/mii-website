export interface MiiCharacter {
    skin_color: number;
    head: number;
    hair: {
        color: string;
        type: string;
        id: number;
    },
    eyebrows: number;
    eyes: {
        id: number;
        color: string;
        type: string;
    },
    wrinkles: number;
    makeup: number;
    nose: number;
    mouth: number;
    glasses: number;
    beard: number;
    hat: number;
    outfit: number;
}