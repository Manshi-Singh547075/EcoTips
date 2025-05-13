import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { tipFormSchema, TipFormData, Category } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Upload } from "lucide-react";

const TipForm = () => {
  const { toast } = useToast();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const { data: categories, isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const form = useForm<TipFormData>({
    resolver: zodResolver(tipFormSchema),
    defaultValues: {
      title: "",
      content: "",
      categoryId: 0,
      imageUrl: "",
      authorName: "Anonymous",
    },
  });

  const createTipMutation = useMutation({
    mutationFn: async (data: TipFormData) => {
      return apiRequest('POST', '/api/tips', data);
    },
    onSuccess: () => {
      form.reset();
      setAgreedToTerms(false);
      queryClient.invalidateQueries({ queryKey: ['/api/tips'] });
      toast({
        title: "Success!",
        description: "Thank you! Your tip has been submitted successfully.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit your tip. Please try again.",
      });
    },
  });

  const onSubmit = (data: TipFormData) => {
    if (!agreedToTerms) {
      toast({
        variant: "destructive",
        description: "Please agree to the terms and conditions.",
      });
      return;
    }
    
    createTipMutation.mutate(data);
  };

  // This is just a placeholder for file upload since we're not implementing actual file uploads
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload this to a server and get a URL back
      const dummyUrl = `https://images.unsplash.com/photo-1605600659453-259e326a6d7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80`;
      form.setValue("imageUrl", dummyUrl);
      toast({
        description: "Image selected successfully! (Note: In this demo, a placeholder image URL is used)",
      });
    }
  };

  return (
    <div className="md:w-1/2 bg-white rounded-xl shadow-lg p-8">
      {createTipMutation.isPending && (
        <div className="mb-6 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Submitting your tip...
        </div>
      )}
      
      {createTipMutation.isSuccess && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <svg className="h-5 w-5 text-green-500 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Thank you! Your tip has been submitted successfully.
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tip Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a catchy title for your tip" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  value={field.value ? field.value.toString() : ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoriesLoading ? (
                      <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                    ) : (
                      categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tip Details</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share your sustainable tip details..." 
                    className="resize-none"
                    rows={4} 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <FormLabel htmlFor="tip-image">Upload Image (optional)</FormLabel>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="tip-image"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark"
                  >
                    <span>Upload a file</span>
                    <input
                      id="tip-image"
                      name="tip-image"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <Label
              htmlFor="terms"
              className="ml-2 text-sm text-gray-600"
            >
              I agree to the <a href="#" className="text-primary hover:underline">terms and conditions</a>
            </Label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-dark"
            disabled={createTipMutation.isPending}
          >
            {createTipMutation.isPending ? "Submitting..." : "Submit Your Tip"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TipForm;
