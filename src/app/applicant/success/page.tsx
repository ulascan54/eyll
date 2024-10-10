"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"

// Data table components (you can customize it as per your needs)
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Page() {
  const [companyName, setCompanyName] = useState<string | null>(null)
  const [skills, setSkills] = useState<string[]>([])
  const [certificates, setCertificates] = useState<string[]>([])

  useEffect(() => {
    // set local storage dumy data
    // localStorage.setItem("companyName", "BTK")
    // localStorage.setItem(
    //   "skills",
    //   JSON.stringify(["React", "TypeScript", "Node.js"])
    // )
    // localStorage.setItem(
    //   "certificates",
    //   JSON.stringify([
    //     "AWS Certified Solutions Architect",
    //     "AWS Certified Developer",
    //   ])
    // )

    const storedCompanyName = localStorage.getItem("companyName")
    const storedSkills = localStorage.getItem("skills")
    const storedCertificates = localStorage.getItem("certificates")

    // Verileri state'e ata
    setCompanyName(storedCompanyName)
    setSkills(storedSkills ? JSON.parse(storedSkills) : [])
    setCertificates(storedCertificates ? JSON.parse(storedCertificates) : [])
  }, [])

  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2 text-center">
        <h1 className="text-3xl font-semibold">Aday</h1>
      </div>
      <div className="flex w-full items-center justify-center">
        <div className="grid gap-6">
          <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle className="text-center">Sonuçlar</CardTitle>
              <CardDescription>
                Tarama başarı ile tamamlandı ve sonuçlar aşağıdaki gibidir.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Certificates</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{companyName ? companyName : "N/A"}</TableCell>
                    <TableCell>
                      {skills.length > 0 ? (
                        <ul>
                          {skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      ) : (
                        "Yetenek bulunamadı"
                      )}
                    </TableCell>
                    <TableCell>
                      {certificates.length > 0 ? (
                        <ul>
                          {certificates.map((certificate, index) => (
                            <li key={index}>{certificate}</li>
                          ))}
                        </ul>
                      ) : (
                        "Sertifika bulunamadı"
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
