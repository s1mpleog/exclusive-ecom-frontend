import * as userService from "@/api/user.service";
import { Button } from "@/components/ui/button";
import { ILoginBodyType } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: userService.loginUser,
    mutationKey: ["register-user"],

    onSuccess: async () => {
      toast.success("Login Success");
      navigate("/", { replace: true });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({ queryKey: ["validate"] });
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginBodyType>();

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-full items-start justify-center space-y-6"
    >
      <div className="">
        <h3 className="text-3xl font-medium">Log in to Exclusive</h3>
        <p className="my-5">Enter your details below</p>
      </div>
      <div className="flex-1 w-full space-y-14">
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          className="border-b-2 w-full py-2 outline-none"
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-sm text-primary">{errors.email.message}</span>
        )}
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          type="password"
          className="border-b-2 py-2 w-full outline-none"
          placeholder="Password "
        />
        {errors.password && (
          <span className="text-sm text-primary">
            {errors.password.message}
          </span>
        )}
        <Button disabled={mutation.isPending} className="w-full" size="lg">
          {mutation.isPending ? (
            <Loader className="animate-spin transition-all" />
          ) : (
            <p>Login</p>
          )}
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2">
        <p className="text-gray-700">Don't have account ?</p>
        <Link className="underline text-gray-700" to="/register">
          Register
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
