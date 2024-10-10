"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import "./style.css"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  file1: z.instanceof(FileList).optional(),
  file2: z.instanceof(FileList).optional(),
})

export function HumanResourcesCsvForm() {
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const fileRef = form.register("file1")
  const fileRef2 = form.register("file2")

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    // Çoklu gönderimi önlemek için butonu devre dışı bırakıyoruz

    try {
      setLoading(true)

      // FormData objesi oluşturuluyor
      const formData = new FormData()
      formData.append("file1", data.file1[0]) // file1 ekleniyor
      formData.append("file2", data.file2[0]) // file2 ekleniyor
      // POST isteğiyle verileri backend'e gönder
      const response = await fetch("http://127.0.0.1:8000/process-csv/", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        // Yanıttan blob oluşturuluyor
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.style.display = "none"
        a.href = url
        a.download = "sıralı-yarışmacılar.csv" // İndirilecek dosya adı
        document.body.appendChild(a)
        a.click() // İndirme işlemini tetikle
        window.URL.revokeObjectURL(url) // Bellek temizleme
        toast({
          title: "Başarılı!",
          description:
            "Dosya başarıyla işlendi. İndirme otomatik olarak başlatılacak.",
        })
      } else {
        // Hataları işleme
        const errorData = await response.json()
        toast({
          title: "Hata",
          description: `Hata: ${errorData.detail[0].msg}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      // Fetch hatalarını işleme
      toast({
        title: "Hata",
        description: `Hata: ${error.message}`,
        variant: "destructive",
      })
    } finally {
      // İstek tamamlandığında butonu tekrar etkinleştir
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        {loading ? (
          <div className="flex items-center justify-center h-20">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <FormField
              control={form.control}
              name="file1"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Linkedin Profilleri</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Linkedin profillerini seçiniz csv"
                        accept=".csv"
                        {...fileRef}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="file2"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Yarışmacı Profilleri</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        placeholder="Yarışmacı profillerini seçiniz csv"
                        accept=".csv"
                        {...fileRef2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
          </>
        )}

        <div className="flex justify-center">
          <Button type="submit" disabled={loading}>
            {loading ? "Yükleniyor..." : "Yükle ve İşle"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
