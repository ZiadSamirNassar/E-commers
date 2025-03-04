import React from "react";
import Button from "react-bootstrap/esm/Button";
import Table from 'react-bootstrap/Table'
import {Link} from 'react-router-dom'
import Alert from 'react-bootstrap/Alert';
import "../../css/manageItems.css"

const ManageProducts = () => {
    return(
        <div className="manage-items p-5">
            <div className="header d-grid gap-2 d-md-block">
                <h3 className="text-center mb-3">Manage Items</h3>
                <Link to={"add"} className="btn btn-success mb-4">Add New Item +</Link>
            </div>

            <Alert variant="danger" className="p-2">
                Error Masage
            </Alert>
            <Alert variant="success" className="p-2">
                Item Created Sucssefully
            </Alert>

            <Table className="" responsive="xl" bordered hover>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Item Image</th>
                    <th>Item Name</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>
                            <img className="item-avatar" src="https://picsum.photos/200/300"/>
                        </td>
                        <td>Dell lap</td>
                        <td>10</td>
                        <td>15,000</td>
                        <td>
                            <Button className="btn btn-sm btn-danger">Delete</Button>
                            <Link to={"5"} className="btn btn-sm btn-primary mx-2">Update</Link>
                            <Link to={"/5"} className="btn btn-sm btn-info">Show</Link>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>
                            <img className="item-avatar" src="https://picsum.photos/200/300"/>
                        </td>
                        <td>Dell lap</td>
                        <td>10</td>
                        <td>15,000</td>
                        <td>
                            <Button className="btn btn-sm btn-danger">Delete</Button>
                            <Link to={"5"} className="btn btn-sm btn-primary mx-2">Update</Link>
                            <Link to={"/5"} className="btn btn-sm btn-info">Show</Link>
                        </td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>
                            <img className="item-avatar" src="https://picsum.photos/200/300"/>
                        </td>
                        <td>Dell lap</td>
                        <td>10</td>
                        <td>15,000</td>
                        <td>
                            <Button className="btn btn-sm btn-danger">Delete</Button>
                            <Link to={"5"} className="btn btn-sm btn-primary mx-2">Update</Link>
                            <Link to={"/5"} className="btn btn-sm btn-info">Show</Link>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}

export default ManageProducts;


