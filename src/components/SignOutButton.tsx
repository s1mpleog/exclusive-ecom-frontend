import * as userService from "@/api/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";

const SignOutButton = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: userService.logoutUser,

    onSuccess: async () => {
      toast.success("Logout success");
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      await queryClient.invalidateQueries({ queryKey: ["validate"] });
    },

    onError: () => {
      toast.error("Failed to logout user");
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <div className="cursor-pointer">
      <LogOut onClick={handleClick} />
    </div>
  );
};

export default SignOutButton;
