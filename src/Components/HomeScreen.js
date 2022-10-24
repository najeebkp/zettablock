import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableCell,
  Title,
  DetailedRow,
  Row,
  QueryFormat,
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

  const debounceSearch = (e) => {
    clearTimeout(filterTimeout);
    filterTimeout = setTimeout(() => {
      let filteredArray = [...data];
      filteredArray = filteredArray.filter((item) =>
        item.name.includes(e.target.value),
      );
      // setFilteredFullData(filteredArray);
      setFilteredData(filteredArray);
      setPages(Math.ceil(filteredArray.length / recordsPerPage));
      setCurrentPage(1);
    }, 300);
  };

  const handlePageChange = () => {
    setFilteredData(filteredData);
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
              <Title floatRight auto>
                <input
                  placeholder="Search"
                  onChange={(e) => debounceSearch(e)}
                ></input>
              </Title>
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
                  <>
                    <TableCell>
                      <Title small onClick={() => hanldeExpand(item.id)} button>
                        {expandedRow == item.id ? "⌄" : ">"}
                      </Title>
                      <Title big>{item.name}</Title>
                      <Title>{item.type}</Title>
                      <Title big>{item.description}</Title>
                    </TableCell>
                    {expandedRow == item.id && (
                      <DetailedRow>
                        {Object.entries(item).map(
                          ([key, value]) =>
                            value && (
                              <Row>
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
                  </>
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
        <div>Loading..</div>
      )}
    </div>
  );
}

export default HomeScreen;
