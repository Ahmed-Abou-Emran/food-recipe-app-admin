import React from "react";
import { DeleteDialog, FormDialog } from "../../ui/Dialog/Dialog";
import { categoriesURL } from "../../services/END_POINTS";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useCategories } from "./hooks";
export const DeleteCategoryDialog = ({ id, refetchCategories }) => {
  const [open, setOpen] = React.useState(false);

  const deleteHandler = () => {
    axios
      .delete(`${categoriesURL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        toast.success(
          response?.data?.data?.message || "Category Deleted Successfully"
        );
        setOpen(false);
        refetchCategories();
      })
      .catch((error) => {
        toast.error(
          error?.data?.data?.message ||
            "Something Went wrong, Unable to delete Category Successfully"
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

export const AddCategoryDialog = ({ open, setOpen, refetchCategories }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const SubmitHandler = (data) => {
    axios
      .post(`${categoriesURL}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        toast.success(
          response?.data?.data?.message || "Category Added Successfully"
        );
        setOpen(false);
        refetchCategories();
      })
      .catch((error) => {
        toast.error(
          error?.data?.data?.message ||
            "Something Went wrong, Unable to add a New Category"
        );
      });
  };
  return (
    <FormDialog open={open} onOpenChange={setOpen}>
      <h3>Add Category Form</h3>
      <FormWrapper onSubmit={handleSubmit(SubmitHandler)}>
        <InputField>
          <label htmlFor="name">Category</label>
          <InputWrapper>
            <input
              id="name"
              {...register("name", { required: "This Field is Required" })}
            />
            {errors?.name && <span>{errors.name.message}</span>}
          </InputWrapper>
        </InputField>

        <ActionWrapper>
          <button>Add</button>
        </ActionWrapper>
      </FormWrapper>
    </FormDialog>
  );
};

export const UpdateCategoryDialog = ({
  open,
  setOpen,
  id,
  name,
  refetchCategories,
}) => {
  // const [open, setOpen] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name } });

  const SubmitHandler = (data) => {
    axios
      .put(`${categoriesURL}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        toast.success(
          response?.data?.data?.message || "Category Updated Successfully"
        );
        refetchCategories();
        setOpen(false);
      })
      .catch((error) => {
        toast.error(
          error?.data?.data?.message ||
            "Something Went wrong, Unable to update Category"
        );
      });
  };
  return (
    <FormDialog open={open} onOpenChange={setOpen}>
      <h3>Edit Category</h3>
      <FormWrapper onSubmit={handleSubmit(SubmitHandler)}>
        <InputField>
          <label htmlFor="name">Category</label>
          <InputWrapper>
            <input
              id="name"
              {...register("name", { required: "This Field is Required" })}
            />
            {errors?.name && <span>{errors.name.message}</span>}
          </InputWrapper>
        </InputField>

        <ActionWrapper>
          <button>Update</button>
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
  input {
    border-radius: 0.5rem;
    padding-inline: var(--spacing-30);
    padding-block: var(--spacing-20);
    width: 100%;
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
