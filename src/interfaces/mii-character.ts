export interface MiiCharacter {
    gender?: string;
    head: {
        id: number;
        color: number;
    }
    hair: {
        id: number;
        color: number;
    },
    eyes: {
        id: number;
        color: number;
    },
    eyebrows: number;
    wrinkles: number;
    makeup: number;
    nose: number;
    mouth: number;
    glasses: number;
    beard: number;
    hat: number;
    outfit: number;
}