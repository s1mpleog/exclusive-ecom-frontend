import AuthPageImage from "@/components/auth/AuthPageImage";
import RegisterForm from "@/forms/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex gap-10 items-start justify-start">
        <div className="w-2/4">
          <AuthPageImage />
        </div>
        <div className="w-[500px]">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
