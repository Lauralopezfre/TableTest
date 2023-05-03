import {
  Box,
  Stack,
  Button,
  Avatar,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export function Home() {
  const [usersOrigin, setUsersOrigin] = useState([]);
  const [users, setUsers] = useState([]);
  const [colorAction, setColorAction] = useState(false);
  const toast = useToast()

  function removeUser(e) {
    let copyUsers = [...users];
    users.forEach((element, index) => {
      if (element.id.value === e.target.id) {
        copyUsers.splice(index, 1);
      }
    });

    toast({
      position: 'bottom-left',
      render: () => (
        <Box color='white' p={3} bg='green.500'>
          User removed
        </Box>
      ),
    })
  
    setUsers(copyUsers);
  }

  function sortArray() {
    let copyUsers = [...users];
    copyUsers.sort((a, b) =>
      a.location.country < b.location.country
        ? -1
        : a.location.country > b.location.country
        ? 1
        : 0
    );
    setUsers(copyUsers);
  }

  function resetData() {
    setUsers([...usersOrigin]);
  }

  function getUsers() {
    axios
      .request({
        method: "GET",
        url: "https://randomuser.me/api/?results=100",
      })
      .then(function (response) {
        setUsers(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {
    getUsers();
    setUsersOrigin([...users]);
  }, []);

  return (
    <>
    <Stack gap={2}>
      <Button onClick={() => setColorAction(!colorAction)}>
        ALTERNATE COLOR
      </Button>
      <Button onClick={sortArray}>SORT BY COUNTRY</Button>
      <Button onClick={resetData}>RESET DATA</Button>
      
      
      </Stack>
      <TableContainer>
        <Table
          size="sm"
          variant={colorAction ? "striped" : "simple"}
          colorScheme="cyan"
        >
          <Thead>
            <Tr>
              <Th>Photo</Th>
              <Th>Name</Th>
              <Th>LastName</Th>
              <Th onClick={sortArray}>Country</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users && users.length > 0 ? (
              users.map((element, index) => {
                return (
                  <Tr key={index}>
                    <Td>
                      <Avatar
                        name={element.name.first}
                        src={element.picture.medium}
                      />
                    </Td>
                    <Td>{element.name.first} </Td>
                    <Td>{element.name.last}</Td>
                    <Td>{element.location.country}</Td>
                    <Td>
                      <Button
                        id={element.id.value}
                        onClick={(e) => {
                          removeUser(e);
                        }}
                      >
                        Remove
                      </Button>
                    </Td>
                  </Tr>
                );
              })
            ) : null}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
