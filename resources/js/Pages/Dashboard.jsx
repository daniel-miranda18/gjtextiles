import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [salesReport, setSalesReport] = useState([]);

    useEffect(() => {
        axios.get('/salesReport')
            .then(response => {
                console.log(response.data); // Verifica el tipo de datos y contenido
                if (Array.isArray(response.data)) {
                    setSalesReport(response.data);
                } else {
                    console.error('Invalid sales report data format:', response.data);
                }
            })
            .catch(error => {
                console.error('Error fetching sales report data:', error);
                // Puedes manejar el error de forma más específica aquí
            });
    }, []);
    
    if (salesReport.length === 0) {
        return <div>No data available</div>;
    }
    
    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Sales Report</h1>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Top Selling Products</h2>
                <ul>
                    {salesReport.map(sale => (
                        <li key={sale.product_id}>{`Product ID ${sale.product_id}: ${sale.total_sales} total sales`}</li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default Dashboard;
