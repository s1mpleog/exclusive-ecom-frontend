import * as userService from "@/api/user.service";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { IVerifyOTP } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function OTPVerificationModal() {
  const { register, handleSubmit } = useForm<IVerifyOTP>();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["verifyOTP"],
    mutationFn: userService.verifyOTP,

    onError: (error: Error) => {
      toast.error(error.message);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["validate"] });
      toast.success("Otp verified");
      navigate("/");
    },
  });

  const onSubmit = handleSubmit((data) => {
    const otp = `${data.field1}${data.field2}${data.field3}${data.field4}`;
    mutation.mutate(otp);

    console.log(otp);
  });

  return (
    <Dialog defaultOpen={true}>
      <DialogTrigger></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify your OTP</DialogTitle>
          <DialogDescription>
            Enter your OTP and click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-6 flex flex-col" onSubmit={onSubmit}>
          <div className="flex items-center justify-center space-x-4">
            <Input
              className="w-12 h-12 text-4xl text-center border rounded"
              {...register("field1", {
                required: true,
              })}
            />
            <Input
              className="w-12 h-12 text-4xl text-center border rounded"
              {...register("field2", {
                required: true,
              })}
            />
            <Input
              className="w-12 h-12 text-4xl text-center border rounded"
              {...register("field3", {
                required: true,
              })}
            />
            <Input
              className="w-12 h-12 text-4xl text-center border rounded"
              {...register("field4", {
                required: true,
              })}
            />
          </div>
          <DialogFooter className="text-sm text-slate-600 m-auto">
            By clicking ok you are accepting our terms and conditions
          </DialogFooter>
          <Button type="submit" className="w-full">
            Verify OTP
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
