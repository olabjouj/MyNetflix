import React, { Component } from 'react';


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { placeHolder: "Tapez votre film.....", searchText: "" }

    }
    render() {
        return (
            <div className="row">
                <div className="col-md-8 input-group">
                    <input type="text " className="form-control input-lg" onChange={this.handleChange.bind(this)}  placeHolder={this.state.placeHolder}/>
                    <span className="input-group-btn">
                        <button className='btn' onClick={this.handleClick.bind(this)}>GO</button>
                    </span>
                </div>
            </div>
        )
    }
    handleChange(event){
        this.setState({searchText : event.target.value});
    }
    handleClick(){
        console.log('-----------')
        console.log('-----bien click------')
        console.log('-----------')
        console.log('searchText', this.state.searchText);
        this.props.callBacka(this.state.searchText);
    }
}
export default SearchBar;



// const SearchBar = () => {
//     const [placeHolder, setPlaceHolder] = useState('Tapez votre film préféré ..')
//     const [searchText, setSearchText] = useState('');
//     return (
//         <div className="row">
//             <div className="col-md-8">
//                 <input type="text " className="form-control input-lg" placeholder={placeHolder} />
//             </div>
//         </div>
//     )
// }

// export default SearchBar;
