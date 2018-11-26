import React from "react";
import Styles from "./styles.scss";
import PropTypes from "prop-types";
import Loading from "components/Loading";
import ToggleDisplay from "react-toggle-display";
import Loader from 'react-loader-spinner';

const Down = props => {
    console.log(props.visible)
    console.log(props.show)
    
    if(props.loading){
        return <LoadingMain/>
    }
    else if(props.subject){
        return <DownForm {...props}/>
    }
}
const LoadingMain = props => (
    <div className={Styles.DownForm}>
        <Loading/>
    </div>
)

const DownForm = props => (
    <div className={Styles.DownForm}>
        <div className={Styles.column}>
            <div className={Styles.whiteBox}>
                 <div className={Styles.list}>
                    <div className={Styles.Explanation}>
                        <div className={Styles.first}>
                            2018-2학기 강의노트
                        </div>
                        <p>괄호() 안의 숫자는 새로 다운받아야 할 강의노트 개수입니다.</p>
                    </div>
                        {props.subject.map(
                            (subject_name,index)=> <DownTable index={index} {...props}{...subject_name} key={index} />
                        )}
                     <button onClick={props.downClick}className={Styles.downbutton} disabled={!props.visible}>
                     <div>ZIP파일로 다운로드</div>
                        {props.visible===true?
                        <div className={Styles.loadingbar}>
                            <Loader 
                                type="Bars"
                                color="white"
                                height="15"	
                                width="15"
                            /> 
                        </div> 
                            : <div></div>
                        }</button>      
                </div> 
            </div>
        </div>
    </div>
);
const DownTable = (props, context) => {
    console.log(props.index)
    return(
        <div className={Styles.item}>
             <button onClick={props.handleClick.bind(this,props.index)} className={Styles.button}><div className={Styles.subname}>{props.sub_name}({props.Note_list.length})</div></button>
                    <ToggleDisplay show={props.show[props.index].value}>
                       {props.Note_list.map(
                            (Note_name,index)=> <ToggleTable index={index} {...props}{...Note_name} key={index} />
                        )}
                    </ToggleDisplay>
            </div>
    );
}
const ToggleTable = (props,context)=> {
    return(
        <div className={Styles.item2}>
            <div className={Styles.subname}>{props.file_name}</div>
        </div>
    )
}
DownForm.propTypes = {
    downClick: PropTypes.func.isRequired,
    handleClick: PropTypes.func.isRequired,

}

export default Down;