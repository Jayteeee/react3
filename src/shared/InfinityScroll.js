import React from "react";
import _ from "lodash";
import { Spinner } from "../elements";

const InfinityScroll = (props) => {

    const {children, callNext,is_next,loading} = props;

    const _handlescroll = _.throttle(() => {

        if(loading){
            return;
        }

        const {innerHeight} = window;
        const {scrollHeight} = document.body;

        const scrollTop = (document.documentElement && document.documentElement.scrollTop || document.body.scrollTop)

        if(scrollHeight - innerHeight - scrollTop < 200) {
            callNext();
        }
    }, 300);

    const handlescroll = React.useCallback(_handlescroll, [loading]);

    React.useEffect(() => {

        if(loading){
            return;
        }



        if(is_next){
            window.addEventListener("scroll", handlescroll);
        }else{
            window.removeEventListener("scroll", handlescroll);
        }

        
        return () => window.removeEventListener("scroll", handlescroll)
    }, [is_next, loading])

    return(
        <React.Fragment>
            {props.children}
            {is_next && (<Spinner/>)}
        </React.Fragment>
    )
}

InfinityScroll.defaultProps = {
    children: null,
    callNext: () => {},
    is_next: false,
    loading: false,

}

export default InfinityScroll;