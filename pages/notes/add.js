import { Grid, GridItem, Text, Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@/hooks/useMutation";
import ModalComponent from "@/components/modalComponent";

export default function AddNotes({ isOpen, onClose }) {
  const router = useRouter();
  const { mutate } = useMutation();
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await mutate({
        url: "https://service.pace-unv.cloud/api/notes",
        payload: notes,
      });
      if (response?.success) {
        router.reload();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <ModalComponent
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Add Notes"
    >
      <Grid gap="5">
        <GridItem>
          <Text>Title</Text>
          <Input
            type="text"
            onChange={(event) =>
              setNotes({ ...notes, title: event.target.value })
            }
          />
        </GridItem>
        <GridItem>
          <Text>Description</Text>
          <Textarea
            onChange={(event) =>
              setNotes({ ...notes, description: event.target.value })
            }
          />
        </GridItem>
      </Grid>
    </ModalComponent>
  );
}
