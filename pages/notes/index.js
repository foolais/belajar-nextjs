import dynamic from "next/dynamic";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useMutation } from "@/hooks/useMutation";
// import { useQueries } from "@/hooks/usQueries";
// import fetcher from "@/utils/fetcher";
// import useSWR from "swr";
import AddNotes from "./add";
import EditNotes from "./edit/[id]";
import { useState } from "react";
import ModalComponent from "@/components/modalComponent";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes({ listNotes, isLoading }) {
  const router = useRouter();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [selectedNotes, setSelectedNotes] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const { mutate } = useMutation();
  // const { data: listNotes, isLoading } = useQueries({
  //   prefixUrl: "https://service.pace-unv.cloud/api/notes",
  // });
  // const { data: listNotes, isLoading } = useSWR(
  //   "https://service.pace-unv.cloud/api/notes",
  //   fetcher,
  //   { revalidateOnFocus: true }
  // );

  const handleDelete = async () => {
    console.log("tesa");
    try {
      const response = await mutate({
        url: `https://service.pace-unv.cloud/api/notes/delete/${selectedNotes?.id}`,
        method: "DELETE",
      });
      if (response?.success) router.reload();
    } catch (error) {
      console.log({ error });
    }
  };

  const handleEditNotes = (notes) => {
    setSelectedNotes(notes);
    setIsEditing(true);
    setIsDelete(false);
    onOpen();
  };

  const handleAddNotes = () => {
    setSelectedNotes({});
    setIsEditing(false);
    setIsDelete(false);
    onOpen();
  };

  const handleDeleteNotes = (notes) => {
    setSelectedNotes(notes);
    setIsDelete(true);
    onOpen();
  };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Box padding="5">
          <Flex justifyContent="end">
            <Button colorScheme="blue" onClick={handleAddNotes}>
              Add Notes
            </Button>
          </Flex>
          {isLoading ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <Flex>
              <Grid templateColumns="repeat(3, 1fr)" gap={5}>
                {listNotes?.data?.map((item) => (
                  <GridItem key={item?.id}>
                    <Card>
                      <CardHeader>
                        <Heading>{item?.title}</Heading>
                      </CardHeader>
                      <CardBody>
                        <Text>{item?.description}</Text>
                      </CardBody>
                      <CardFooter justify="space-between" flexWrap="wrap">
                        <Button
                          onClick={() => handleEditNotes(item)}
                          flex="1"
                          variant="ghost"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteNotes(item)}
                          flex="1"
                          colorScheme="red"
                        >
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                ))}
              </Grid>
            </Flex>
          )}
        </Box>
      </LayoutComponent>
      <AddNotes isOpen={isOpen && !isEditing && !isDelete} onClose={onClose} />
      <EditNotes
        isOpen={isOpen && isEditing && !isDelete}
        onClose={onClose}
        id={selectedNotes?.id}
      />
      <ModalComponent
        isOpen={isOpen && isDelete}
        onClose={onClose}
        onSubmit={handleDelete}
        title="Hapus Notes?"
        isWithCancelBtn={true}
      />
    </>
  );
}

export async function getStaticProps() {
  let isLoading = true;
  const res = await fetch("https://service.pace-unv.cloud/api/notes");
  const listNotes = await res.json();
  isLoading = false;
  return { props: { listNotes, isLoading }, revalidate: 1 };
}
