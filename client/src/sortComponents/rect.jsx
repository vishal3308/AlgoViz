import React, {Component} from 'react';
import './style.css';
class Rect extends Component {

    render() {
        return (
            <div
                className='rect'
                style={{height:this.props.rect.width,
                    background:this.checkColor(),
                    margin:this.props.marg
                }}
            >
                
            </div>
        );
    }
    checkColor = () => {
        if( this.props.rect.isSorted ){
            return "green";
        } else if( this.props.rect.isSorting ){
            return "pink";
        } else{
            return "blue"
        }
    }
}

export default Rect;