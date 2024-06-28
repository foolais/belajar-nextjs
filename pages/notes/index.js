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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
// import { useQueries } from "@/hooks/usQueries";
import { useMutation } from "@/hooks/useMutation";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes() {
  const router = useRouter();
  const { mutate } = useMutation();
  // const { data: listNotes, isLoading } = useQueries({
  //   prefixUrl: "https://service.pace-unv.cloud/api/notes",
  // });
  const { data: listNotes, isLoading } = useSWR(
    "https://service.pace-unv.cloud/api/notes",
    fetcher,
    { revalidateOnFocus: true }
  );

  const handleDelete = async (id) => {
    try {
      const response = await mutate({
        url: `https://service.pace-unv.cloud/api/notes/delete/${id}`,
        method: "DELETE",
      });
      if (response?.success) router.reload();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <Box padding="5">
          <Flex justifyContent="end">
            <Button
              colorScheme="blue"
              onClick={() => router.push("/notes/add")}
            >
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
                          onClick={() => router.push(`/notes/edit/${item?.id}`)}
                          flex="1"
                          variant="ghost"
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(item?.id)}
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
    </>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("https://service.pace-unv.cloud/api/notes");
//   const notes = await res.json();
//   return { props: { notes }, revalidate: 10 };
// }
