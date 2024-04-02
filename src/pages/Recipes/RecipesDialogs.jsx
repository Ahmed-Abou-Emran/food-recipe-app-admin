import React from "react";
import { DeleteDialog, FormDialog } from "../../ui/Dialog/Dialog";
import { recipesURL } from "../../services/END_POINTS";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";

export const DeleteRecipeDialog = ({ id, refetchRecipes }) => {
  const [open, setOpen] = React.useState(false);

  const deleteHandler = () => {
    axios
      .delete(`${recipesURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        toast.success(response?.data?.message || "Recipe Deleted Successfully");
        setOpen(false);
        refetchRecipes();
      })
      .catch((error) => {
        toast.error(
          error?.data?.data?.message ||
            "Something Went wrong, Unable to delete Recipe Successfully"
        );
      });
  };

  return (
    <DeleteDialog
      itemName="category"
      onDelete={deleteHandler}
      open={open}
      onOpenChange={setOpen}
    />
  );
};

export const AddRecipeDialog = ({
  tags,
  categories,
  open,
  setOpen,
  refetchCategories,
  refetchRecipes,
}) => {
  // const { refetchRecipes } = useRecipes();
  //   const { updateParams } = useUpdateParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const SubmitHandler = (data) => {
    axios
      .post(
        `${recipesURL}`,
        { ...data, recipeImage: data.recipeImage[0] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        toast.success(response?.data?.message || "Recipe Added Successfully");
        setOpen(false);
        refetchRecipes();
      })
      .catch((error) => {
        toast.error(
          error?.data?.data?.message ||
            "Something Went wrong, Unable to add a New Recipe"
        );
      });
  };
  return (
    <FormDialog open={open} onOpenChange={setOpen}>
      <h3>Add Recipe Form</h3>
      <FormWrapper onSubmit={handleSubmit(SubmitHandler)}>
        <InputField>
          <label htmlFor="name">Name</label>
          <InputWrapper>
            <input
              id="name"
              {...register("name", { required: "This Field is Required" })}
            />
            {errors?.name && <span>{errors.name.message}</span>}
          </InputWrapper>
        </InputField>
        <InputField>
          <label htmlFor="description">Description</label>
          <InputWrapper>
            <textarea
              id="description"
              {...register("description", {
                required: "This Field is Required",
              })}
            />
            {errors?.description && <span>{errors.description.message}</span>}
          </InputWrapper>
        </InputField>
        <InputField>
          <label htmlFor="price"> Price</label>
          <InputWrapper>
            <input
              id="price"
              type="number"
              {...register("price", {
                required: "This Field is Required",
                min: { value: 0, message: "Price must be a positive number" },
              })}
            />
            {errors?.price && <span>{errors.price.message}</span>}
          </InputWrapper>
        </InputField>
        <InputField>
          <label htmlFor="tagId">Tag</label>
          <InputWrapper>
            <select
              id="tagId"
              {...register("tagId", { required: "This Field is Required" })}
            >
              <option value="">Select a Tag</option>
              {tags?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            {errors?.tagId && <span>{errors.tagId.message}</span>}
          </InputWrapper>
        </InputField>
        <InputField>
          <label htmlFor="categoriesIds">Category</label>
          <InputWrapper>
            <select
              id="categoriesIds"
              {...register("categoriesIds", {
                required: "This Field is Required",
              })}
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors?.name && <span>{errors.name.message}</span>}
          </InputWrapper>
        </InputField>
        <InputField>
          <label htmlFor="recipeImage">Recipe Image</label>
          <InputWrapper>
            <input
              type="file"
              id="recipeImage"
              {...register("recipeImage", {
                required: "This Field is Required",
              })}
            />
            {errors?.recipeImage && <span>{errors.recipeImage.message}</span>}
          </InputWrapper>
        </InputField>

        <ActionWrapper>
          <button>Add Recipe</button>
        </ActionWrapper>
      </FormWrapper>
    </FormDialog>
  );
};

export const UpdateRecipeDialog = ({
  open,
  setOpen,
  recipe,
  tags,
  categories,
  refetchRecipes,
}) => {
  const formatedRecipe = {
    ...recipe,
    tagId: recipe.tag.id,
    categoriesIds: recipe?.category[0].id + "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: formatedRecipe,
  });

  const SubmitHandler = async (data) => {
    console.log(data);
    let imageFile;
    try {
      if (data.imagePath) {
        const imageResponse = await axios(
          `https://upskilling-egypt.com/${data.imagePath}`,
          { responseType: "blob" }
        );
        imageFile = imageResponse.data;

        console.log(imageFile);
      }

      const response = await axios.put(
        `${recipesURL}/${recipe?.id}`,
        { ...data, recipeImage: imageFile ? imageFile : data.recipeImage[0] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response?.data?.message || "Recipe Updated Successfully");
      refetchRecipes();
      setOpen(false);
    } catch (error) {
      console.log({ error });
      toast.error(
        error?.data?.data?.message ||
          "Something Went wrong, Unable to update Recipe"
      );
    }
  };

  React.useEffect(() => {
    setValue("tagId", formatedRecipe.tagId);
  }, []);
  return (
    <FormDialog open={open} onOpenChange={setOpen}>
      <h3>Edit Recipe</h3>
      <FormWrapper onSubmit={handleSubmit(SubmitHandler)}>
        <InputField>
          <label htmlFor="name">Name</label>
          <InputWrapper>
            <input
              id="name"
              {...register("name", { required: "This Field is Required" })}
            />
            {errors?.name && <span>{errors.name.message}</span>}
          </InputWrapper>
        </InputField>
        <InputField>
          <label htmlFor="description">Description</label>
          <InputWrapper>
            <textarea
              id="description"
              {...register("description", {
                required: "This Field is Required",
              })}
            />
            {errors?.description && <span>{errors.description.message}</span>}
          </InputWrapper>
        </InputField>
        <InputField>
          <label htmlFor="price"> Price</label>
          <InputWrapper>
            <input
              id="price"
              type="number"
              {...register("price", {
                required: "This Field is Required",
                min: { value: 0, message: "Price must be a positive number" },
              })}
            />
            {errors?.price && <span>{errors.price.message}</span>}
          </InputWrapper>
        </InputField>
        <InputField>
          <label htmlFor="tagId">Tag</label>
          <InputWrapper>
            <select
              id="tagId"
              {...register("tagId", { required: "This Field is Required" })}
            >
              <option value="">Select a Tag</option>
              {tags?.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            {errors?.tagId && <span>{errors.tagId.message}</span>}
          </InputWrapper>
        </InputField>
        <InputField>
          <label htmlFor="categoriesIds">Category</label>
          <InputWrapper>
            <select
              id="categoriesIds"
              {...register("categoriesIds", {
                required: "This Field is Required",
              })}
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors?.name && <span>{errors.name.message}</span>}
          </InputWrapper>
        </InputField>
        <InputField>
          <label htmlFor="recipeImage">Recipe Image</label>
          <InputWrapper>
            <input
              type="file"
              id="recipeImage"
              {...register("recipeImage", {
                // required: "This Field is Required",
              })}
            />
            {errors?.recipeImage && <span>{errors.recipeImage.message}</span>}
          </InputWrapper>
        </InputField>

        <ActionWrapper>
          <button>Update Recipe</button>
        </ActionWrapper>
      </FormWrapper>
    </FormDialog>
  );
};

const FormWrapper = styled.form`
  margin-block-start: 2rem;
  display: grid;
  gap: 1rem;
`;
const InputField = styled.div`
  display: grid;
  gap: 0.5rem;
  label {
    padding-inline-start: var(--spacing-20);
    font-weight: 700;
  }
`;
const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: var(--green-100);
  border-radius: 0.5rem;
  position: relative;
  gap: var(--spacing-20);

  input,
  textarea,
  select {
    resize: none;
    background: var(--green-100);
    border-radius: 0.5rem;
    padding-inline: var(--spacing-30);
    padding-block: var(--spacing-20);
    width: 100%;
    border: none;
    &:focus {
      outline: 2px solid var(--green-500);
    }
  }

  span {
    position: absolute;
    right: 3rem;
    color: #ef4444;
    font-size: 0.75rem;
    font-weight: 500;
    transform: translateY(50%);
    bottom: 50%;
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    background: var(--green-600);
    padding-inline: var(--spacing-30);
    padding-block: var(--spacing-20);
    border-radius: 0.5rem;
    color: var(--grey-100);
    transition: all 300ms ease-in;
    cursor: pointer;

    &:hover {
      background: var(--green-500);
    }
  }
`;
