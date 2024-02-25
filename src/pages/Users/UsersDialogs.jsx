import React from "react";
import { DeleteDialog, ViewDialog } from "../../ui/Dialog/Dialog";
import { baseUsers } from "../../services/END_POINTS";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import { FaRegUserCircle as RegularUser } from "react-icons/fa";

import axios from "axios";
import { formatDate } from "../../utils/helpers";
export const DeleteUserDialog = ({ id, refetchUsers }) => {
  const [open, setOpen] = React.useState(false);

  const deleteHandler = () => {
    axios
      .delete(`${baseUsers}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        toast.success(
          response?.data?.data?.message || "User Deleted Successfully"
        );
        setOpen(false);
        refetchUsers();
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "Something Went wrong, Unable to Deleted User Delete Successfully"
        );
      });
  };

  return (
    <DeleteDialog
      itemName="user"
      onDelete={deleteHandler}
      open={open}
      onOpenChange={setOpen}
    />
  );
};

export const ViewUserDialog = ({ user }) => {
  const {
    imagePath,
    userName,
    country,
    email,
    phoneNumber,
    group,
    creationDate,
    modificationDate,
  } = user;
  return (
    <ViewDialog>
      <Wrapper>
        <AvatarWrapper>
          <ImageWrapper>
            {imagePath ? (
              <img src={`https://upskilling-egypt.com/${imagePath}`} />
            ) : (
              <RegularUser />
            )}
          </ImageWrapper>
          <Username>{userName}</Username>
        </AvatarWrapper>
        <Row>
          <span>Country:</span>
          <Country>{country}</Country>
        </Row>
        <Row>
          <span>Email:</span>
          {email}
        </Row>
        <Row>
          <span>Phone Number:</span>
          {phoneNumber}
        </Row>
        <Row>
          <span>Role:</span>
          {group.name == "SystemUser" ? "System User" : "Super Admin"}
        </Row>
        <Row>
          <span>Signup:</span>
          {formatDate(creationDate)}
        </Row>
        <Row>
          <span>Last Modified :</span>
          {formatDate(modificationDate)}
        </Row>
      </Wrapper>
    </ViewDialog>
  );
};

const Wrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  & > div {
    ::first-letter {
      text-transform: capitalize;
    }
  }
`;
const AvatarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block-end: 1rem;
`;
const ImageWrapper = styled.div`
  width: 8rem;
  height: 8rem;
  font-size: 8rem;
  color: var(--grey-400);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    border-radius: 50%;
    border: 3px solid var(--grey-200);
    transition: transform 300ms ease-in-out;
  }
`;
const Username = styled.div`
  font-weight: 700;
  font-size: 1rem;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  span {
    font-weight: 700;
  }
`;

const Country = styled.div`
  text-transform: capitalize;
`;
