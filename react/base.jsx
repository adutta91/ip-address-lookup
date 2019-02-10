const React  = require('react');
const config = require('../config.public.js')

class Base extends React.Component {
    
    constructor(props) {
        super(props)
    }

    componentDidUpdate(){

    }

    alert(message, type){
        switch(type){
            case 'success':
                var cssName = 'alert-success';
                break;

            case 'warning':
                var cssName = 'alert-warning';
                break;

            case 'error':
                var cssName = 'alert-danger';
                break;

            case 'info':
            default:
                var cssName = 'alert-info';
                break;
        }

        return ( message &&
            <div className= { "alert " + cssName } >
                {message}
            </div>
        )
    }

    closeFloatAlert(){
        this.state.error = null
        this.state.message = null
        this.refresh()
    }

    floatAlert(message, type = null){
        if(!type){
            type = 'info'
        }

        var css = "alert alert-" + type + " short-animate float-alert"

        if(message){
            css = "alert alert-" + type + " long-animate float-alert active"
        }

        return (
            <div className={ css }  >
                <i className="close-icon" onClick={this.closeFloatAlert.bind(this)} >x</i>
                <i class="fas fa-exclamation-circle pr-2"></i> {message}
            </div>
        )
    }

    isMSIE(){
        var ua = window.navigator.userAgent;
        var msie    = ua.indexOf('MSIE ');      // IE 10 or older => return version number
        var trident = ua.indexOf('Trident/');   // IE 11 => return version number
        var edge    = ua.indexOf('Edge/');      // Edge (IE 12+) => return version number


        if (msie > 0) {
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }else if (trident > 0) {
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }else if (edge > 0) {
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }
    }

    isMobile(){
        return navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);
    }

    scrollFunction() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            let ele = document.getElementById("btn_backtotop")
            if(ele){
                ele.classList.add("backtotop-active")
            }
        } else {
            let ele = document.getElementById("btn_backtotop")
            if(ele){
                ele.classList.remove("backtotop-active")
            }
        }
    }



}

module.exports = Base
