"use client";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import Character from "./character";
import ItemSelection from "./item-selection";
import ItemTypeSelection from "./item-type-selection";
import styles from "./page.module.css";
import { ArrowDownTrayIcon, ArrowLeftIcon, FolderArrowDownIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MiiCharacterContext } from "@/providers/character-provider";
import { Transition, Dialog } from "@headlessui/react";
import Header from "../layout/header";
import { MII_STRING_ORDER } from "@/assets/character";

const BACKGROUNDS = 14;
type Props = {
    setCurrentView: (view: string) => void;
}
type SaveStringDialogProps = {
    openSaveStringDialog: boolean;
    setOpenSaveStringDialog: (open: boolean) => void;
    saveString: string;
}

export default function CharacterCreation({ setCurrentView }: Props) {
    const [character, setCharacter] = useContext(MiiCharacterContext);
    const [selectedItemType, setSelectedItemType] = useState<string>("face");
    const [currentStage, setCurrentStage] = useState<number>(1); // 1 = item selection/mii creation, 2 = background selection
    const [selectedBackground, setSelectedBackground] = useState<number>(0);
    const [downloadLink, setDownloadLink] = useState<string>("");
    const [saveString, setSaveString] = useState<string>("");
    const [openSaveStringDialog, setOpenSaveStringDialog] = useState(false);

    useEffect(() => {
        const downloadElement = document.getElementById("download-link");
        if (downloadElement) {
            downloadElement.click();
        }
    }, [downloadLink]);


    const nextBackground = async () => {
        const nextId = selectedBackground + 1;
        if (nextId > BACKGROUNDS) {
            setSelectedBackground(0);
            return;
        }
        setSelectedBackground(nextId);
    };

    const prevBackground = async () => {
        const prevId = selectedBackground - 1;
        if (prevId < 0) {
            setSelectedBackground(BACKGROUNDS);
            return;
        }
        setSelectedBackground(prevId);
    };

    const downloadImage = async () => {
        const charImgSrc = document.getElementById("mii-character")?.getAttribute("src");
        if (charImgSrc) {
            const body = {
                character: character,
                background: selectedBackground,
            }
            const res = await fetch("/api/download", {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
            });
            const blob = await res.blob();
            const objectURL = URL.createObjectURL(blob);
            setDownloadLink(objectURL);
        }
    };

    const saveMiiString = async () => {
        let miiString = "";
        // iterate through the character object and convert the values to hex.
        // that way, 255 instead of 99 items per item type can be stored
        MII_STRING_ORDER.forEach((key: string) => {
            if (key === "gender") {
                miiString += character[key as keyof typeof character] === "male" ? 0 : 1; // only 2 possible values for gender tho
            } else {
                const itemTypeValue = character[key as keyof typeof character].toString(16).padStart(2, '0');
                miiString += itemTypeValue;
            }
        });

        setSaveString(miiString);
        setOpenSaveStringDialog(true);
    };

    return (
        <div className={`h-full flex justify-center items-center gap-10`}>
            <Header hideLaunchButton />
            <div className="h-full w-full">
                <div className="h-full flex justify-center items-center flex-col gap-10">
                    {currentStage === 1 && (
                        <div>
                            <div className="mb-2 flex gap-2 items-center w-fit bg-black/20 py-1 px-2 border border-black/30
                            hover:bg-black/30" onClick={() => setCurrentView("selection")}>
                                <ArrowLeftIcon className="w-8 h-8 stroke-2" />
                                <h3 className="text-lg">
                                    Return
                                </h3>
                            </div>

                            <div className="mb-10">
                                <ItemTypeSelection selectedItemType={selectedItemType} setSelectedItemType={setSelectedItemType} />
                            </div>

                            <div className="flex gap-5 justify-between w-full relative">
                                <Character />
                                <ItemSelection itemType={selectedItemType} />
                                <div className="absolute bottom-0 left-[36px] bg-black/40 p-2 border-2 border-black/30 rounded-xl
                                min-w-[180px] text-center hover:scale-95 hover:bg-black/50"
                                    onClick={() => setCurrentStage(2)}>
                                    <h3 className="text-white text-2xl drop-shadow-lg">
                                        Create
                                    </h3>
                                </div>
                            </div>
                        </div>
                    )}

                    {currentStage === 2 && (
                        <div>
                            <div className="ml-24 mb-2 flex gap-2 items-center w-fit py-1 px-2 border 
                            bg-black/20 border-black/30 hover:bg-black/30" onClick={() => setCurrentStage(1)}
                            data-aos="fade-down">
                                <ArrowLeftIcon className="w-8 h-8 stroke-2" />
                                <h3 className="text-lg">
                                    Return
                                </h3>
                            </div>
                            <div className="flex gap-10 justify-center w-full">
                                <div className={`flex items-center`} onClick={() => prevBackground()} data-aos="fade-right">
                                    <div className={`${styles["switch-button-wrapper"]}`}>
                                        <div className={`${styles["switch-button-left"]}`}></div>
                                    </div>
                                </div>
                                <div className={`bg-white border-4 border-black/30 rounded-2xl w-[500px] min-h-[340px] overflow-hidden`}
                                data-aos="fade-down">
                                    <div className={`w-full rounded-xl flex items-center justify-center
                                    ${selectedBackground !== 0 && styles[`mii-background-${selectedBackground}`]}`}>
                                        <div className="-mb-10">
                                            <Character />
                                        </div>
                                    </div>
                                </div>
                                <div className={`flex items-center`} onClick={() => nextBackground()} data-aos="fade-left">
                                    <div className={`${styles["switch-button-wrapper"]}`}>
                                        <div className={`${styles["switch-button-right"]}`}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-10 mt-10 justify-center" data-aos="fade-up">
                                <button className="wii-button flex gap-3 w-[280px]" onClick={() => downloadImage()}>
                                    <ArrowDownTrayIcon className="w-6 h-6" />
                                    <span>
                                        Download Image
                                    </span>
                                </button>
                                <button className="wii-button flex gap-3 w-[280px]" onClick={() => saveMiiString()}>
                                    <FolderArrowDownIcon className="w-6 h-6" />
                                    <span>
                                        Save Mii
                                    </span>
                                </button>
                                <a download={"miionsolana.png"} href={downloadLink} className="hidden" id="download-link"></a>
                            </div>

                            <SaveStringDialog openSaveStringDialog={openSaveStringDialog}
                                setOpenSaveStringDialog={setOpenSaveStringDialog}
                                saveString={saveString} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

const SaveStringDialog = ({ openSaveStringDialog, setOpenSaveStringDialog, saveString }: SaveStringDialogProps) => {
    const cancelSaveStringRef = useRef(null);

    return (
        <Transition show={openSaveStringDialog} as={Fragment}>
            <Dialog as="div" className="relative z-10 text-main-text-1"
                initialFocus={cancelSaveStringRef} onClose={setOpenSaveStringDialog}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white
                                bg-main-card p-6 text-left align-middle shadow-xl transition-all text-main-text-1">
                                <Dialog.Title as="h2" className="text-xl font-semibold mb-4 flex justify-between items-center">
                                    <span>
                                        Save Mii String
                                    </span>
                                    <XMarkIcon className="w-6 h-6 cursor-pointer hover:text-gray-600" 
                                    onClick={() => setOpenSaveStringDialog(false)} />
                                </Dialog.Title>

                                <div className="flex gap-4 mb-4 items-center justify-center">
                                    <input type="text" value={saveString} readOnly
                                        className="border border-gray-500 p-2 outline-none rounded-md flex-1"
                                        onClick={(e: any) => e.currentTarget.select()} />
                                </div>
                                <div className="px-1">
                                    <InformationCircleIcon className="w-5 h-5 inline mr-2" />
                                    <p className="inline">
                                        You can use this string to load your Mii at a later time.
                                    </p>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}