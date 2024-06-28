import dynamic from "next/dynamic";
import {
  Grid,
  GridItem,
  Card,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@/hooks/useMutation";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function EditNotes() {
  const router = useRouter();
  const { id } = router?.query;
  const { mutate } = useMutation();
  const [notes, setNotes] = useState();

  const handleSubmit = async () => {
    try {
      const payload = { title: notes?.title, description: notes?.description };
      const response = await mutate({
        url: `https://service.pace-unv.cloud/api/notes/update/${id}`,
        method: "PATCH",
        payload,
      });

      if (response?.success) router.push("/notes");
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

    fetchingData();
  }, [id]);

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Card margin="5" padding="5">
          <Heading>Edit Notes</Heading>
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
            <GridItem>
              <Button onClick={() => handleSubmit()} colorScheme="blue">
                Submit
              </Button>
            </GridItem>
          </Grid>
        </Card>
      </LayoutComponent>
    </>
  );
}
