import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  GridItem,
  Button,
} from "@chakra-ui/react";

export default function ModalComponent(props) {
  const {
    isOpen,
    onClose,
    onSubmit,
    children,
    title,
    isWithCancelBtn = false,
  } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          {isWithCancelBtn && (
            <GridItem>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </GridItem>
          )}
          <GridItem>
            <Button onClick={onSubmit} colorScheme="blue">
              Submit
            </Button>
          </GridItem>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
