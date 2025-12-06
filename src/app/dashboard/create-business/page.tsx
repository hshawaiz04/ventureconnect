"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useUser } from "@/firebase/auth/use-user"
import { useFirestore } from "@/firebase"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { errorEmitter } from "@/firebase/error-emitter"
import { FirestorePermissionError } from "@/firebase/errors"

const formSchema = z.object({
  name: z.string().min(2, "Business name must be at least 2 characters."),
  industry: z.string().min(1, "Please select an industry."),
  stage: z.string().min(1, "Please select a business stage."),
  pitch: z.string().min(20, "Pitch must be at least 20 characters.").max(280, "Pitch must be less than 280 characters."),
  targetRaise: z.coerce.number().min(100000, "Target raise must be at least ₹1,00,000."),
})

export default function CreateBusinessPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      industry: "",
      stage: "",
      pitch: "",
      targetRaise: 100000,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "You must be logged in to create a business.",
        });
        return;
    }
    
    const businessesCol = collection(firestore, "businesses");
    const newBusinessData = {
        ...values,
        ownerUid: user.uid,
        raisedAmount: 0,
        profileComplete: 50, // Initial completeness
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };

    addDoc(businessesCol, newBusinessData)
      .then(() => {
          toast({
              title: "Business Profile Created!",
              description: `${values.name} is now ready to be seen.`,
          });
          router.push("/dashboard");
      })
      .catch(async (serverError) => {
          const permissionError = new FirestorePermissionError({
              path: `/${businessesCol.path}`,
              operation: 'create',
              requestResourceData: newBusinessData,
          });
          errorEmitter.emit('permission-error', permissionError);
      });
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-12rem)] items-center justify-center py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl">Create Your Business Profile</CardTitle>
          <CardDescription>
            Tell us about your venture. This information will be visible to potential investors.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
               <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., EcoCharge Solutions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select an industry" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="CleanTech">CleanTech</SelectItem>
                            <SelectItem value="FinTech">FinTech</SelectItem>
                            <SelectItem value="HealthTech">HealthTech</SelectItem>
                            <SelectItem value="EdTech">EdTech</SelectItem>
                            <SelectItem value="AgriTech">AgriTech</SelectItem>
                            <SelectItem value="SaaS">SaaS</SelectItem>
                            <SelectItem value="E-commerce">E-commerce</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="stage"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Business Stage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a stage" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Idea">Idea</SelectItem>
                            <SelectItem value="MVP">MVP</SelectItem>
                            <SelectItem value="Seed">Seed</SelectItem>
                            <SelectItem value="Growth">Growth</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>

               <FormField
                control={form.control}
                name="pitch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Pitch</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your business in a few sentences." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="targetRaise"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funding Target (INR)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 100000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" size="lg">Create Profile</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
