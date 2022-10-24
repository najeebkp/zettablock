import React, { useEffect, useState } from "react";
import { ChevronForward, ChevronDown } from "@styled-icons/ionicons-outline";

import {
  Container,
  Table,
  TableCell,
  Title,
  DetailedRow,
  Row,
  QueryFormat,
  Button,
  Loading,
  TrashIcon,
  SearchIcon,
  SearchWrapper,
  PencilIcon,
} from "./HomeScreenStyles";

import Pagination from "./Pagination";

function HomeScreen() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [expandedRow, SetExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const [pages, setPages] = useState(0);
  const [edit, setEdit] = useState(null);

  let filterTimeout;

  const getData = async () => {
    await fetch("https://62a6bb9697b6156bff7e6251.mockapi.io/v1/apis")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setFilteredData(res);
        setPages(Math.ceil(res.length / recordsPerPage));
      })
      .catch((error) => console.log("Error"));
  };

  const hanldeExpand = (id) => {
    if (id == expandedRow) {
      SetExpandedRow(null);
    } else {
      SetExpandedRow(id);
    }
  };

  const handleSort = () => {
    let sortedData = [...data];
    sortedData.sort((a, b) => (a.name > b.name ? 1 : -1));
    setFilteredData(sortedData);
    setData(sortedData);
    setCurrentPage(1);
  };

  const debounceSearch = (e) => {
    clearTimeout(filterTimeout);
    filterTimeout = setTimeout(() => {
      let filteredArray = [...data];
      filteredArray = filteredArray.filter((item) =>
        item.name.includes(e.target.value),
      );
      setFilteredData(filteredArray);
      setPages(Math.ceil(filteredArray.length / recordsPerPage));
      setCurrentPage(1);
    }, 300);
  };

  const handlePageChange = () => {
    setFilteredData(filteredData);
  };

  const handleDelete = (value) => {
    let newArray = [...data];
    newArray = newArray.filter((item) => item.id !== value.id);
    setData(newArray);
    setFilteredData(newArray);
    setPages(Math.ceil(newArray.length / recordsPerPage));
  };

  const handleEdit = (item) => {
    setEdit({ ...edit, id: item.id, text: item.description });
  };

  const handleEditDesc = (e) => {
    setEdit({ ...edit, text: e.target.value });
  };

  const handleUpdateDesc = () => {
    let newArray = [...data];
    let itemIndex = newArray.findIndex((obj) => obj.id == edit.id);
    newArray[itemIndex].description = edit.text;
    setData(newArray);
    setEdit(null);
  };

  useEffect(() => {
    handlePageChange();
  }, [currentPage]);

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {filteredData ? (
        <Container>
          <Table>
            <TableCell>
              <Title big size="17px">
                API Table
              </Title>
              <Title floatRight auto button onClick={(e) => handleSort(e)}>
                <Button>Sort A-Z</Button>
              </Title>
              <SearchWrapper auto border>
                <SearchIcon size="14" />
                <input
                  placeholder="Search"
                  onChange={(e) => debounceSearch(e)}
                ></input>
              </SearchWrapper>
            </TableCell>
            <TableCell size="13px" head>
              <Title small />
              <Title big size="13px" head>
                Name
              </Title>
              <Title size="13px" head>
                Type
              </Title>
              <Title big size="13px" head>
                Description
              </Title>
            </TableCell>

            {filteredData.length > 0 ? (
              filteredData
                .slice(indexOfFirstRecord, indexOfLastRecord)
                .map((item, index) => (
                  <React.Fragment key={index}>
                    <TableCell>
                      <Title small onClick={() => hanldeExpand(item.id)} button>
                        {expandedRow == item.id ? (
                          <ChevronDown size="14px" />
                        ) : (
                          <ChevronForward size="14px" />
                        )}
                      </Title>
                      <Title big>{item.name}</Title>
                      <Title>{item.type}</Title>
                      {edit && edit.id == item.id ? (
                        <>
                          <input
                            value={edit.text}
                            onChange={handleEditDesc}
                          ></input>
                          <Button variant="success" onClick={handleUpdateDesc}>
                            Update
                          </Button>
                        </>
                      ) : (
                        <Title big>
                          {item.description}{" "}
                          <PencilIcon
                            size="14"
                            color="blue"
                            onClick={() => handleEdit(item)}
                          />
                        </Title>
                      )}
                      <Title floatRight auto onClick={() => handleDelete(item)}>
                        <TrashIcon size="16" />
                      </Title>
                    </TableCell>
                    {expandedRow == item.id && (
                      <DetailedRow>
                        {Object.entries(item).map(
                          ([key, value]) =>
                            value && (
                              <Row key={item.id}>
                                <Title size="13px" head>
                                  {key}{" "}
                                </Title>
                                {typeof value != "object" ? (
                                  <Title auto>
                                    {key == "query" ? (
                                      <QueryFormat>{value}</QueryFormat>
                                    ) : (
                                      value
                                    )}
                                  </Title>
                                ) : (
                                  <QueryFormat>
                                    {JSON.stringify(value, null, 4)}
                                  </QueryFormat>
                                )}
                              </Row>
                            ),
                        )}
                      </DetailedRow>
                    )}
                  </React.Fragment>
                ))
            ) : (
              <div>No Data</div>
            )}
          </Table>
          <Pagination
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Container>
      ) : (
        <Loading>Loading..</Loading>
      )}
    </div>
  );
}

export default HomeScreen;
