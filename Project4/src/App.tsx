
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService'

export default function PaginatorBasicDemo() {
  const [products, setProducts] = useState<any[]>([]);
      const [selectedProducts, setSelectedProducts] = useState<any[]>([]);  // Define it as an array of any
    const [rowClick, setRowClick] = useState(true);
    useEffect(() => {
      const loadProducts = async () => {
          try {
              const data = await ProductService.fetchData();
              setProducts(data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
      loadProducts();
  }, []);

    return (
        <div className="card">
<DataTable
    value={products}
    paginator
    rows={5}
    rowsPerPageOptions={[5, 10, 25, 50]}
    tableStyle={{ minWidth: '50rem' }}
    selectionMode={rowClick ? null : 'checkbox'}
    selection={selectedProducts}
    onSelectionChange={(e: { value: any[] }) => setSelectedProducts(e.value)}  // Explicitly typed 'e'
    dataKey="id"
>
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                <Column field="title" header="Title" style={{ width: '25%' }}></Column>
                <Column field="place_of_origin" header="Origin" style={{ width: '25%' }}></Column>
                <Column field="artist_display" header="Artist" style={{ width: '25%' }}></Column>
                <Column field="inscriptions" header="Inscriptions" style={{ width: '25%' }}></Column>
                <Column field="date_start" header="Start Date" style={{ width: '25%' }}></Column>
                <Column field="date_end" header="End Date" style={{ width: '25%' }}></Column>

            </DataTable>
        </div>
    );
}
        