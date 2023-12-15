import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import axios from "axios";

function CreateRecipeForm({ recipeToEdit = {}, onCloseModal }) {
  //   const { isCreating, createRecipe } = useCreateRecipe();
  //   const { isEditing, editRecipe } = useEditRecipe();
  //   const false = isCreating || isEditing;

  const { id: editId, ...editValues } = recipeToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  function onSubmit(data) {
    axios.post(
      "https://upskilling-egypt.com:443/api/v1/Recipe/?pageSize=100&pageNumber=1",
      {
        ...data,
        recipeImage: data.recipeImage[0],
        // name: "Arabic Pizza",
        // description: "Spicy Pizza",
        // price: 140,
        // tagId: 2,
        // recipeImage file
        // categoriesIds: "1,2,3",
      },

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      }
    );

    // if (isEditSession)
    //   editRecipe(
    //     { newRecipeData: { ...data, image }, id: editId },
    //     {
    //       onSuccess: (data) => {
    //         reset();
    //         onCloseModal?.();
    //       },
    //     }
    //   );
    // else
    //   createRecipe(
    //     { ...data, image: image },
    //     {
    //       onSuccess: (data) => {
    //         reset();
    //         onCloseModal?.();
    //       },
    //     }
    //   );
  }

  function onError(errors) {}

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Recipe name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={false}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={false}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Price" error={errors?.price?.message}>
        <Input
          type="number"
          id="price"
          disabled={false}
          {...register("price", {
            required: "This field is required",
            min: {
              value: 1,
              message: "price should be positive number",
            },
          })}
        />
      </FormRow>

      <FormRow label="Tag Id" error={errors?.tagId?.message}>
        <Input
          type="number"
          id="name"
          disabled={false}
          {...register("tagId", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Categories Ids">
        <Input
          type="text"
          id="categoriesIds"
          placeholder="1,2,3,4 etc"
          disabled={false}
          {...register("categoriesIds", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Recipe Image">
        <FileInput
          id="image"
          accept="image/*"
          {...register("recipeImage", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={false}>
          {isEditSession ? "Edit Recipe" : "Create new Recipe"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateRecipeForm;
