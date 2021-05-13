import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { DailyReportSymptomContext } from "./DailyReportSymptomProvider"


export const CommentEditForm = () => {

    const { editDailyReportSymptom, getDailyReportSymptomById } = useContext(DailyReportSymptomContext)

    const  {dailyReportSymptomId}  = useParams()
    const history = useHistory();
    console.log(dailyReportSymptomId, "dailyreportsymptomid")
    //use params dailyreportsymptomid is coming back as an object dailyreportsymptom. it returns a string

    const [dailyReportSymptom, setDailyReportSymptom] = useState({
        id: parseInt(dailyReportSymptomId),
        dailyReportId: 0,
        symptomId: 0,
        comment: "",
        urgency: 0
    })

    const handleControlledInputChange = (event) => {
        const newDailyReportSymptom = { ...dailyReportSymptom }
        let selectedVal = event.target.value
        console.log("dailyReportSymptom", selectedVal)

        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newDailyReportSymptom[event.target.id] = selectedVal
        setDailyReportSymptom(newDailyReportSymptom)
    }


    useEffect(() => {
        if (dailyReportSymptomId) {
            getDailyReportSymptomById(dailyReportSymptomId).then((rep) => {setDailyReportSymptom(rep)})
        }
    }, [])

    // useEffect(() => {
    //     getDailyReportSymptomById(dailyReportSymptomId)
    //         .then((dailyReportSymptomObject) => {
    //             setDailyReportSymptom(dailyReportSymptomObject)
    //         })
    // }, []);


    // const accessDailyReportId = dailyReportSymptom.dailyReportId

    const handleSaveComment = (event) => {
        event.preventDefault()
        if (dailyReportSymptom.comment === "") {
            window.alert("Please edit comment")
        } else {
debugger
            editDailyReportSymptom({
                id: dailyReportSymptomId,
                dailyReportId: dailyReportSymptom.dailyReportId,
                symptomId: dailyReportSymptom.symptomId,
                comment: dailyReportSymptom.comment,
                urgency: dailyReportSymptom.urgency
            }).then(() => history.push(`/dailyReport/detail/${dailyReportSymptom.dailyReportId}`))
        }
    }


//keeps pushing to wrong location; edit object is undefined other than id. tried parse inting id on line 58

    return (
        <form className="commentEditForm">
            <fieldset>
                <h3 className="commentTitle">Edit Comment:</h3>
                <div className="form-group">
                    <textarea id="comment" onChange={handleControlledInputChange} value={dailyReportSymptom.comment}></textarea>
                </div>
            </fieldset>
            <button className="btn btn-primary"
                onClick={handleSaveComment}>
                Save Comment
            </button>
        </form>
    )
}

export default CommentEditForm
