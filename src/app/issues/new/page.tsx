'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createIssueSchema } from '@/features/issues/form-config';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import { toast } from 'sonner';
import { z } from 'zod';

export default function NewIssuePage() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof createIssueSchema>>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof createIssueSchema>) => {
    try {
      setIsSubmitting(true);
      await axios.post('/api/issues', values);
      toast.success('New Issue Created Successfully');
      router.push('/issues');
    } catch (error) {
      setIsSubmitting(false);
      setError('An unexpected error is occurred');
    }
  };

  return (
    <section>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-700">
            New Issue
          </h1>
        </div>
      </div>
      {error ? (
        <div className="mb-5 max-w-xl px-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      ) : (
        ''
      )}
      <div className="px-8">
        <div className="max-w-xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Title<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Description<span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <SimpleMDE {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-x-3 space-y-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <span>Submitting</span>
                      <Loader2 className="ml-1 h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    <span>Submit</span>
                  )}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
