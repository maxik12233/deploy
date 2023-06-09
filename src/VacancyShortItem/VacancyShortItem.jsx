import s from "./VacancyShortItem.module.css"
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { contains } from "../methods";


function VacancyShortItem(props) {

    // local state
    let [isRedirect, setRedirect] = useState(false)

    // functions
    function vacancyClickHandler() {
        setRedirect(true)
    }

    // format salary string due to salary options
    let salaryString = ""
    if (props.salary_from > 0 && props.salary_to > 0) salaryString = `з/п ${props.salary_from} - ${props.salary_to} ${props.currency}`
    else if (props.salary_from > 0 && props.salary_to <= 0) salaryString = `з/п от ${props.salary_from} ${props.currency}`
    else if (props.salary_from <= 0 && props.salary_to > 0) salaryString = `з/п ${props.salary_to} ${props.currency}`
    else salaryString = `з/п не указана`

    // redirect on full vacancy
    if (isRedirect) return <Navigate to={`../vacancy/${props.id}/`} />

    return (
        <div data-elem={`vacancy-${props.id}`} onClick={vacancyClickHandler} className={s.container}>
            <LinkContainer to={`../vacancy/${props.id}/`}>
                <div className={s.title} onClick={props.linkClickHandler}>
                    {props.name}
                </div>
            </LinkContainer>
            <div className={s.secRow}>
                <span className={s.salary}>
                    {salaryString}
                </span>
                <span>{" ● "}</span>
                <span className={s.worktype}>
                    {props.worktype}
                </span>
            </div>
            <div className={s.town}>
                <span><img src={`${process.env.REACT_APP_API_URL}metroloc.png`} alt="metrologo"></img></span>
                <span>{props.town}</span>
            </div>
            <div data-elem={`vacancy-${props.id}-shortlist-button`} className={s.favStar} onClick={(event) => {
                props.onFavClick()
                event.stopPropagation()
            }}>
                {contains(props.favlist, props.id) ? "★" : "☆"}
            </div>
        </div>
    );
}

export default VacancyShortItem;
