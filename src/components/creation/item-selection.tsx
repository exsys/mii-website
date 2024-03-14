import { ITEMS_MALE, ITEMS_FEMALE } from "@/assets/items"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = {
    itemType: string;
}

export default function ItemSelection({ itemType }: Props) {
    return (
        <div>
            {itemType === "head" ? (
                <div className="border-4 border-gray-400">
                    <div className="border-b-2 border-gray-400">
                        <h2 className="text-3xl px-2 pt-2">
                            Skin Color
                        </h2>
                        <div className="px-2 pb-2">
                            <div className="flex items-center justify-center gap-1">
                                <div className="p-1 cursor-pointer">
                                    <ChevronLeftIcon className="w-8" />
                                </div>
                                <div>
                                    <img src="/items/skin-color.png" alt="" className="scale-75" />
                                </div>
                                <div className="p-1 cursor-pointer">
                                    <ChevronRightIcon className="w-8" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-2">
                        <h2 className="text-3xl">
                            Facial Features
                        </h2>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-center gap-1">
                                <div className="p-1 cursor-pointer">
                                    <ChevronLeftIcon className="w-8" />
                                </div>
                                <div>
                                    head
                                </div>
                                <div className="p-1 cursor-pointer">
                                    <ChevronRightIcon className="w-8" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <div className="p-1 cursor-pointer">
                                    <ChevronLeftIcon className="w-8" />
                                </div>
                                <div>
                                    blush
                                </div>
                                <div className="p-1 cursor-pointer">
                                    <ChevronRightIcon className="w-8" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <div className="p-1 cursor-pointer">
                                    <ChevronLeftIcon className="w-8" />
                                </div>
                                <div>
                                    bags
                                </div>
                                <div className="p-1 cursor-pointer">
                                    <ChevronRightIcon className="w-8" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-6 gap-2 flex-wrap">
                    {ITEMS_MALE[itemType as keyof typeof ITEMS_MALE].map((item: any, index: number) => (
                        <div key={index} className="relative flex border border-gray-500 rounded-lg w-[50px] h-[50px]
                        cursor-pointer bg-gray-100">
                            <span className="absolute top-0 left-1">
                                {index + 1}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}