import { ApplicantForm } from "@/components/common/ApplicantForm"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Page() {
  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2 text-center">
        <h1 className="text-3xl font-semibold">Aday</h1>
      </div>
      <div className="flex w-full items-center  justify-center">
        <div className="grid gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle className="text-center">Aplikasyon Formu</CardTitle>
              <CardDescription>
                Uyumluluğunuzu test etmek için lütfen aşağıdaki formu doldurun.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ApplicantForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
