import AddressPageImage from "@/components/AddressPageImage";
import AddressPageForm from "@/forms/AddressPageForm";

const AddressPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-2">
        <div>
          <AddressPageImage />
        </div>
        <div>
          <AddressPageForm />
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
