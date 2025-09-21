import { useState } from "react";
import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { toast } from "react-toastify";

import DishPlaceholder from "../../../assets/dishPlaceholder.jpg";
import { Dish } from "../../../lib/TypesData";
import { useDishStore } from "../../../store/dishStore";
import LoadingSpinner from "../../LoadingSpinner";

interface Props {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  dishToUpdate: Dish | null;
  setDishToUpdate: React.Dispatch<React.SetStateAction<Dish | null>>;
}

const CreateUpdateDishModal = ({
  openModal,
  setOpenModal,
  dishToUpdate,
  setDishToUpdate,
}: Props) => {
  const [name, setName] = useState(dishToUpdate?.name || "");
  const [description, setDescription] = useState(
    dishToUpdate?.description || "",
  );
  const [price, setPrice] = useState<number | null>(
    dishToUpdate?.price || null,
  );
  const [image, setImage] = useState(dishToUpdate?.image || "");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { isLoading, createDish, updateDish } = useDishStore();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target?.files[0]);
      setImage(imageUrl);
    }
  };

  const handleCreateUpdateDish = async () => {
    if (!name || !price) {
      return toast.error("Please fill the name & price fields!");
    }

    if (price <= 0) {
      return toast.error("Price must be greater than $0!");
    }

    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());

    if (dishToUpdate) {
      // UPDATE DISH
      await updateDish(formData, dishToUpdate?._id);
      toast.success("Dish updated successfully!");
      setOpenModal(false);
    } else {
      // CREATE DISH
      try {
        await createDish(formData);
        toast.success("Dish created successfully!");
        setOpenModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Modal
        dismissible
        show={openModal}
        onClose={() => {
          setOpenModal(false);
          setDishToUpdate(null);
        }}
        position={"center"}
      >
        <Modal.Header>
          {dishToUpdate ? "Update Dish" : "Create Dish"}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-3">
            <div className="sm:flex-1">
              <label htmlFor="image">
                <img
                  src={image || DishPlaceholder}
                  alt="dish"
                  className="size-32 cursor-pointer border p-2 transition duration-300 ease-in-out hover:scale-105"
                />
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Dish Name" />
              </div>
              <TextInput
                type="text"
                sizing="sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Dish Description" />
              </div>
              <TextInput
                type="text"
                sizing="sm"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="Price ($)" />
              </div>
              <TextInput
                type="number"
                sizing="sm"
                value={price!}
                onChange={(e) => setPrice(Number(e.target.value) || 0)}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color={"failure"} onClick={handleCreateUpdateDish}>
            {isLoading ? (
              <Spinner color="failure" />
            ) : dishToUpdate ? (
              "Update Dish"
            ) : (
              "Create Dish"
            )}
          </Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Dismiss
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateUpdateDishModal;