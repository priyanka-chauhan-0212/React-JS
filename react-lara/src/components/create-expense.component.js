import React, { Component } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios'
import ExpensesList from './expenses-listing.component';
import Swal from 'sweetalert2';
// import ExpenseList from './expenses-listing.component';


export default class CreateExpense extends Component {

    constructor(props){
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        // this.onChangeImages = this.onChangeImages.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            description: '',
            amount: '',
            images: null,
            ExpensesList : ''
        };
    }

    onChangeName(e){
        this.setState({name : e.target.value})
    }

    onChangeDescription(e){
        this.setState({description : e.target.value})
    }

    onChangeAmount(e){
        this.setState({amount : e.target.value})
    }

    refreshdata(){
        
        axios.get("http://localhost/example-app/api/index").then(res => { if(!res.data.error){
            this.setState({ExpensesList:res.data});
            console.log("ExpensesList",ExpensesList);
        } })
        
    }

    // onChangeImages(e){
        // console.log(e.target[3]);
        // var img = [];
        // for(var a=0; a < e.target.files.length;a++)
        // {
        //     img.push(e.target.files[a]);
        // }
        // console.log(img);
        // this.setState({images : e.target.files });
    // }

    // onChangeImages(imageList) {
    //     // data for submit
    //     //Getting total number of images
    //     console.log(imageList);
    //     var images12 = imageList.length;
    //     // Create an object of formData 
    //     // const formData = new FormData();    
     
    //     var imagesa = [];

    //      //Saving multiple images in formadta varibale
    //      for(var a = 0; a<images12; a++)
    //      {
    //         imagesa['file-'+a] = imageList[a].file;
    //     }
        
    //     console.log(imagesa);

    //     this.setState({images : imagesa})
        
    //   }; 
    

    onSubmit(e){
        e.preventDefault();

        const expense = new FormData(e.target);
        // let imgArr = [];
        // expense.append("images",e.target[3].files);
        // console.log(e.target[3].files);

        // for(var x = 0; x < e.target[3].files.length; x++){
        //     // imgArr.push(e.target[3].files[x]);
        //     expense.append("images-"+x,e.target[3].files[x]);
        // }

        // expense.append("images",imgArr);

        // console.log(expense);
        // var imagesArr = expense.getAll('images');
        // for(var i =0; expense.getAll('images').length > i ; i++){
        //     imagesArr.push(expense.getAll('images')[i]);
        // }
        // console.log("sahd");
        
        // const data = {
        //     "Content-Type": "multipart/form-data",
        //     name : expense.get('name'),
        //     amount : expense.get('amount'),
        //     description : expense.get('description'),
        // }

        // for(var x= 0; x < imagesArr.length; x++){
        //     data.append(

        //     )
        // }

        axios.post('http://localhost/example-app/api/store', expense)
            .then(res => {
                if(res.data.error){
                    Swal.fire(
                        'Error',
                        'All Field Required',
                        'error'
                        )
                } else {
                    Swal.fire(
                        'Good Job',
                        'Expense Added Successfully',
                        'success'
                        )
                            
                    if(!res.data.error){
                        this.refreshdata();
                    }
                
                    // this.setState({ExpensesList:ExpensesList});
                    // window.location.reload();
                }
            });

        this.setState({ name: '', amount: '', description: '' });
        // this.setState({ name: '', amount: '', description: '', images: null });
    }

    render() {
        return (
            <div className="form-wrapper">
                <Form onSubmit={this.onSubmit} encType="multipart/form-data">
                    <Row>
                        <Col>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" value={this.state.name} onChange={this.onChangeName} name="name" />
                            </Form.Group>
                            
                        </Col>
                        
                        <Col>
                            <Form.Group controlId="amount">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control type="number" value={this.state.amount} onChange={this.onChangeAmount} name="amount" />
                            </Form.Group>
                        </Col>

                    </Row>
                    
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" type="textarea" value={this.state.description} onChange={this.onChangeDescription} name="description" />
                    </Form.Group>

                    <Col>
                        <Form.Group controlId="images">
                            <Form.Label>Images</Form.Label>
                            <Form.Control type="file" name="images" multiple />
                            {/* <ImageUploading value={this.state.images} onChange={this.onChangeImages} name="images" multiple /> */}
                            {/* <ImageUploading onChange={this.onChange} name="images" multiple /> */}
                        </Form.Group>
                    </Col>
                    
                    <Button type="submit" size="lg" variant="primary">Add Expense</Button>
                </Form>
                <br></br>
               <br></br>
                {/* <div className="something">
                    {(this.fileArray || []).map(url => (
                        <img src={url} alt="..." />
                    ))}
                </div> */}

               <ExpensesList></ExpensesList>
            </div>
        );
    }
}