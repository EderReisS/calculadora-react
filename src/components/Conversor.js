import React, { Component } from 'react';

import './Conversor.css';

export default class Conversor extends Component {
     constructor(props){
        super(props);

        this.state = {
            moedaA_valor: "",
            moedaB_valor: 0,
            metodo_1: "calcular_hipotenusa",
            lado1_h: "",
            lado2_h: "",
            cat_maior_h: 0,
            cat_menor_h: 0,
            hip_h: 0,
            metodo_2: "calcular_cateto",
            lado1_c: "",
            lado2_c: "",
            cat_maior_c: 0,
            cat_menor_c: 0,
            hip_c: 0,
        }

        this.converter = this.converter.bind(this);
        this.calcular_hipotenusa = this.calcular_hipotenusa.bind(this)
        this.calcular_cateto = this.calcular_cateto.bind(this)
     }

     converter(){
        let de_para = `${this.props.moedaA}_${this.props.moedaB}`;

        let url = `https://free.currconv.com/api/v7/convert?q=${de_para}&compact=ultra&apiKey=20741cb2f37fb4f4958d`;

        fetch(url)
            .then( res => {
                return res.json()
            })
            .then(json => {
                let cotacao = json[de_para];
                let moedaB_valor = ( parseFloat(this.state.moedaA_valor) * cotacao).toFixed(2);
                this.setState({moedaB_valor})
            });
    }
    calcular_hipotenusa(){
        
        let metodo = `${this.state.metodo_1}`;

        let var1 = `${this.state.lado1_h}`;

        let var2 = `${this.state.lado2_h}`;


        let url = `https://api-pitagoras-ederreis.herokuapp.com/${metodo}/${var1}/${var2}`;

        fetch(url)
            .then( res => {
                return res.json()
            })
            .then(json => {
                let cat_menor_h = json["cateto_menor"];

                let cat_maior_h= json["cateto_maior"];

                let hip_h = json["hipotenusa"];

                this.setState({cat_menor_h})
                this.setState({cat_maior_h})
                this.setState({hip_h})
            });
    }
    calcular_cateto(){
        
        let metodo = `${this.state.metodo_2}`;

        let var1 = `${this.state.lado1_c}`;

        let var2 = `${this.state.lado2_c}`;


        let url = `https://api-pitagoras-ederreis.herokuapp.com/${metodo}/${var1}/${var2}`;

        fetch(url)
            .then( res => {
                return res.json()
            })
            .then(json => {
                let cat_menor_c = json["cateto_menor"];

                let cat_maior_c = json["cateto_maior"];

                let hip_c = json["hipotenusa"];

                this.setState({cat_menor_c})
                this.setState({cat_maior_c})
                this.setState({hip_c})
            });
    }


    render() {
        return (
            <div className="conversor">
                <h1>Método para calculo da hipotenusa</h1>
                <li>
                    <p>Lado 1</p>
                    <p>
                        <input className="input" onChange={(event) => { this.setState({lado1_h:event.target.value})}} type="number"></input>
                    </p>                    
                </li>
                <li>
                    <p>Lado 2</p>
                    <p>
                        <input className="input" onChange={(event) => { this.setState({lado2_h:event.target.value})}} type="number"></input>
                    </p>                    
                </li>
                <input className="button" type="button" value="ok" onClick={this.calcular_hipotenusa}></input>
                <h2>Cateto maior, a = <span> {this.state.cat_maior_h} </span></h2>
                <h2>Cateto menor, b = <span> {this.state.cat_menor_h} </span></h2>
                <h2>Hipotenusa, c = <span> {this.state.hip_h} </span></h2>

                <h1>Método para calculo do cateto</h1>
                <li>
                    <p>Lado 1</p>
                    <p>
                        <input className="input" onChange={(event) => { this.setState({lado1_c:event.target.value})}} type="number"></input>
                    </p>                    
                </li>
                <li>
                    <p>Lado 2</p>
                    <p>
                        <input className="input" onChange={(event) => { this.setState({lado2_c:event.target.value})}} type="number"></input>
                    </p>                    
                </li>
                <input className="button" type="button" value="ok" onClick={this.calcular_cateto}></input>
                <h2>Cateto maior, a = <span> {this.state.cat_maior_c} </span></h2>
                <h2>Cateto menor, b = <span> {this.state.cat_menor_c} </span></h2>
                <h2>Hipotenusa, c = <span> {this.state.hip_c} </span></h2>
            </div>
        )
    }
}
