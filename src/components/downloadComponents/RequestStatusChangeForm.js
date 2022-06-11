import {useState} from "react";
import axios from "axios";

import SendingRequestFailed from "./SendingRequestFailed";

export default function RequestStatusChangeForm(props) {
    const [requestMessage, setRequestMessage] = useState("");
    const [requestSent, setRequestSent] = useState(false);
    const [sendingRequestFailed, setSendingRequestFailed] = useState(false);
    
    let defaultRequestMessage = (props.blockFile) ? "Die Datei sollte gesperrt werden, weil..." : "Die Datei sollte entsperrt werden, weil...";

    const handleRequestMessageChange = (changingEvent) => {
        setRequestMessage(changingEvent.target.value);
    }

    const handleMessageSubmission = async () => {
        let response = await axios({
            method: "post",
            url: process.env.REACT_APP_BACKEND_BASE_URL + "/api/files/requestBlockingStatusChange/" + props.fileId,
            data: new URLSearchParams({
                "requestMessage": requestMessage,
                "blockFile": props.blockFile ? "true" : "false",
            })
        }).then((requestSubmissionResponse) => {
            setRequestSent(true);
            setSendingRequestFailed(false);
            return requestSubmissionResponse;
        }).catch((error) => {
            setSendingRequestFailed(true);
            return error.response;
        });
    }

    if(props.isExpanded && !requestSent) {
        return(
        <div>
            <textarea onChange={handleRequestMessageChange} placeholder={defaultRequestMessage} value={requestMessage} />
            <br />
            <button onClick={handleMessageSubmission}>Anfrage absenden</button>
            <SendingRequestFailed sendingFailed={sendingRequestFailed}/>
        </div>
        );
    } else if(requestSent){
        return(
        <div>
            <p>Deine Anfrage wurde gesendet. Ein Administrator wird sie bearbeiten.</p>
        </div>
        );
    } else return;
}