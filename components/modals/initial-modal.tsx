"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import FileUpload from "@/components/file-upload";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Codespace name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Codespace image is required",
  }),
});

const InitialModal = () => {
    const [mounted, setismounted] = useState(false);
    const router = useRouter();
    useEffect(() => {
        setismounted(true);
    }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers",values);
      form.reset();
      router.refresh();
      window.location.reload();
    } 
    catch (error) {
      console.error(error);
      
    }
  };
  if(!mounted) return null;

  return (
    <Dialog open>
      <DialogContent className="text-black bg-white p-0 overflow-hidden ">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl font-bold text-center">
            Customize Your Codespace
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Give your codespace a personalized name and icon. You can always
            change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                control={form.control}
                name="imageUrl"
                render={({field}) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload endpoint= "serverImage"
                        value={field.value}
                        onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                )}
                />

              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Codespace Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-1 text-black focus-visible:ring-offset-2"
                        placeholder="Enter codespace name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
                <Button disabled={isLoading} variant="primary">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InitialModal;
