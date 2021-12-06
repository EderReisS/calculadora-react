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
        
        let metodo = "calcular_hipotenusa";

        let var1 = `${this.props.lado1_h}`;

        let var2 = `${this.props.lado2_h}`;


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


    render() {
        return (
            <div className="conversor">
                <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
                <li>
                    <p>Lado 1</p>
                    <p>
                        <input className="input" onChange={(event) => { this.setState({moedaA_valor:event.target.value})}} type="text"></input>
                        <input className="button" type="button" value="ok" onClick={this.converter}></input>
                    </p>
                </li>
                <h2>valor convertido: <span> {this.state.moedaB_valor} </span></h2>
                
                <h2>Método para calculo da hipotenusa</h2>
                <li>
                    <p>Lado 1</p>
                    <p>
                        <input className="input" onChange={(event) => { this.setState({lado1_h:event.target.value})}} type="text"></input>
                    </p>                    
                </li>
                <li>
                    <p>Lado 2</p>
                    <p>
                        <input className="input" onChange={(event) => { this.setState({lado2_h:event.target.value})}} type="text"></input>
                    </p>                    
                </li>
                <input className="button" type="button" value="ok" onClick={this.calcular_hipotenusa}></input>
                <h2>Cateto maior, a = <span> {this.state.cat_maior_h} </span></h2>
                <h2>Cateto menor, b = <span> {this.state.cat_menor_h} </span></h2>
                <h2>Hipotenusa, c = <span> {this.state.hip_h} </span></h2>
                

            </div>
        )
    }
}
