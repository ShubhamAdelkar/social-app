import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SignupValidation } from "@/lib/validation";
import { z } from "zod";
import Loader from "@/components/ui/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } =
    useCreateUserAccount();

  const { mutateAsync: signInAccount } =
    useSignInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        title: "Sign up failed. try again.",
      });
    }
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      return toast({
        title: "Sign up failed. try again.",
      });
    }

    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();

      navigate("/");
    } else {
      toast({ title: "Sign up failed. try again" });
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col 2xl:w-70">
        <div className="flex gap-2">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAABNUlEQVR4nO3avYnGMBCEYVfrHlzFFuEuBCrDmQNV4MCJw73kuMyY+wHJ3DOw+cew8sy+fNNERERfmpdIE7cePK4K8+JvDNy3s+vMn7+jtDrEMLAxMG3g5gn7Bj5JiFQhUqTwqcbseqAiXRTp6hIpA5xxTrnGwLSBGxoDZy14YAqRJoUTkYb07wVnVUW6uEROOGuHs+CsAibUfjRmlCkDoCwGtg4GXtF35rdvIAMrA4sNjO5P1xNuDMze2ydEGgPTBoYeqEgvinQKkSaF8zu38Gjzult4HmxeZ2Ae6xDDwIOBaQPDE/YNfJIQWYVISuFQYy49UJFORXp1ieQAZ5xT7mBg2sBAY+CsBQ9MIXJI4USkIf17wVmrIp0ukYCzLjgLzkowYe1HY0z87q8dJn5mIBHR9H/0AYoYEYixH5B1AAAAAElFTkSuQmCC"
            width={42}
          />
          <h2 className="h2-bold">Photto.</h2>
        </div>

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-4">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Enter your details to see photos
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full mt-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="shad-input"
                    placeholder="Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="shad-input"
                    placeholder="Username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="shad-input"
                    placeholder="Email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    {...field}
                    className="shad-input"
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary mt-2">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader />
                Loading...
              </div>
            ) : (
              <p className="base-semibold">Sign up</p>
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center m-2">
            Have an account ?
            <Link
              to="/sign-in"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Log in
            </Link>
          </p>
          <p className="small-medium text-light-4 text-center bottom-0">
            by imbachhu ❤️
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;
