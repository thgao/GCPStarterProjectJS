import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { ajax } from 'rxjs/ajax';
const tracer = require('./web-tracer')('example-frontend');
const opentelemetry = require('@opentelemetry/api');

const gcpBase = 'https://healthy-earth-276916.ue.r.appspot.com';
const localBase = 'http://penguin.termina.linux.test:8080';

class FoodFinder extends Component {
    constructor(props){
        super()
        this.tracer = props.tracer;
        this.state = {
            results: null,
            isLoading: false
        }
    }

    buttonHandler(ingredient) {
        this.setState({isLoading: true})
        this.getData(ingredient);

    
        console.log(tracer);
        console.log(tracer.getCurrentSpan());
        const span = tracer.startSpan("fe /find-server/:ingredient");
        span.setAttribute('ingredient', 'value');
        fetch(gcpBase + '/find-server/' + ingredient)
            .then(res => {
                this.tracer.withSpan(span, () => {
                    const child = tracer.startSpan("child", { parent: tracer.getCurrentSpan() });
                    child.end();
                });
                // alert(res);
                let json = res.json()
                // alert(json);
                span.end();
                return json
            }).then(data => {
                // alert("then?")
                this.setState(
                    {results: data, 
                    ingredient: ingredient,
                    isLoading: false}
                );
            })
    }

    getData(ingredient) { //dummy xml http request so that we can see examples of xml traces
     this.numSent += 1;
     const urlStr = gcpBase + '/find-server/' + ingredient;
     const obs = ajax({
       headers: {
         'Content-Type': 'application/json',
       },
       method: 'GET',
       url: urlStr,
     });
     obs.subscribe(
       (val) => {
         const resp = val.response;
         console.log(resp)
       },
       (err) => {
         console.log("err")
       },
     );
    }

    renderResults(){
        if(this.state.isLoading){
            return <div> Loading vendors...</div>;
        }
        if(this.state.results == null){ 
            return;
        }
        if(Object.keys(this.state.results).length === 0){
            return <div>No vendors have {this.state.ingredient} in stock.</div>
        }
        let list = Object.entries(this.state.results).map(([key, value], i) => {
            return (
                <div>
                    {key}: ${value.price}, Inventory of {value.stock}
                </div>
            )
        });
        return (
            <div>
                Vendors for: {this.state.ingredient}
                <div>
                    {list}
                </div>
            </div>
        )

    }

    render() {
        return (
            <div>
                <h1>Food Finder</h1>
                <Row>
                    <Col lg="3">
                        <Button onClick={() => this.buttonHandler('apple')}>
                            Find Apples
                        </Button>
                    </Col>
                    <Col md="3">
                        <Button onClick={() => this.buttonHandler('peach')}>
                            Find Peaches
                        </Button>
                    </Col>
                    <Col md="3">
                        <Button onClick={() => this.buttonHandler('pear')}>
                            Find Pears
                        </Button>
                    </Col>
                    <Col md="3">
                        <Button onClick={() => this.buttonHandler('flour')}>
                            Find Flour
                        </Button>
                    </Col>
                </Row>
                <h2>Vendor Options:</h2>
                <div id="results">
                    {this.renderResults()}
                </div>
            </div>
        )
    }

}
        
export default FoodFinder;