type Props = {
    gender: string;
}

export default function Character({ gender }: Props) {
    return (
        <div>
            <img src="/items/head1.svg" alt="" className="translate-x-1/4 z-10" />
            <img src="/items/white.svg" alt="" className="-translate-y-[10%] z-0" />
        </div>
    )
}