import { IRegisterBody } from "@/types/types";
import {
  MutationFunction,
  MutationKey,
  QueryKey,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useMutationForm = (
  mutationFn: MutationFunction<void | IRegisterBody>,
  mutationKey: MutationKey,
  invalidateKey: QueryKey,
  error: string,
  redirect: number,
  success: string
) => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn,
    mutationKey,

    onSuccess: async (data) => {
      toast.success(success);
      if (data) {
        queryClient.setQueryData(invalidateKey, data);
      }
      await queryClient.invalidateQueries({ queryKey: [invalidateKey] });
      navigate(redirect);
    },

    onError: (err) => {
      toast.error(error);
      console.error(err);
    },
  });

  return {
    mutation,
  };
};

export default useMutationForm;
