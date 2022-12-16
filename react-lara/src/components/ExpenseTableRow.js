import React, {Component} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Swal from 'sweetalert2';

export default class ExpenseTableRow extends Component {
    constructor(props){
        super(props);

        this.deleteExpense = this.deleteExpense.bind(this);
    }

    deleteExpense(){

        var r = window.confirm("Are you Sure for Delete");
        if (r == true) {

            axios.delete("http://localhost/example-app/api/destroy/" + this.props.obj.id)
                .then((res) => { if(res.data.error){
                        Swal.fire(
                            'Error',
                            'Something is Wrong',
                            'error'
                        )

                    } else {
                        Swal.fire(
                            'Good Job',
                            'Deleted Successfully',
                            'success'
                            )
                            window.location.reload();
                    }
                    
                }).catch((error) => {
                    console.log(error)
                })
        } else {
            Swal.fire(
                'Error',
                'You Press Cancel,Thank You',
                'error'
            )
        }

    }

    render(){
        const baseurl = "http://localhost/example-app/storage/app/uploads/";
        const imageshow = this.props.obj.images;

        var imageArr = imageshow.split(',');
        
        var imageurl = [];
        
        for(var a = 0; a < imageArr.length; a++)
        {         
            imageurl.push(<img src ={baseurl + imageArr[a]} alt="" height="100" width="100" />);
        }
        
        return (
            <tr>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.amount}</td>
                <td>{this.props.obj.description}</td>
                <td>
                    {imageurl}
                </td>
                <td>
                    <Link className="edit-link" to={"/edit-expense/" + this.props.obj.id}>
                        <Button size="sm" variant="info">Edit</Button>
                    </Link>
                    <Button onClick={this.deleteExpense} size="sm" variant="danger">Delete</Button>
                </td>
            </tr>
        );
    }
}