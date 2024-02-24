import * as userService from "@/api/user.service";
import { Button } from "@/components/ui/button";
import { IRegisterBody } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: userService.registerUser,
    mutationKey: ["register-user"],

    onSuccess: async () => {
      toast.success("Please verify otp");
      navigate("/verify");
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
    watch,
    formState: { errors },
  } = useForm<IRegisterBody>();

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-full items-start justify-center space-y-6"
    >
      <div className="">
        <h3 className="text-3xl font-medium">Create an account</h3>
        <p className="my-5">Enter your details below</p>
      </div>
      <div className="flex-1 w-full space-y-14">
        <input
          {...register("firstName", { required: "First Name is required" })}
          type="text"
          className="border-b-2 w-full py-2 outline-none"
          placeholder="First Name"
        />
        {errors.firstName && (
          <span className="text-sm text-primary">
            {errors.firstName.message}
          </span>
        )}
        <input
          {...register("lastName", { required: "Last Name is required" })}
          type="text"
          className="border-b-2 w-full py-2 outline-none"
          placeholder="Last Name"
        />
        {errors.lastName && (
          <span className="text-sm text-primary">
            {errors.lastName.message}
          </span>
        )}
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
        <input
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your password does not match";
              }
            },
          })}
          type="password"
          className="border-b-2 py-2 w-full outline-none"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <span className="text-sm text-primary">
            {errors.confirmPassword.message}
          </span>
        )}
        <Button disabled={mutation.isPending} className="w-full" size="lg">
          {mutation.isPending ? (
            <Loader className="animate-spin transition-all" />
          ) : (
            <p>Create account</p>
          )}
        </Button>
      </div>
      <div className="flex items-center justify-center gap-2">
        <p className="text-gray-700">Already have account ?</p>
        <Link className="underline text-gray-700" to="/login">
          Login
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;
