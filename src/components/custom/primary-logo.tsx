import Link from "next/link";

export default function PrimaryLogo() {
    return (
        <div className="text-lg sm:text-xl font-bold flex-shrink-0">
          <Link href="/" className="flex flex-col items-center">
            <p className="text-lg font-semibold uppercase">Khanh Bao</p>
            <p className="text-sm text-muted-foreground">- Developer Blog -</p>
          </Link>
        </div>
    )
}