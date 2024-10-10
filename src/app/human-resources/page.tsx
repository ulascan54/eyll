import { HumanResourcesCsvForm } from "@/components/common/HumanResourcesCsvForm"
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
        <h1 className="text-3xl font-semibold">İnsan Kaynakları</h1>
      </div>
      <div className="flex w-full items-center  justify-center">
        <div className="grid gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle className="text-center">
                Şirkete Uyumluluğa Göre Sırala
              </CardTitle>
              <CardDescription>
                Aradığınız adayların şirketinize uygunluğunu test etmek için
                lütfen aşağıdaki formu doldurun.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center w-full">
              <HumanResourcesCsvForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
