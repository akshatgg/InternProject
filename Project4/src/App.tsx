import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'; // Import InputText component

export default function PaginatorBasicDemo() {
  const op = useRef<OverlayPanel>(null); // Ref type set to OverlayPanel or null

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [rowClick, setRowClick] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [inputValue, setInputValue] = useState(''); // State to store input value
  const rowsPerPage = 12; // Set the number of rows per page

  const loadProducts = async (page: number) => {
    setLoading(true);
    try {
      const { data, pagination } = await ProductService.fetchData(page);
      setProducts(data);
      setTotalRecords(pagination.total); // Set total records based on API response
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts(1); // Load the first page initially
  }, []);

  const onPageChange = (event: { first: number, rows: number }) => {
    const page = event.first / rowsPerPage + 1; // Calculate the page number
    setFirst(event.first); // Keep track of first record index
    loadProducts(page); // Load products for the new page
  };

  // Handle submit button click to select specific row
  const handleSubmit = () => {
    // Try to convert input to number
    const rowNumber = parseInt(inputValue, 10);

    // Check if input is a valid row number and exists in products
    if (!isNaN(rowNumber) && rowNumber > 0 && rowNumber <= products.length) {
      const selectedRow = products[rowNumber - 1]; // Assuming rowNumber starts from 1
      setSelectedProducts([selectedRow]); // Select the row based on input
    } else {
      setSelectedProducts([]); // Deselect if the input is invalid
    }

    // Hide the OverlayPanel after selecting the row
    op.current?.hide();
  };

  // Custom header template for Title column
  const titleHeaderTemplate = () => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="button"
          icon="pi pi-chevron-down"
          className="p-button-text p-ml-2"
          onClick={(e) => op.current?.toggle(e)}
        />
        <OverlayPanel ref={op}>
          <div style={{ padding: '10px' }}>
            <InputText
              placeholder="Select the rows"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} // Store the input value
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <Button label="Submit" icon="pi pi-check" onClick={handleSubmit} />
          </div>
        </OverlayPanel>
        <span>Title</span>
      </div>
    );
  };

  return (
    <div className="card">
      <DataTable
        value={products}
        paginator
        rows={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        totalRecords={totalRecords}
        lazy
        loading={loading}
        first={first}
        onPage={onPageChange}
        tableStyle={{ minWidth: '50rem' }}
        selectionMode={rowClick ? null : 'checkbox'}
        selection={selectedProducts}
        onSelectionChange={(e: { value: any[] }) => setSelectedProducts(e.value)}
        dataKey="id"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
        <Column field="title" header={titleHeaderTemplate} style={{ width: '25%' }}></Column>
        <Column field="place_of_origin" header="Origin" style={{ width: '25%' }}></Column>
        <Column field="artist_display" header="Artist" style={{ width: '25%' }}></Column>
        <Column field="inscriptions" header="Inscriptions" style={{ width: '25%' }}></Column>
        <Column field="date_start" header="Start Date" style={{ width: '25%' }}></Column>
        <Column field="date_end" header="End Date" style={{ width: '25%' }}></Column>
      </DataTable>
    </div>
  );
}
