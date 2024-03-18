"use client";
import { Fragment, useRef, useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

type Props = {
    selectGender: (gender: string, miiString?: string) => void;
}
type LoadStringDialogProps = {
    openLoadStringDialog: boolean;
    setOpenLoadStringDialog: (open: boolean) => void;
    loadMiiString: (miiString: string) => void;
}

export default function Selection({ selectGender }: Props) {
    const [currentSelection, setCurrentSelection] = useState<number>(0);
    const [openLoadStringDialog, setOpenLoadStringDialog] = useState(false);

    const loadMiiString = (miiString: string) => {
        selectGender("load", miiString);
    };

    return (
        <div className={`w-full h-full`}>
            {currentSelection === 0 && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-20">
                    <div onClick={() => setCurrentSelection(1)} data-aos="fade-right" data-aos-delay="200">
                        <div className="wii-button">
                            New Mii
                        </div>
                    </div>
                    <div data-aos="fade-left" data-aos-delay="200">
                        <div className="wii-button" onClick={() => setOpenLoadStringDialog(true)}>
                            Load Mii
                        </div>
                    </div>
                </div>
            )}

            {currentSelection === 1 && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-20">
                    <div className="hover:scale-95" onClick={() => selectGender("male")} data-aos="fade-right">
                        <div className="wii-button">
                            Male
                        </div>
                    </div>
                    <div className="hover:scale-95" onClick={() => selectGender("female")} data-aos="fade-left">
                        <div className="wii-button">
                            Female
                        </div>
                    </div>
                </div>
            )}

            <LoadStringDialog openLoadStringDialog={openLoadStringDialog}
                setOpenLoadStringDialog={setOpenLoadStringDialog}
                loadMiiString={loadMiiString} />
        </div>
    )
}

const LoadStringDialog = ({ openLoadStringDialog, setOpenLoadStringDialog, loadMiiString }: LoadStringDialogProps) => {
    const cancelLoadStringRef = useRef(null);
    const [inputValue, setInputValue] = useState<string>("");
    const [wrongStringFormat, setWrongStringFormat] = useState<boolean>(false);

    const checkMiiStringSyntaxAndLoad = (miiString: string) => {
        if (miiString.length !== 35) {
            setWrongStringFormat(true);
            return;
        }
        const hexRegex = /^[0-9a-fA-F]+$/; // check if string is hexadecimal
        if (!hexRegex.test(miiString)) {
            setWrongStringFormat(true);
            return;
        }
        loadMiiString(miiString);
    };

    return (
        <Transition show={openLoadStringDialog} as={Fragment}>
            <Dialog as="div" className="relative z-10 text-main-text-1"
                initialFocus={cancelLoadStringRef} onClose={setOpenLoadStringDialog}>
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
                                        Load Mii String
                                    </span>
                                    <XMarkIcon className="w-6 h-6 cursor-pointer hover:text-gray-600"
                                        onClick={() => setOpenLoadStringDialog(false)} />
                                </Dialog.Title>

                                <div className="flex gap-4 mb-2 items-center justify-center">
                                    <input type="text" className="border border-gray-500 p-2 outline-none rounded-md flex-1"
                                        value={inputValue} onChange={(e: any) => setInputValue(e.target.value)} />
                                </div>

                                {wrongStringFormat && (
                                    <span className="mb-2 text-red-500">
                                        Incorrect string format
                                    </span>
                                )}

                                <div className="px-1 mt-1">
                                    <InformationCircleIcon className="w-5 h-5 inline mr-2" />
                                    <p className="inline">
                                        Enter a Mii string to load a Mii character.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 font-semibold mt-4">
                                    <button type="button" className="inline-flex items-center justify-center w-full
                                    border border-gray-500 rounded-lg p-2 hover:bg-black/5"
                                        onClick={() => checkMiiStringSyntaxAndLoad(inputValue)}>
                                        Load
                                    </button>
                                    <button type="button" className="bg-transparent w-full
                                    border border-gray-500 rounded-lg p-2 hover:bg-black/5"
                                        onClick={() => setOpenLoadStringDialog(false)} ref={cancelLoadStringRef}>
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}