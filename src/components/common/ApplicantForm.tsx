"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

const FormSchema = z.object({
  companyName: z.string().nonempty("Firma adı boş bırakılamaz."),
  linkedinUrl: z.string().url("Geçerli bir LinkedIn URL'si giriniz."),
})

export function ApplicantForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      companyName: "",
      linkedinUrl: "",
    },
  })

  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   })
  // }
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const requestBody = {
        url: data.linkedinUrl,
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(requestBody),
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("Yanıt hatası:", response.status, errorText)
          throw new Error(`HTTP hatası! durum: ${response.status}`)
        }

        const responseData = await response.json()
        console.log("Yanıt:", responseData)

        localStorage.setItem("companyName", data.companyName)
        localStorage.setItem("skills", JSON.stringify(responseData.skills))
        localStorage.setItem(
          "certificates",
          JSON.stringify(responseData.certificates)
        )

        router.push("/applicant/success")

        toast({
          title: "Başarıyla gönderildi!",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(requestBody, null, 2)}
              </code>
            </pre>
          ),
        })
      } catch (error) {
        console.error("Hata:", error)
        toast({
          title: "Gönderim hatası",
          description: error.message || "Bir hata oluştu.",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <>
      {isPending ? (
        <div className="flex justify-center items-center">
          <svg
            className="animate-spin h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Firma Adı</FormLabel>
                  <FormControl>
                    <Input placeholder="Firma adını giriniz.." {...field} />
                  </FormControl>
                  <FormDescription>
                    Lütfen başvurduğunuz firmanın adını giriniz.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedinUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn URL</FormLabel>
                  <FormControl>
                    <Input placeholder="LinkedIn URL'si giriniz.." {...field} />
                  </FormControl>
                  <FormDescription>
                    Lütfen LinkedIn profilinizin URL{"'"}sini giriniz.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit">Gönder</Button>
            </div>
          </form>
        </Form>
      )}
    </>
  )
}
