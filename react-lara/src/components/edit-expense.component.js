import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';

export default class EditExpense extends Component{
    constructor(props){
        super(props)

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
            imageurl:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost/example-app/api/show/' + this.props.match.params.id)
            .then((res => {
              this.setState({
                name: res.data.expense[0].name,
                description: res.data.expense[0].description,
                amount: res.data.expense[0].amount,
                images: res.data.expense[0].images
              });
              // console.log(res.data.expense[0].images);
            })).then(() => {
              const baseurl = "http://localhost/example-app/storage/app/uploads/";

              const imageshow = this.state.images;

              var imageArr = imageshow.split(',');
              
              for(var a = 0; a < imageArr.length; a++)
              {
                  let djjd = imageArr[a];
                  let elem = React.createElement(
                    'img',
                    {
                      src: baseurl + imageArr[a],
                      key: a,
                      onClick: () => {this.onChangeDelete(this.props.match.params.id, djjd )},
                      alt:"", height:"100", width:"100"
                    }
                  );

                  this.state.imageurl[a] = elem;
              }
                this.setState({imageurl : this.state.imageurl });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    refreshData(){
      axios.get('http://localhost/example-app/api/show/' + this.props.match.params.id)
            .then((res => {
              this.setState({
                name: res.data.expense[0].name,
                description: res.data.expense[0].description,
                amount: res.data.expense[0].amount,
                images: res.data.expense[0].images
              });
              // console.log(res.data.expense[0].images);
            })).then(() => {
              const baseurl = "http://localhost/example-app/storage/app/uploads/";

              const imageshow = this.state.images;

              var imageArr = imageshow.split(',');
              
              for(var a = 0; a < imageArr.length; a++)
              {
                  let djjd = imageArr[a];
                  let elem = React.createElement(
                    'img',
                    {
                      src: baseurl + imageArr[a],
                      key: a,
                      onClick: () => {this.onChangeDelete(this.props.match.params.id, djjd )},
                      alt:"", height:"100", width:"100"
                    }
                  );

                  this.state.imageurl[a] = elem;
              }
                this.setState({imageurl : this.state.imageurl });
            })
            .catch((error) => {
                console.log(error);
            })
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

    onChangeDelete(id,imgname) {

      const deleteimg = {
        id:id,
        imgname:imgname
      };

      axios.post('http://localhost/example-app/api/imgdelete', deleteimg, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      })
      .then((res => {
        const baseurl = "http://localhost/example-app/storage/app/uploads/";
        
        var imageArr = res.data.expense.split(',');
              
              for(var a = 0; a < imageArr.length; a++)
              {
                  let djjd = imageArr[a];
                  let elem = React.createElement(
                    'img',
                    {
                      src: baseurl + imageArr[a],
                      key: a,
                      onClick: () => {this.onChangeDelete(this.props.match.params.id, djjd )},
                      alt:"", height:"100", width:"100"
                    }
                  );

                  this.state.imageurl[a] = elem;
              }
                this.setState({imageurl : this.state.imageurl });
        this.refreshData();
        console.log(res.data.expense);
      }));
    }

    onSubmit(e){
        e.preventDefault();

        const expenseObj = new FormData(e.target);
        // let imgArr = [];
        // expense.append("images",e.target[3].files);
        
        // let expenseObj12 = {
        //     name : this.state.name,
        //     amount : this.state.amount,
        //     description : this.state.description
        // };

        // expenseObj['images'] = [];
        
        for(var x = 0; x < e.target[3].files.length; x++){
          // imgArr.push(e.target[3].files[x]);
          // console.log(e.target[3].files[x]['name']);
          // expenseObj['images'].push(e.target[3].files[x]);
          // expenseObj['images'] = e.target[3].files[x];
          expenseObj.append("images-"+x,e.target[3].files[x]);
        }

        expenseObj.append('name',this.state.name);
        expenseObj.append('amount',this.state.amount);
        expenseObj.append('description',this.state.description);

        axios.post('http://localhost/example-app/api/update/' + this.props.match.params.id, expenseObj,{
          headers:{
              'Content-Type': 'multipart/form-data','boundary':'----WebKitFormBoundaryyrV7KO0BoCBuDbTL'
          }
        })
        .then((res) => { 
            if(res.data.error){
              Swal.fire(
                  'Error',
                  'All Field Required',
                  'error'
              )
            } else {
              Swal.fire(
                  'Good Job',
                  'Expense successfully updated',
                  'success'
                  )
                this.props.history.push('/expenses-listing');
            }
          }).catch((error) => {
            console.log(error)
          })

    }

    render(){
      
      return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit} encType="multipart/form-data">
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeName} />
        </Form.Group>

        <Form.Group controlId="Amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" value={this.state.amount} onChange={this.onChangeAmount} />
        </Form.Group>

        <Form.Group controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" value={this.state.description} onChange={this.onChangeDescription} />
        </Form.Group>

        <Form.Group controlId="images">
          <Form.Label>Images</Form.Label>
          <Form.Control type="file" name="images" multiple />
          {/* {imageurl} */}
          {/* <img src = {this.imageurl} alt="" height="100" width="100" /> */}
        </Form.Group>
          <div className="imgpreview">
            {this.state.imageurl}
          </div>

        <Button variant="danger" size="lg" type="submit">Update Expense</Button>
      </Form>
    </div>);
    }
}