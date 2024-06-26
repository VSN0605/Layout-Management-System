import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Center,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Grid,
  FormControl,
  FormLabel,
  Button,
  Input,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  HStack,
  VStack,
  Container,
  Stack,
} from "@chakra-ui/react";

import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

const states = [
  "AP|Andhra Pradesh",
  "AR|Arunachal Pradesh",
  "AS|Assam",
  "BR|Bihar",
  "CT|Chhattisgarh",
  "GA|Goa",
  "GJ|Gujarat",
  "HR|Haryana",
  "HP|Himachal Pradesh",
  "JK|Jammu and Kashmir",
  "JH|Jharkhand",
  "KA|Karnataka",
  "KL|Kerala",
  "MP|Madhya Pradesh",
  "MH|Maharashtra",
  "MN|Manipur",
  "ML|Meghalaya",
  "MZ|Mizoram",
  "NL|Nagaland",
  "OR|Odisha",
  "PB|Punjab",
  "RJ|Rajasthan",
  "SK|Sikkim",
  "TN|Tamil Nadu",
  "TG|Telangana",
  "TR|Tripura",
  "UT|Uttarakhand",
  "UP|Uttar Pradesh",
  "WB|West Bengal",
  "AN|Andaman and Nicobar Islands",
  "CH|Chandigarh",
  "DN|Dadra and Nagar Haveli",
  "DD|Daman and Diu",
  "DL|Delhi",
  "LD|Lakshadweep",
  "PY|Puducherry",
];

const BrokerList = () => {
  const [brokerData, addbrokerData] = useState([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectIdToDelete, setProjectIdToDelete] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    brokerName: "",
    contact: "",
    email: "",
    address: "",
    city: "",
    state: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: "",
    companyName: "",
    brokerName: "",
    contact: "",
    email: "",
    address: "",
    city: "",
    state: "",
  });

  const handleEditPlotChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [editId, setEditId] = useState("");

  const toast = useToast();

  const editData = async () => {
    const url = "http://localhost/backend_lms/setQuery.php";

    let query =
      "UPDATE `broker` SET `companyName` = '" +
      document.getElementById("mi2").value +
      "', `brokerName` = '" +
      document.getElementById("mi3").value +
      "', `contact` = '" +
      document.getElementById("mi4").value +
      "', `emailid` = '" +
      document.getElementById("mi5").value +
      "', `address` = '" +
      document.getElementById("mi6").value +
      "', `city` = '" +
      document.getElementById("mi7").value +
      "', `state` = '" +
      document.getElementById("mi8").value +
      "' WHERE `id` = '" +
      editId +
      "';";

    //alert(query);

    let fData = new FormData();
    fData.append("query", query);

    try {
      const response = await axios.post(url, fData);
      toast({
        title: "broker Edited successfully!",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });

      loadbroker();
      setEditId("0");
      setIsModalOpen(false);
      document.getElementById("mi2").value = "";
      document.getElementById("mi3").value = "";
      document.getElementById("mi4").value = "";
      document.getElementById("mi5").value = "";
      document.getElementById("mi6").value = "";
      document.getElementById("mi7").value = "";
      document.getElementById("mi8").value = "";

      // Clear the form data after successful submission
    } catch (error) {
      console.log(error.toJSON());
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for form submission
    console.log("Form Data:", formData);
  };

  const setModalData = async (index) => {
    let query = "SELECT * FROM `broker` where id = '" + index + "';";
    // alert(query);

    const url = "http://localhost/backend_lms/getQuery.php";
    let fData = new FormData();

    fData.append("query", query);

    try {
      const response = await axios.post(url, fData);

      if (response && response.data) {
        if (response.data.phpresult) {
          //  addbrokerData(response.data.phpresult);
          console.log(response.data.phpresult);
          //document.getElementById('mi1').value = response.data.phpresult[0]['id'];
          document.getElementById("mi2").value =
            response.data.phpresult[0]["companyName"];
          document.getElementById("mi3").value =
            response.data.phpresult[0]["brokerName"];
          document.getElementById("mi4").value =
            response.data.phpresult[0]["contact"];
          document.getElementById("mi5").value =
            response.data.phpresult[0]["emailid"];
          document.getElementById("mi6").value =
            response.data.phpresult[0]["address"];
          document.getElementById("mi7").value =
            response.data.phpresult[0]["city"];
          document.getElementById("mi8").value =
            response.data.phpresult[0]["state"];
        }
      }
    } catch (error) {
      console.log("Please Select Proper Input");
    }
  };

  const loadbroker = async () => {
    let query = "SELECT * FROM `broker`;";
    // alert(query);

    const url = "http://localhost/backend_lms/getQuery.php";
    let fData = new FormData();

    fData.append("query", query);

    try {
      const response = await axios.post(url, fData);

      if (response && response.data) {
        if (response.data.phpresult) {
          addbrokerData(response.data.phpresult);
          console.log(response.data.phpresult);
        }
      }
    } catch (error) {
      console.log("Please Select Proper Input");
    }
  };

  const onDelete = async (index) => {
    let query = "DELETE FROM `broker` WHERE id  = " + projectIdToDelete + ";";

    /*  alert(query); */
    const url = "http://localhost/backend_lms/setQuery.php";

    let fData = new FormData();
    fData.append("query", query);

    axios
      .post(url, fData)
      .then((response) => {
        toast({
          title: "Project deleted successfully!",
          // status: "danger",
          duration: 3000,
          position: "top",
          isClosable: true,
        });

        loadbroker();
      })
      .catch((error) => {
        console.log(error.toJSON());
      });

    setIsDeleteDialogOpen(false);
    setProjectIdToDelete(null);
  };

  const handleEditPlotSubmit = async (index) => {
    let query = "";

    /*  alert(query); */
    const url = "http://localhost/backend_lms/setQuery.php";

    let fData = new FormData();
    fData.append("query", query);

    axios
      .post(url, fData)
      .then((response) => {
        toast({
          title: "Project deleted successfully!",
          // status: "danger",
          duration: 3000,
          position: "top",
          isClosable: true,
        });

        loadbroker();
      })
      .catch((error) => {
        console.log(error.toJSON());
      });

    setIsDeleteDialogOpen(false);
    setProjectIdToDelete(null);
  };

  const handleDelete = (projectId) => {
    setProjectIdToDelete(projectId);
    setIsDeleteDialogOpen(true);
  };

  useEffect(() => {
    // Call the loadbroker function when the component mounts
    loadbroker();
  }, []);

  return (
    <>
      <Container maxW="10xl" px={{ base: 6, md: 3 }} py={14}>
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
        >
          <Box w="100%" overflowX="auto">
            <Center pb={4}>
              <Heading> Broker List</Heading>
            </Center>
            <br></br>
            <Table>
              <Thead>
                <Tr>
                  <Th bg="blue.500" color="white" fontSize="16px">
                    broker ID
                  </Th>
                  <Th bg="blue.500" color="white" fontSize="16px">
                    Company Name
                  </Th>
                  <Th bg="blue.500" color="white" fontSize="16px">
                    broker Name
                  </Th>
                  <Th bg="blue.500" color="white" fontSize="16px">
                    Contact
                  </Th>
                  <Th bg="blue.500" color="white" fontSize="16px">
                    Email
                  </Th>
                  <Th bg="blue.500" color="white" fontSize="16px">
                    Address
                  </Th>
                  <Th bg="blue.500" color="white" fontSize="16px">
                    City
                  </Th>
                  <Th bg="blue.500" color="white" fontSize="16px">
                    State
                  </Th>
                  <Th bg="blue.500" color="white" fontSize="16px">
                    Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {brokerData.map((broker) => (
                  <Tr key={broker.id}>
                    <Td>{broker.id}</Td>
                    <Td>{broker.companyName}</Td>
                    <Td>{broker.brokerName}</Td>
                    <Td>{broker.contact}</Td>
                    <Td>{broker.emailid}</Td>
                    <Td>{broker.address}</Td>
                    <Td>{broker.city}</Td>
                    <Td>{broker.state}</Td>
                    <Td>
                      <HStack>
                        <Button
                          colorScheme="teal"
                          onClick={() => {
                            setIsModalOpen(true);
                            setModalData(broker.id);
                            setEditId(broker.id);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDelete(broker.id)}
                        >
                          Delete
                        </Button>
                        <DeleteConfirmationDialog
                          isOpen={isDeleteDialogOpen}
                          onClose={() => setIsDeleteDialogOpen(false)}
                          onConfirm={onDelete}
                        />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Block</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleEditPlotSubmit}>
                <ModalBody>
                  {/*   <FormControl mb={4}>
                <FormLabel>broker ID</FormLabel>
                <Input
                  type="number"
                  name="plotNo"
                  id="mi1"
                  disabled
                />
              </FormControl> */}
                  <FormControl mb={4}>
                    <FormLabel>Company Name</FormLabel>
                    <Input type="text" name="areaSqft" id="mi2" required />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>broker Name</FormLabel>
                    <Input type="text" name="areaSqft" id="mi3" required />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Contact</FormLabel>
                    <Input type="text" name="areaSqmt" id="mi4" required />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Email</FormLabel>
                    <Input type="text" name="ratePerSqft" id="mi5" required />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Address</FormLabel>
                    <Input type="text" name="areaSqft" id="mi6" required />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>City</FormLabel>
                    <Input type="text" name="areaSqft" id="mi7" required />
                  </FormControl>
                  <FormControl colSpan={1} isRequired>
                    <FormLabel>State</FormLabel>
                    <Select
                      name="state"
                      id="mi8"
                      value={editFormData.state}
                      onChange={handleEditPlotChange}
                      placeholder="Select State"
                    >
                      {states.map((state) => {
                        const [code, name] = state.split("|");
                        return (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" type="button" onClick={editData}>
                    Save Changes
                  </Button>
                  <Button onClick={() => setIsModalOpen(false)} ml={4}>
                    Cancel
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </Stack>
      </Container>
    </>
  );
};

export default BrokerList;
