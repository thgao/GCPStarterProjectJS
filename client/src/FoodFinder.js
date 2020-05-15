import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';


class FoodFinder extends Component {
    constructor(){
        super()
        this.state = {
            results: null,
            isLoading: false
        }
    }

    buttonHandler(ingredient) {
        this.setState({isLoading: true})
        fetch('/find-server/' + ingredient)
            .then(res => res.json())
            .then(data => {
                this.setState(
                    {results: data, 
                    ingredient: ingredient,
                    isLoading: false}
                );
            })
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