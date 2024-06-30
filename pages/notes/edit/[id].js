import { Grid, GridItem, Text, Input, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMutation } from "@/hooks/useMutation";
import ModalComponent from "@/components/modalComponent";
import { useRouter } from "next/router";

export default function EditNotes({ isOpen, onClose, id }) {
  const { mutate } = useMutation();
  const router = useRouter();
  const [notes, setNotes] = useState();

  const handleSubmit = async () => {
    try {
      const payload = { title: notes?.title, description: notes?.description };
      const response = await mutate({
        url: `https://service.pace-unv.cloud/api/notes/update/${id}`,
        method: "PATCH",
        payload,
      });

      if (response?.success) router.reload();
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch(`https://service.pace-unv.cloud/api/notes/${id}`);
      const listNotes = await res.json();
      setNotes(listNotes?.data);
    }

    if (isOpen) fetchingData();
  }, [id]);

  return (
    <ModalComponent
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Notes"
    >
      <Grid gap="5">
        <GridItem>
          <Text>Title</Text>
          <Input
            type="text"
            value={notes?.title}
            onChange={(event) =>
              setNotes({ ...notes, title: event.target.value })
            }
          />
        </GridItem>
        <GridItem>
          <Text>Description</Text>
          <Textarea
            value={notes?.description}
            onChange={(event) =>
              setNotes({ ...notes, description: event.target.value })
            }
          />
        </GridItem>
      </Grid>
    </ModalComponent>
  );
}
