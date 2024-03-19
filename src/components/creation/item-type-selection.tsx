"use client";

type Props = {
    selectedItemType: string;
    setSelectedItemType: (itemType: string) => void;
}

export default function ItemTypeSelection({ selectedItemType, setSelectedItemType }: Props) {
    return (
        <div className="flex text-center justify-center flex-wrap">
            <div className={`item-type-button ${selectedItemType === "face" && "active"}`}
                onClick={() => setSelectedItemType("face")}>
                <img src={`/items/placeholder/item-type/type-face-1.svg`} alt="" />
            </div>
            <div className={`item-type-button ${selectedItemType === "hair" && "active"}`}
                onClick={() => setSelectedItemType("hair")}>
                <img src={`/items/placeholder/item-type/type-hair-1.svg`} alt="" />
            </div>
            <div className={`item-type-button ${selectedItemType === "eyes" && "active"}`}
                onClick={() => setSelectedItemType("eyes")}>
                <img src={`/items/placeholder/item-type/type-eyes-1.svg`} alt="" />
            </div>
            <div className={`item-type-button ${selectedItemType === "nose" && "active"}`}
                onClick={() => setSelectedItemType("nose")}>
                <img src={`/items/placeholder/item-type/type-nose-1.svg`} alt="" />
            </div>
            <div className={`item-type-button ${selectedItemType === "mouth" && "active"}`}
                onClick={() => setSelectedItemType("mouth")}>
                <img src={`/items/placeholder/item-type/type-mouth-1.svg`} alt="" />
            </div>
            <div className={`item-type-button ${selectedItemType === "eyebrows" && "active"}`}
                onClick={() => setSelectedItemType("eyebrows")}>
                <img src={`/items/placeholder/item-type/type-eyebrows-1.svg`} alt="" />
            </div>
            <div className={`item-type-button ${selectedItemType === "glasses" && "active"}`}
                onClick={() => setSelectedItemType("glasses")}>
                <img src={`/items/placeholder/item-type/type-glasses-1.svg`} alt="" />
            </div>
            <div className={`item-type-button ${selectedItemType === "hat" && "active"}`}
                onClick={() => setSelectedItemType("hat")}>
                <img src={`/items/placeholder/item-type/type-hat-1.svg`} alt="" />
            </div>
            <div className={`item-type-button ${selectedItemType === "accessory" && "active"}`}
                onClick={() => setSelectedItemType("accessory")}>
                <img src={`/items/placeholder/item-type/type-accessory-1.svg`} alt="" />
            </div>
        </div>
    )
}