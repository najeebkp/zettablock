import React, { useEffect, useState } from "react";
import {
  ChevronForward,
  ChevronDown,
  ArrowUndo,
  ArrowRedo,
} from "@styled-icons/ionicons-outline";

import {
  Container,
  Table,
  TableCell,
  Block,
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
  const [history, setHistory] = useState(null);
  const [toggleRedo, setToggleRedo] = useState(false);

  let filterTimeout;

  // Data fetching
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

  // Row expand
  const hanldeExpand = (id) => {
    if (id == expandedRow) {
      SetExpandedRow(null);
    } else {
      SetExpandedRow(id);
    }
  };

  // sorting
  const handleSort = () => {
    let sortedData = [...data];
    sortedData.sort((a, b) => (a.name > b.name ? 1 : -1));
    setFilteredData(sortedData);
    setData(sortedData);
    setCurrentPage(1);
  };

  // search
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

  // page change
  const handlePageChange = () => {
    setFilteredData(filteredData);
  };

  // delete row
  const handleDelete = (value) => {
    let newArray = JSON.parse(JSON.stringify(data));
    let itemIndex = newArray.findIndex((obj) => obj.id == value.id);
    setHistory({ data: data[itemIndex], index: itemIndex, action: "delete" });
    newArray = newArray.filter((item) => item.id !== value.id);
    setData(newArray);
    setFilteredData(newArray);
    setPages(Math.ceil(newArray.length / recordsPerPage));
    setToggleRedo(false);
  };

  // update description
  const handleEdit = (item) => {
    setEdit({ ...edit, id: item.id, text: item.description });
  };

  const handleEditDesc = (e) => {
    setEdit({ ...edit, text: e.target.value });
  };

  const handleUpdateDesc = () => {
    let newArray = JSON.parse(JSON.stringify(data));
    let itemIndex = newArray.findIndex((obj) => obj.id == edit.id);
    setHistory({ data: data[itemIndex], action: "edit" });
    newArray[itemIndex].description = edit.text;
    setData(newArray);
    setFilteredData(newArray);
    setEdit(null);
    setToggleRedo(false);
  };

  // undo/redo operation
  const handleHistory = () => {
    let newArray = JSON.parse(JSON.stringify(data));
    let itemIndex = newArray.findIndex((obj) => obj.id == history.data.id);
    if (itemIndex != -1) {
      if (history.action == "edit") {
        newArray[itemIndex] = history.data;
        setHistory({ data: data[itemIndex], action: "edit" });
      } else {
        setHistory({
          data: data[itemIndex],
          index: itemIndex,
          action: "delete",
        });
        newArray = newArray.filter((item) => item.id !== history.data.id);
        setData(newArray);
        setFilteredData(newArray);
      }
    } else {
      newArray.splice(history.index, 0, history.data);
    }

    setData(newArray);
    setFilteredData(newArray);
    setToggleRedo(!toggleRedo);
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
              <Block big size="17px">
                API Table
              </Block>
              <Block floatRight auto button onClick={(e) => handleSort(e)}>
                <Button>Sort A-Z</Button>
              </Block>
              <SearchWrapper border>
                <SearchIcon size="14" />
                <input
                  placeholder="Search"
                  onChange={(e) => debounceSearch(e)}
                ></input>
              </SearchWrapper>
              <Block
                disabled={history === null ? true : false}
                auto
                button
                onClick={() => handleHistory()}
              >
                {toggleRedo ? (
                  <Button>
                    <ArrowRedo size="13" />
                    Redo
                  </Button>
                ) : (
                  <Button>
                    <ArrowUndo size="13" />
                    Undo
                  </Button>
                )}
              </Block>
            </TableCell>
            <TableCell size="13px" head>
              <Block small />
              <Block big size="13px" head>
                Name
              </Block>
              <Block size="13px" head>
                Type
              </Block>
              <Block big size="13px" head>
                Description
              </Block>
            </TableCell>

            {filteredData.length > 0 ? (
              filteredData
                .slice(indexOfFirstRecord, indexOfLastRecord)
                .map((item, index) => (
                  <React.Fragment key={index}>
                    <TableCell>
                      <Block small onClick={() => hanldeExpand(item.id)} button>
                        {expandedRow == item.id ? (
                          <ChevronDown size="14px" />
                        ) : (
                          <ChevronForward size="14px" />
                        )}
                      </Block>
                      <Block big>{item.name}</Block>
                      <Block>{item.type}</Block>
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
                        <Block big>
                          {item.description}{" "}
                          <PencilIcon
                            size="14"
                            color="blue"
                            onClick={() => handleEdit(item)}
                          />
                        </Block>
                      )}
                      <Block floatRight auto onClick={() => handleDelete(item)}>
                        <TrashIcon size="16" />
                      </Block>
                    </TableCell>
                    {expandedRow == item.id && (
                      <DetailedRow>
                        {Object.entries(item).map(
                          ([key, value]) =>
                            value && (
                              <Row key={item.id}>
                                <Block size="13px" head>
                                  {key}{" "}
                                </Block>
                                {typeof value != "object" ? (
                                  <Block auto>
                                    {key == "query" ? (
                                      <QueryFormat>{value}</QueryFormat>
                                    ) : (
                                      value
                                    )}
                                  </Block>
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
              <Loading>No Data</Loading>
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
