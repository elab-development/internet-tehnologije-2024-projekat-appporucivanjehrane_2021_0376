import { useEffect } from "react";
import { Table } from "flowbite-react";

import { useCustomerStore } from "../../../store/customerStore";
import LoadingSpinner from "../../LoadingSpinner";

const CustomersView = () => {
  const { isLoading, customers, getAllCustomers } = useCustomerStore();

  useEffect(() => {
    getAllCustomers();
  }, [getAllCustomers]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="mt-10 overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>No.</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Joined</Table.HeadCell>
            <Table.HeadCell>Spendings</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {customers &&
              customers.map((customer, index) => (
                <Table.Row className="bg-white font-medium">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <img
                      src={customer?.user?.profileImage}
                      alt={customer?.firstName}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {customer?.firstName} {customer?.lastName}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {customer?.user?.email || "NA"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {customer?.address || "NA"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {customer?.phone || "NA"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap">
                    {new Date(customer.createdAt!).toLocaleDateString() || "NA"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-gray-900">
                    $ {customer?.user?.balance}
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default CustomersView;
