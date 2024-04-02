import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ImCross as Cross } from "react-icons/im";
import "./Dialog.css";
import { NoData } from "../../assets";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Trash, ViewEye, XCircle } from "../../assets/icons";

const Root = Dialog.Root;
// will contain the button that will open the dialog
const Trigger = Dialog.Trigger;

const Overlay = Dialog.Overlay;
const Portal = Dialog.Portal;

const Content = Dialog.Content;
const Title = Dialog.Title;
const Description = Dialog.Description;

// will close the dialog
const Close = Dialog.Close;

const buttonVariants = {
  hover: {
    scale: 1.5,
  },
};
const DialogDemo = () => (
  <Root>
    <Trigger asChild>
      <button className="Button violet">Edit profile</button>
    </Trigger>
    <Portal>
      <Overlay className="DialogOverlay" />
      <Content className="DialogContent">
        <Title className="DialogTitle">Edit profile</Title>
        <Description className="DialogDescription">
          Make changes to your profile here. Click save when you're done.
        </Description>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="name">
            Name
          </label>
          <input className="Input" id="name" defaultValue="Pedro Duarte" />
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="username">
            Username
          </label>
          <input className="Input" id="username" defaultValue="@peduarte" />
        </fieldset>
        <div
          style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}
        >
          <Close asChild>
            <button className="Button green">Save changes</button>
          </Close>
        </div>
        <Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross />
          </button>
        </Close>
      </Content>
    </Portal>
  </Root>
);

export const DeleteDialog = ({ itemName, onDelete, open, onOpenChange }) => {
  return (
    <Wrapper open={open} onOpenChange={onOpenChange}>
      <ActionTrigger
        whileHover="hover"
        whileTap="tap"
        initial="initial"
        variants={buttonVariants}
      >
        <Trash />
      </ActionTrigger>
      <Portal>
        <Overlay className="DialogOverlay" />
        <ContentWrapper className="DialogContent">
          <ImageWrapper>
            <img src={NoData} />
          </ImageWrapper>
          <h3>Delete This {itemName ? itemName : "Item"}?</h3>
          <p>
            are you sure you want to delete this {itemName ? itemName : "Item"}?
            if you are sure just click on delete it
          </p>

          {/* <Close asChild> */}
          <OutlineButton onClick={onDelete}>
            Delete This {itemName ? itemName : "Item"}
          </OutlineButton>
          {/* </Close> */}
          <Close asChild>
            <CrossButton whileHover="hover" whileTap="tap" aria-label="Close">
              <XCircle />
            </CrossButton>
          </Close>
        </ContentWrapper>
      </Portal>
    </Wrapper>
  );
};

export const FormDialog = ({ open, onOpenChange, children }) => {
  return (
    <Wrapper open={open} onOpenChange={onOpenChange}>
      <Portal>
        <Overlay className="DialogOverlay" />
        <FormContentWrapper className="DialogContent">
          {children}

          <Close asChild>
            <CrossButton aria-label="Close">
              <Cross />
            </CrossButton>
          </Close>
        </FormContentWrapper>
      </Portal>
    </Wrapper>
  );
};
export const ViewDialog = ({ children }) => {
  return (
    <Wrapper>
      <ActionTrigger
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <ViewEye />
      </ActionTrigger>
      <Portal>
        <Overlay className="DialogOverlay" />
        <ContentWrapper className="DialogContent">
          {children}
          <Close asChild>
            <CrossButton whileHover="hover" whileTap="tap" aria-label="Close">
              <XCircle />
            </CrossButton>
          </Close>
        </ContentWrapper>
      </Portal>
    </Wrapper>
  );
};
const Wrapper = styled(Root)`
  position: relative;
`;

const ContentWrapper = styled(Content)`
  padding-inline: var(--spacing-80);
  padding-block: var(--spacing-100);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  h3 {
    color: var(--grey-700);
    font-family: Inter;
    font-size: 1.25rem;
    font-weight: 700;
  }
  p {
    color: var(--grey-400);
    text-align: center;
    font-size: 1rem;
    font-weight: 400;
    margin-block-end: var(--spacing-60);
  }

  button {
    align-self: flex-end;
  }
`;

const FormContentWrapper = styled(ContentWrapper)`
  align-items: stretch;
`;
const ActionTrigger = motion(styled(Trigger)`
  color: var(--grey-600);
  transition: all 300ms ease-in-out;
  &:focus,
  &:hover {
    .trash {
      color: var(--red-400);
    }
  }
  svg {
    font-size: 1.5rem;
  }
  border: none;
  background: none;
  cursor: pointer;
`);
const ImageWrapper = styled.div`
  height: 15rem;
  font-size: 5rem;
  color: var(--grey-400);
  img {
    height: 100%;
  }
`;

const OutlineButton = styled.button`
  color: var(--red-600);
  border: 1px solid var(--red-600);
  border-radius: 0.5rem;
  padding-inline: var(--spacing-20);
  padding-block: var(--spacing-30);
  transition: all 300ms ease-in-out;
  cursor: pointer;
  &:hover {
    color: var(--grey-100);
    border: 1px solid var(--grey-100);
    background-color: var(--red-600);
  }

  &:focus {
    outline: 2px solid red;
    outline-offset: 4px;
  }
`;
const IconButton = styled.button`
  transition: all 300ms ease-in-out;
  border-radius: 50%;
  background: none;
  cursor: pointer;
  &:focus,
  &:hover {
    transform: scale(1.2);
  }

  svg {
    width: 2rem;
    height: 2rem;
  }
`;
const CrossButton = motion(styled(IconButton)`
  position: absolute;
  top: var(--spacing-80);
  right: var(--spacing-80);
  color: var(--red-600);
`);

export default DialogDemo;
