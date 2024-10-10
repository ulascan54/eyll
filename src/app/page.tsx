import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { User, Users } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2 text-center">
        <h1 className="text-3xl font-semibold">Shaolin Keşişleri</h1>
      </div>
      <div className="flex w-full items-center  justify-center">
        <div className="grid gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle className="text-center">
                Kişi ve Şirket Uyumluluğu
              </CardTitle>
              <CardDescription>
                Uygulamamızda iş başvurusunda bulunan adayların başvurduğu
                ekipler ile uyumluluğu ölçülmektedir.
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-center gap-3">
              <Link href="/applicant">
                <Button
                  type="button"
                  className=" flex gap-2 items-center justify-center"
                >
                  <Users className="size-4" />
                  İnsan Kaynakları
                </Button>
              </Link>
              <Link href="/applicant">
                <Button
                  type="button"
                  className=" flex gap-2 items-center justify-center"
                >
                  <User className="size-4" />
                  Aday
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  )
}
