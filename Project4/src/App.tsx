import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

export default function PaginatorBasicDemo() {
  const op = useRef<OverlayPanel>(null);

  const [products, setProducts] = useState<any[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const rowsPerPage = 12;

  const loadProducts = async (page: number) => {
    setLoading(true);
    try {
      const { data, pagination } = await ProductService.fetchData(page);
      return { data, pagination };
    } catch (error) {
      console.error('Error fetching data:', error);
      return { data: [], pagination: { total: 0 } };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const { data, pagination } = await loadProducts(1);
      setProducts(data);
      setTotalRecords(pagination.total);
    };
    loadInitialData();
  }, []);

  const onPageChange = async (event: { first: number; rows: number }) => {
    const page = Math.floor(event.first / rowsPerPage) + 1;
    setFirst(event.first);
    const { data } = await loadProducts(page);
    setProducts(data);
  };

  const handleSubmit = async () => {
    const totalRowsToSelect = parseInt(inputValue, 10);
    if (isNaN(totalRowsToSelect) || totalRowsToSelect <= 0) {
      setSelectedProducts([]);
      op.current?.hide();
      return;
    }

    let rowsSelected: any[] = [];
    let currentPage = 1;
    let pagesLoaded: Set<number> = new Set();

    while (rowsSelected.length < totalRowsToSelect && rowsSelected.length < totalRecords) {
      if (!pagesLoaded.has(currentPage)) {
        const { data } = await loadProducts(currentPage);
        pagesLoaded.add(currentPage);
        rowsSelected = [...rowsSelected, ...data];
        if (rowsSelected.length >= totalRowsToSelect) {
          rowsSelected = rowsSelected.slice(0, totalRowsToSelect);
        }
      }
      currentPage++;
    }

    setSelectedProducts(rowsSelected);
    op.current?.hide();
  };

  const titleHeaderTemplate = () => (
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
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <Button label="Submit" icon="pi pi-check" onClick={handleSubmit} />
        </div>
      </OverlayPanel>
      <span>Title</span>
    </div>
  );

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
        selectionMode="multiple"
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
