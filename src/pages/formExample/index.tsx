import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Container from '@/src/components/Container';
import Button from '@/src/components/ui/Button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/Form';
import { Input } from '@/src/components/ui/Input';

const FormSchema = z.object({
  username: z.string().min(2, {
    message: '请填写用户名',
  }),
  password: z
    .string({
      required_error: '请填写密码',
    })
    .min(1, { message: '请填写密码' }),
});

export default function Page() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }
  return (
    <Container className="pt-4">
      <Form {...form}>
        <div className="flex flex-col space-y-4 px-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>用户名</FormLabel>
                  <FormControl>
                    <Input placeholder="用户名" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>密码</FormLabel>
                  <FormControl>
                    <Input placeholder="密码" type="text" password {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button onClick={() => form.handleSubmit(onSubmit)()}>Submit</Button>
        </div>
      </Form>
    </Container>
  );
}
