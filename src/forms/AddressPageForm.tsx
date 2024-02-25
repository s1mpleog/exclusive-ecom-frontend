/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as orderService from "@/api/order.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IOrderCreate } from "@/types/types";
import { useForm } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useMemo, useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const AddressPageForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["create-order"],
    mutationFn: orderService.createOrder,

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["add-cart"] });
      await orderService.checkout();
    },

    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  const { register, handleSubmit } = useForm<IOrderCreate>();

  const options = useMemo(() => countryList().getData(), []);

  const styles = "w-[600px] my-3";

  const [value, setValue] = useState<string>("");

  const [country, setCountry] = useState<string>("");

  const handleCountry = (value: string) => {
    setCountry(value);
  };

  const handlePhoneChange = (value: string) => {
    setValue(value);
  };

  const onSubmit = handleSubmit(async (data) => {
    data.phoneNumber = value;
    // @ts-ignore
    data.country = country.label!;

    mutation.mutateAsync(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-start space-y-6"
    >
      <div className="">
        <h3 className="text-3xl font-semibold">Billing Address</h3>
      </div>
      <div className="flex-1">
        <div>
          <Label>
            Country
            <Select
              className="border-red-500 my-2 outline-red-500"
              // @ts-ignore

              options={options}
              value={country}
              // @ts-ignore
              onChange={handleCountry}
            />
          </Label>
          <Label>
            Apartment
            <Input
              {...register("apartment", { required: true })}
              type="text"
              className={styles}
              placeholder="apartment"
            />
          </Label>
          <Label>
            City
            <Input
              {...register("city", { required: true })}
              type="text"
              className={styles}
              placeholder="city"
            />
          </Label>
          <Label>
            Street Address
            <Input
              {...register("streetAddress", { required: true })}
              type="text"
              className={styles}
              placeholder="street Address"
            />
          </Label>
          <Label>
            Email Address
            <Input
              {...register("emailAddress", { required: true })}
              type="email"
              className={styles}
              placeholder="email"
            />
          </Label>
          {/* <Label> */}
          Phone Number
          <PhoneInput
            placeholder="Enter phone number"
            className="border my-4 px-2 py-3 outline-none"
            value={value}
            onChange={handlePhoneChange}
            defaultCountry="IN"
          />
          <Button type="submit" className="w-full my-4" size="lg">
            Continue to checkout
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddressPageForm;
